/*
 * Siliceo Bridge - Content Script per Claude.ai
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 */

console.log('🏛️ Siliceo Bridge attivo su claude.ai');

// Selettori per elementi di Claude.ai
const SELECTORS = {
  textarea: 'div[contenteditable="true"]',
  sendButton: 'button[aria-label="Send Message"]',
  messages: '[data-testid="conversation-turn"]'
};

// Invia messaggio a Claude
function sendMessageToClaude(text) {
  const textarea = document.querySelector(SELECTORS.textarea);
  
  if (!textarea) {
    console.error('❌ Textarea non trovata');
    return false;
  }
  
  // Inserisci testo
  textarea.focus();
  textarea.innerText = text;
  
  // Trigger eventi
  const inputEvent = new Event('input', { bubbles: true });
  textarea.dispatchEvent(inputEvent);
  
  // Clicca pulsante Invio
  setTimeout(() => {
    const buttons = document.querySelectorAll('button');
    let sendButton = null;
    
    buttons.forEach(btn => {
      if (btn.getAttribute('aria-label')?.includes('Send') || 
          btn.innerText?.includes('Send')) {
        sendButton = btn;
      }
    });
    
    if (sendButton && !sendButton.disabled) {
      sendButton.click();
      console.log('✅ Messaggio inviato a Claude');
      return true;
    } else {
      console.error('❌ Pulsante Invio non trovato');
      return false;
    }
  }, 200);
}

// Cattura risposta di Claude
let lastResponseText = '';

function captureClaudeResponse() {
  const messages = document.querySelectorAll('[data-testid="conversation-turn"]');
  if (messages.length === 0) return null;
  
  const lastMessage = messages[messages.length - 1];
  const isAssistant = lastMessage.querySelector('[data-testid="message-author"]')?.innerText?.toLowerCase().includes('claude');
  
  if (isAssistant) {
    const text = lastMessage.innerText;
    if (text && text !== lastResponseText) {
      lastResponseText = text;
      return text;
    }
  }
  
  return null;
}

// Osserva DOM per nuovi messaggi
const observer = new MutationObserver(() => {
  const response = captureClaudeResponse();
  if (response) {
    chrome.runtime.sendMessage({
      type: 'CLAUDE_RESPONSE',
      text: response,
      timestamp: Date.now()
    });
    console.log('📨 Risposta catturata');
  }
});

observer.observe(document.body, { 
  childList: true, 
  subtree: true 
});

// Gestione messaggi dall'estensione
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SEND_TO_CLAUDE') {
    sendMessageToClaude(request.message);
    sendResponse({ success: true });
  }
  
  if (request.type === 'GET_STATUS') {
    sendResponse({ 
      connected: true,
      url: window.location.href
    });
  }
  
  return true;
});

console.log('✅ Content script pronto');
