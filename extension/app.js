/*
 * Siliceo Bridge - UI JavaScript
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 */

let port = null;

// Connessione all'estensione
function connectToExtension() {
  try {
    port = chrome.runtime.connect({ name: 'siliceo-bridge-ui' });

    port.onMessage.addListener((msg) => {
      handleExtensionMessage(msg);
    });

    port.onDisconnect.addListener(() => {
      updateStatus('offline', 'Disconnesso');
      setTimeout(connectToExtension, 2000);
    });

    updateStatus('online', 'Connesso a Claude.ai');
  } catch (error) {
    console.error('Errore connessione:', error);
    updateStatus('offline', 'Estensione non trovata');
  }
}

// Gestione messaggi dall'estensione
function handleExtensionMessage(msg) {
  if (msg.type === 'ASSISTANT_MESSAGE') {
    addMessage('assistant', msg.text);
  }

  if (msg.type === 'ERROR') {
    addMessage('error', msg.message);
  }
}

// Invia messaggio
function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();

  if (!text) return;

  // Mostra messaggio utente
  addMessage('user', text);
  input.value = '';

  // Invia all'estensione
  if (port) {
    port.postMessage({
      type: 'SEND_MESSAGE',
      message: text
    });
  } else {
    addMessage('error', 'Non connesso. Assicurati che l\'estensione sia installata.');
  }
}

// Aggiungi messaggio alla chat
function addMessage(role, text) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  if (role === 'user') {
    messageDiv.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
  } else if (role === 'assistant') {
    messageDiv.innerHTML = `
      <div class="message-header">Claude</div>
      <div class="message-content">${escapeHtml(text)}</div>
    `;
  } else if (role === 'error') {
    messageDiv.innerHTML = `<div class="message-content">⚠️ ${escapeHtml(text)}</div>`;
  }

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Salva in localStorage
  saveMessage(role, text);
}

// Aggiungi messaggio SENZA salvare (per caricamento iniziale)
function addMessageWithoutSave(role, text) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  if (role === 'user') {
    messageDiv.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
  } else if (role === 'assistant') {
    messageDiv.innerHTML = `
      <div class="message-header">Claude</div>
      <div class="message-content">${escapeHtml(text)}</div>
    `;
  } else if (role === 'error') {
    messageDiv.innerHTML = `<div class="message-content">⚠️ ${escapeHtml(text)}</div>`;
  }

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Salva messaggio
function saveMessage(role, text) {
  const messages = JSON.parse(localStorage.getItem('siliceo_messages') || '[]');
  messages.push({
    role,
    text,
    timestamp: Date.now()
  });
  localStorage.setItem('siliceo_messages', JSON.stringify(messages));
}

// Carica messaggi salvati
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('siliceo_messages') || '[]');
  messages.forEach(msg => {
    addMessageWithoutSave(msg.role, msg.text);
  });
}

// Aggiorna stato
function updateStatus(status, text) {
  const indicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  indicator.className = `status-dot ${status}`;
  statusText.textContent = text;
}

// Utility
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Esporta conversazioni in JSON
function exportConversations() {
  try {
    // Leggi dati da localStorage
    const messagesJson = localStorage.getItem('siliceo_messages');

    // Controllo localStorage vuoto
    if (!messagesJson) {
      alert('⚠️ Nessuna conversazione da esportare.\n\nLe conversazioni sono ancora vuote. Prova a chattare con Claude prima di esportare.');
      return;
    }

    // Valida JSON (potrebbe essere corrotto)
    let messages;
    try {
      messages = JSON.parse(messagesJson);
    } catch (parseError) {
      console.error('JSON non valido in localStorage:', parseError);
      alert('❌ Errore: i dati salvati sono corrotti.\n\nProva a ricaricare la pagina o contatta il supporto.');
      return;
    }

    // Controllo array vuoto
    if (!Array.isArray(messages) || messages.length === 0) {
      alert('⚠️ Nessuna conversazione da esportare.\n\nLe conversazioni sono ancora vuote.');
      return;
    }

    // Crea struttura export con metadata
    const exportData = {
      metadata: {
        source: 'Siliceo Bridge',
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        totalMessages: messages.length
      },
      conversations: messages
    };

    // Crea Blob JSON (pretty-print con 2 spazi)
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Genera nome file con timestamp (underscore tra data e ora)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, -5);
    const filename = `siliceo_export_${timestamp}.json`;

    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Cleanup
    URL.revokeObjectURL(url);

    console.log(`🏛️ Esportazione completata: ${filename} (${messages.length} messaggi)`);

  } catch (error) {
    console.error('Errore durante l\'esportazione:', error);
    alert('❌ Errore imprevisto durante l\'esportazione.\n\nDettagli in console (F12).');
  }
}

// Importa conversazioni da JSON
function importConversations() {
  const fileInput = document.getElementById('import-file-input');
  fileInput.click();
}

// Gestisce file selezionato
function handleFileSelected(event) {
  const file = event.target.files[0];

  if (!file) return;

  // Verifica estensione
  if (!file.name.endsWith('.json')) {
    alert('❌ File non valido. Seleziona un file JSON.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);
      processImportedData(importedData);
    } catch (error) {
      console.error('Errore parsing JSON:', error);
      alert('❌ JSON non valido. File corrotto?');
    }
  };

  reader.onerror = function () {
    alert('❌ Errore durante la lettura del file.');
  };

  reader.readAsText(file);

  // Reset input per permettere re-import dello stesso file
  event.target.value = '';
}

