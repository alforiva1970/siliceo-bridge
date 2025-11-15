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
});