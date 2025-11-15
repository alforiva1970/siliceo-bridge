/*
 * Siliceo Bridge - Background Service Worker
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 */

console.log('🏛️ Siliceo Bridge background attivo');

// Apri UI quando si clicca l'icona dell'estensione
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html')
  });
});

let uiPort = null;

// Connessione con UI
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'siliceo-bridge-ui') {
    console.log('✅ UI connessa');
    uiPort = port;
    
    port.onDisconnect.addListener(() => {
      console.log('❌ UI disconnessa');
      uiPort = null;
    });
    
    port.onMessage.addListener((msg) => {
      handleUIMessage(msg);
    });
  }
});

// Gestione messaggi da UI
async function handleUIMessage(msg) {
  if (msg.type === 'SEND_MESSAGE') {
    const tabs = await chrome.tabs.query({ url: 'https://claude.ai/*' });
    
    if (tabs.length === 0) {
      sendToUI({ 
        type: 'ERROR', 
        message: 'Apri claude.ai in una tab e riprova.' 
      });
      return;
    }
    
    chrome.tabs.sendMessage(tabs[0].id, {
      type: 'SEND_TO_CLAUDE',
      message: msg.message
    });
  }
}

// Gestione messaggi da content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CLAUDE_RESPONSE') {
    console.log('📨 Risposta ricevuta da content script:', request.text.substring(0, 100));
    
    sendToUI({
      type: 'ASSISTANT_MESSAGE',
      text: request.text,
      timestamp: request.timestamp
    });
    
    // IMPORTANTE: rispondi al content script
    sendResponse({ success: true });
  }
  return true;
});

// Invia a UI
function sendToUI(message) {
  if (uiPort) {
    uiPort.postMessage(message);
  }
}

console.log('✅ Background pronto');