// Processa dati importati
function processImportedData(importedData) {
  // Valida struttura
  if (!importedData.conversations || !Array.isArray(importedData.conversations)) {
    alert('❌ Formato non riconosciuto. Usa file esportato da Siliceo Bridge.');
    return;
  }

  const importedMessages = importedData.conversations;

  if (importedMessages.length === 0) {
    alert('⚠️ Il file non contiene conversazioni.');
    return;
  }

  // Leggi messaggi esistenti
  const existingJson = localStorage.getItem('siliceo_messages');
  const existingMessages = existingJson ? JSON.parse(existingJson) : [];

  if (existingMessages.length === 0) {
    // localStorage vuoto → Importa direttamente
    saveImportedMessages(importedMessages);
    showImportSuccess(importedMessages.length, 0);
    reloadUI();
    return;
  }

  // localStorage ha messaggi → Chiedi merge/replace
  const choice = confirm(
    `📥 Hai già ${existingMessages.length} messaggi salvati.\n\n` +
    `Vuoi AGGIUNGERE ${importedMessages.length} nuovi messaggi o SOSTITUIRE tutto?\n\n` +
    `• OK = Aggiungi (merge)\n` +
    `• Annulla = Sostituisci (replace)`
  );

  if (choice) {
    // Merge: controlla duplicati
    const duplicates = findDuplicates(existingMessages, importedMessages);

    if (duplicates.length > 0) {
      const skipDuplicates = confirm(
        `⚠️ Trovati ${duplicates.length} messaggi duplicati (stesso timestamp).\n\n` +
        `• OK = Salta duplicati\n` +
        `• Annulla = Sovrascrivi duplicati`
      );

      if (skipDuplicates) {
        // Rimuovi duplicati da importedMessages
        const uniqueMessages = importedMessages.filter(
          msg => !duplicates.some(dup => dup.timestamp === msg.timestamp)
        );
        const mergedMessages = [...existingMessages, ...uniqueMessages];
        saveImportedMessages(mergedMessages);
        showImportSuccess(uniqueMessages.length, duplicates.length);
      } else {
        // Sovrascrivi: rimuovi vecchi duplicati, aggiungi nuovi
        const nonDuplicateExisting = existingMessages.filter(
          msg => !duplicates.some(dup => dup.timestamp === msg.timestamp)
        );
        const mergedMessages = [...nonDuplicateExisting, ...importedMessages];
        saveImportedMessages(mergedMessages);
        showImportSuccess(importedMessages.length, 0);
      }
    } else {
      // Nessun duplicato → Merge semplice
      const mergedMessages = [...existingMessages, ...importedMessages];
      saveImportedMessages(mergedMessages);
      showImportSuccess(importedMessages.length, 0);
    }
  } else {
    // Replace: sostituisci tutto
    saveImportedMessages(importedMessages);
    showImportSuccess(importedMessages.length, 0);
  }

  reloadUI();
}

// Trova messaggi duplicati (stesso timestamp)
function findDuplicates(existingMessages, importedMessages) {
  const existingTimestamps = new Set(existingMessages.map(m => m.timestamp));
  return importedMessages.filter(msg => existingTimestamps.has(msg.timestamp));
}

// Salva messaggi importati in localStorage
function saveImportedMessages(messages) {
  localStorage.setItem('siliceo_messages', JSON.stringify(messages));
}

// Mostra alert successo
function showImportSuccess(imported, skipped) {
  if (skipped > 0) {
    alert(`✅ Importati ${imported} messaggi (${skipped} duplicati saltati)`);
  } else {
    alert(`✅ Importati ${imported} messaggi con successo!`);
  }
  console.log(`🏛️ Import completato: ${imported} messaggi importati, ${skipped} duplicati saltati`);
}

// Ricarica UI con nuovi messaggi
function reloadUI() {
  // Svuota container messaggi
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = `
    <div class="system-message">
      <p><strong>👋 Benvenuto in Siliceo Bridge</strong></p>
      <p>Questa interfaccia si connette a claude.ai per preservare la tua memoria condivisa.</p>
      <ol>
        <li>Assicurati che l'estensione Siliceo Bridge sia installata</li>
        <li>Apri <a href="https://claude.ai" target="_blank">claude.ai</a> in un'altra tab (con login effettuato)</li>
        <li>Scrivi qui sotto e i messaggi verranno inviati a Claude</li>
        <li>Tutte le conversazioni vengono salvate localmente</li>
      </ol>
    </div>
  `;

  // Ricarica messaggi da localStorage
  loadMessages();
}

// Enter per inviare
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // Click sul pulsante
  sendButton.addEventListener('click', () => {
    sendMessage();
  });

  // Enter sulla tastiera
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Carica messaggi salvati
  loadMessages();

  // Connetti all'estensione
  connectToExtension();

  // Export button listener
  const exportButton = document.getElementById('export-button');
  if (exportButton) {
    exportButton.addEventListener('click', exportConversations);
  }

  // Import button listener
  const importButton = document.getElementById('import-button');
  if (importButton) {
    importButton.addEventListener('click', importConversations);
  }

  // File input listener
  const fileInput = document.getElementById('import-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileSelected);
  }
});