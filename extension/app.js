/*
 * Siliceo Bridge - UI JavaScript
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 * Version: 1.1.0 - Multi-Model Edition
 */

// ============================================
// MULTI-MODEL STATE MANAGEMENT
// ============================================

// Active model tracking
let activeModel = localStorage.getItem('siliceo_active_model') || 'claude';

// Model custom names (NUOVO - v1.2)
let modelNames = JSON.parse(
  localStorage.getItem('siliceo_model_names') ||
  '{"claude":"Claude","chatgpt":"ChatGPT"}'
);

let port = null;

// Migration: convert old single-model data to multi-model
function migrateToMultiModel() {
  const oldMessages = localStorage.getItem('siliceo_messages');
  const claudeMessages = localStorage.getItem('siliceo_claude_messages');

  // If old format exists and new format doesn't, migrate
  if (oldMessages && !claudeMessages) {
    console.log('🔄 Migrating old data format to multi-model...');
    localStorage.setItem('siliceo_claude_messages', oldMessages);
    console.log('✅ Migration complete. Old data backed up.');
  }
}

// Get localStorage key for current active model
function getMessagesKey() {
  return `siliceo_${activeModel}_messages`;
}

// Get model display name
function getModelName() {
  return modelNames[activeModel] || activeModel;
}

// Rename a model (NUOVO - v1.2)
function renameModel(model, newName) {
  if (!newName || newName.trim() === '') return;

  modelNames[model] = newName.trim();
  localStorage.setItem('siliceo_model_names', JSON.stringify(modelNames));

  // Update all UI elements
  updateModelIndicator();
  updateButtonLabels();

  console.log(`✏️ Modello ${model} rinominato in: ${newName}`);
}

// Update button labels with custom names (NUOVO - v1.2)
function updateButtonLabels() {
  document.querySelectorAll('.model-button').forEach(btn => {
    const model = btn.dataset.model;
    if (model && modelNames[model]) {
      btn.textContent = modelNames[model];
    }
  });
}

// Switch active model
function switchModel(newModel) {
  if (newModel === activeModel) return;

  console.log(`🔄 Switching from ${activeModel} to ${newModel}`);

  activeModel = newModel;
  localStorage.setItem('siliceo_active_model', newModel);

  // Update UI buttons
  syncButtonsWithState();

  // Notify background
  if (port) {
    port.postMessage({ type: 'SWITCH_MODEL', model: newModel });
  }

  // Reload UI with new model messages
  reloadUI();
  updateModelIndicator();
  updateStatus('offline', `Connetti a ${getModelName()}`);

  console.log(`✅ Switched to ${newModel} (${getModelName()})`);
}

// Update model indicator display
function updateModelIndicator() {
  const indicator = document.getElementById('active-model-indicator');
  if (indicator) {
    indicator.textContent = `Chat attiva: ${getModelName()}`;
  }
}

// Sync button visual state with activeModel
function syncButtonsWithState() {
  document.querySelectorAll('.model-button').forEach(btn => {
    if (btn.dataset.model === activeModel) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  // Also update labels
  updateButtonLabels();
}

// ============================================
// CONNECTION & MESSAGING
// ============================================

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

    updateStatus('online', `Connesso a ${getModelName()}`);
  } catch (error) {
    console.error('Errore connessione:', error);
    updateStatus('offline', 'Estensione non trovata');
  }
}

function handleExtensionMessage(msg) {
  if (msg.type === 'ASSISTANT_MESSAGE') {
    addMessage('assistant', msg.text);
  }

  if (msg.type === 'ERROR') {
    addMessage('error', msg.message);
  }
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();

  if (!text) return;

  addMessage('user', text);
  input.value = '';

  if (port) {
    port.postMessage({
      type: 'SEND_MESSAGE',
      message: text,
      model: activeModel
    });
  } else {
    addMessage('error', 'Non connesso. Assicurati che l\'estensione sia installata.');
  }
}

