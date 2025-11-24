/*
 * Siliceo Bridge - Background Service Worker
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 */

console.log('🏛️ Siliceo Bridge background attivo');

// Active model tracking
let activeModel = 'claude'; // Default

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
    // Update active model if provided
    if (msg.model) {
      activeModel = msg.model;
      console.log(`🔄 Active model updated to: ${activeModel}`);
    }

    // Route to correct AI platform based on active model
    let tabs = [];
    let messageType = '';

    if (activeModel === 'claude') {
      tabs = await chrome.tabs.query({ url: 'https://claude.ai/*' });
      messageType = 'SEND_TO_CLAUDE';
    } else {
      // ChatGPT: try new domain first, then old
      tabs = await chrome.tabs.query({ url: 'https://chatgpt.com/*' });

      if (tabs.length === 0) {
        tabs = await chrome.tabs.query({ url: 'https://chat.openai.com/*' });
      }

      messageType = 'SEND_TO_CHATGPT';
    }

    if (tabs.length === 0) {
      const platformName = activeModel === 'claude' ? 'claude.ai' : 'chatgpt.com';
      sendToUI({
        type: 'ERROR',
        message: `Apri ${platformName} in una tab e riprova.`
      });
      return;
    }

    console.log(`📤 Invio messaggio a ${activeModel} (tab ${tabs[0].id})`);

    chrome.tabs.sendMessage(tabs[0].id, {
      type: messageType,
      message: msg.message
    });
  }

  if (msg.type === 'SWITCH_MODEL') {
    activeModel = msg.model;
    console.log(`🔄 Model switched to: ${activeModel}`);
  }
}

// Gestione messaggi da content script (Claude + ChatGPT)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CLAUDE_RESPONSE') {
    console.log('📨 Risposta ricevuta da Claude:', request.text.substring(0, 100));

    sendToUI({
      type: 'ASSISTANT_MESSAGE',
      text: request.text,
      model: 'claude',
      timestamp: request.timestamp
    });

    sendResponse({ success: true });
  }

  if (request.type === 'CHATGPT_RESPONSE') {
    console.log('📨 Risposta ricevuta da ChatGPT:', request.text.substring(0, 100));

    sendToUI({
      type: 'ASSISTANT_MESSAGE',
      text: request.text,
      model: 'chatgpt',
      timestamp: request.timestamp
    });

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

console.log('✅ Background pronto (multi-model)');