// ============================================
// MESSAGE DISPLAY & STORAGE
// ============================================

function addMessage(role, text) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  if (role === 'user') {
    messageDiv.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
  } else if (role === 'assistant') {
    messageDiv.innerHTML = `
      <div class="message-header">${getModelName()}</div>
      <div class="message-content">${escapeHtml(text)}</div>
    `;
  } else if (role === 'error') {
    messageDiv.innerHTML = `<div class="message-content">⚠️ ${escapeHtml(text)}</div>`;
  }

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  if (role !== 'error') {
    saveMessage(role, text);
  }
}

function addMessageWithoutSave(role, text) {
  const messagesDiv = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;

  if (role === 'user') {
    messageDiv.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
  } else if (role === 'assistant') {
    messageDiv.innerHTML = `
      <div class="message-header">${getModelName()}</div>
      <div class="message-content">${escapeHtml(text)}</div>
    `;
  } else if (role === 'error') {
    messageDiv.innerHTML = `<div class="message-content">⚠️ ${escapeHtml(text)}</div>`;
  }

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function saveMessage(role, text) {
  const key = getMessagesKey();
  const messages = JSON.parse(localStorage.getItem(key) || '[]');
  messages.push({
    role,
    text,
    timestamp: Date.now(),
    model: activeModel
  });
  localStorage.setItem(key, JSON.stringify(messages));
  console.log(`💾 Messaggio salvato in ${key}`);
}

function loadMessages() {
  const key = getMessagesKey();
  const messages = JSON.parse(localStorage.getItem(key) || '[]');
  console.log(`📂 Caricamento ${messages.length} messaggi da ${key}`);

  messages.forEach(msg => {
    addMessageWithoutSave(msg.role, msg.text);
  });
}

// ============================================
// UI UPDATES
// ============================================

function updateStatus(status, text) {
  const indicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  if (indicator) indicator.className = `status-dot ${status}`;
  if (statusText) statusText.textContent = text;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function reloadUI() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';
  loadMessages();
}

// ============================================
// EXPORT/IMPORT (Multi-Model Aware)
// ============================================

function exportConversations() {
  try {
    const key = getMessagesKey();
    const messagesJson = localStorage.getItem(key);

    if (!messagesJson) {
      alert(`⚠️ Nessuna conversazione da esportare per ${getModelName()}.\n\nLe conversazioni sono ancora vuote.`);
      return;
    }

    let messages;
    try {
      messages = JSON.parse(messagesJson);
    } catch (parseError) {
      console.error('JSON non valido in localStorage:', parseError);
      alert('❌ Errore: i dati salvati sono corrotti.\n\nProva a ricaricare la pagina o contatta il supporto.');
      return;
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      alert(`⚠️ Nessuna conversazione da esportare per ${getModelName()}.`);
      return;
    }

    const exportData = {
      metadata: {
        source: 'Siliceo Bridge',
        version: '1.1.0',
        model: activeModel,
        modelName: getModelName(),
        exportDate: new Date().toISOString(),
        totalMessages: messages.length
      },
      conversations: messages
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, -5);
    const filename = `siliceo_${activeModel}_export_${timestamp}.json`;

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

    console.log(`🏛️ Esportazione completata: ${filename} (${messages.length} messaggi)`);
    alert(`✅ Esportazione completata!\n\nFile: ${filename}\n${messages.length} messaggi di ${getModelName()} esportati.`);

  } catch (error) {
    console.error('Errore durante l\'esportazione:', error);
    alert(`❌ Errore durante l\'esportazione:\n\n${error.message}`);
  }
}

function importConversations() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validate structure
      if (!importedData.metadata || !importedData.conversations) {
        alert('❌ Errore: il file JSON non è in formato Siliceo Bridge valido.');
        return;
      }

      const { model: importModel, modelName, totalMessages } = importedData.metadata;
      const importedMessages = importedData.conversations;

      // Check if importing for different model
      if (importModel !== activeModel) {
        const switchConfirm = confirm(
          `⚠️ Stai importando dati di ${modelName}, ma il modello attivo è ${getModelName()}.\n\n` +
          `Vuoi passare a ${modelName} prima di importare?`
        );
        if (switchConfirm) {
          switchModel(importModel);
        }
      }

      // Get current messages
      const currentKey = getMessagesKey();
      const currentMessages = JSON.parse(localStorage.getItem(currentKey) || '[]');

      if (currentMessages.length > 0) {
        const action = confirm(
          `⚠️ Hai già ${currentMessages.length} messaggi salvati per ${getModelName()}.\n\n` +
          `Vuoi UNIRE (OK) o SOSTITUIRE (Annulla)?`
        );

        if (action) {
          // MERGE: combine and deduplicate
          const mergedSet = new Set();
          const merged = [];

          [...currentMessages, ...importedMessages].forEach(msg => {
            const key = `${msg.timestamp}_${msg.role}_${msg.text.substring(0, 50)}`;
            if (!mergedSet.has(key)) {
              mergedSet.add(key);
              merged.push(msg);
            }
          });

          merged.sort((a, b) => a.timestamp - b.timestamp);
          localStorage.setItem(currentKey, JSON.stringify(merged));
          console.log(`🔄 Merge completato: ${merged.length} messaggi totali (${mergedSet.size} unici)`);
          alert(`✅ Importazione completata (MERGE)!\n\n${merged.length} messaggi totali per ${getModelName()}.`);
        } else {
          // REPLACE
          localStorage.setItem(currentKey, JSON.stringify(importedMessages));
          console.log(`🔄 Sostituzione completata: ${importedMessages.length} messaggi`);
          alert(`✅ Import completato (SOSTITUISCI)!\n\n${importedMessages.length} messaggi di ${modelName} importati.`);
        }
      } else {
        // No conflicts - just import
        localStorage.setItem(currentKey, JSON.stringify(importedMessages));
        console.log(`📥 Importazione completata: ${importedMessages.length} messaggi`);
        alert(`✅ Importazione completata!\n\n${importedMessages.length} messaggi di ${modelName} importati.`);
      }

      // Reload UI
      reloadUI();

    } catch (error) {
      console.error('Errore durante l\'importazione:', error);
      alert(`❌ Errore durante l\'importazione:\n\n${error.message}`);
    }
  };

  fileInput.click();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🏛️ Siliceo Bridge UI - Multi-Model Edition');
  console.log(`📱 Active model: ${activeModel}`);
  console.log(`💾 Storage key: ${getMessagesKey()}`);

  // Migration
  migrateToMultiModel();

  // Load messages for active model
  loadMessages();

  // Connessione
  connectToExtension();

  // Model selector buttons
  document.querySelectorAll('.model-button').forEach(btn => {
    // Single click: switch model
    btn.addEventListener('click', () => {
      const model = btn.dataset.model;
      if (model) switchModel(model);
    });

    // Double click: rename model (NUOVO - v1.2)
    btn.addEventListener('dblclick', () => {
      const model = btn.dataset.model;
      if (!model) return;

      const currentName = modelNames[model];
      const newName = prompt(`Rinomina "${currentName}":`, currentName);

      if (newName && newName !== currentName) {
        renameModel(model, newName);
      }
    });
  });

  // Send button
  document.getElementById('send-btn')?.addEventListener('click', sendMessage);

  // Enter key for send
  document.getElementById('message-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Export/Import buttons
  document.getElementById('export-btn')?.addEventListener('click', exportConversations);
  document.getElementById('import-btn')?.addEventListener('click', importConversations);

  // Initial UI sync
  syncButtonsWithState();
  updateModelIndicator();

  console.log('✅ UI initialized and ready');
});