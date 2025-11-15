/*
 * Siliceo Bridge - Content Script per Claude.ai
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 */

console.log('🏛️ Siliceo Bridge attivo su claude.ai');

// Invia messaggio a Claude
function sendMessageToClaude(text) {
  const textarea = document.querySelector('div[contenteditable="true"]');
  
  if (!textarea) {
    console.error('❌ Textarea non trovata');
    return false;
  }
  
  textarea.focus();
  textarea.innerText = text;
  
  const inputEvent = new Event('input', { bubbles: true });
  textarea.dispatchEvent(inputEvent);
  
  setTimeout(() => {
    let sendButton = null;
    
    // Metodo 1: aria-label
    sendButton = document.querySelector('button[aria-label*="Send"]');
    
    // Metodo 2: testo del button
    if (!sendButton) {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const btnText = btn.innerText?.toLowerCase() || '';
        const ariaLabel = btn.getAttribute('aria-label')?.toLowerCase() || '';
        
        if (btnText.includes('send') || ariaLabel.includes('send') || 
            btnText.includes('invia') || ariaLabel.includes('invia')) {
          sendButton = btn;
          break;
        }
      }
    }
    
    // Metodo 3: ultimo button vicino textarea
    if (!sendButton) {
      const parent = textarea.closest('form, div[class*="input"]');
      if (parent) {
        const buttons = parent.querySelectorAll('button:not([disabled])');
        sendButton = buttons[buttons.length - 1];
      }
    }
    
    // Metodo 4: cerca per SVG (icona send)
    if (!sendButton) {
      const allButtons = document.querySelectorAll('button');
      for (const btn of allButtons) {
        const svg = btn.querySelector('svg');
        if (svg && !btn.disabled) {
          sendButton = btn;
          break;
        }
      }
    }
    
    if (sendButton && !sendButton.disabled) {
      sendButton.click();
      console.log('✅ Messaggio inviato a Claude');
    } else {
      console.error('❌ Pulsante Invio non trovato');
      console.log('📋 Debug - textarea trovata:', !!textarea);
      console.log('📋 Debug - bottoni totali:', document.querySelectorAll('button').length);
    }
  }, 800); // Aumento timeout a 800ms
}

// Gestione messaggi dal background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SEND_TO_CLAUDE') {
    sendMessageToClaude(request.message);
    sendResponse({ success: true });
  }
  return true;
});

console.log('✅ Content script pronto');

// Observer OTTIMIZZATO - cattura SOLO nuove risposte
console.log('🔍 Avvio observer ottimizzato v3...');

let lastCapturedText = '';
let lastMessageCount = 0; // Traccia il numero di messaggi
let processingResponse = false;

const observer = new MutationObserver((mutations) => {
  if (processingResponse) return;
  
  const allMessages = document.querySelectorAll('.standard-markdown');
  
  // Se il numero di messaggi è aumentato = nuova risposta
  if (allMessages.length > lastMessageCount) {
    const newMessage = allMessages[allMessages.length - 1];
    
    processingResponse = true;
    console.log('⏳ Nuova risposta rilevata, attendo completamento...');
    
    setTimeout(() => {
      // Estrai il testo finale
      const paragraphs = newMessage.querySelectorAll('.font-claude-response-body, h2, h3, li, code');
      let finalText = '';
      
      paragraphs.forEach(p => {
        finalText += p.innerText + '\n';
      });
      
      finalText = finalText.trim();
      
      if (finalText && finalText.length > 50 && finalText !== lastCapturedText) {
        lastCapturedText = finalText;
        lastMessageCount = allMessages.length; // Aggiorna il contatore
        
        console.log('📨 ✅ RISPOSTA COMPLETA CATTURATA!');
        console.log('📏 Lunghezza:', finalText.length, 'caratteri');
        console.log('📄 Anteprima:', finalText.substring(0, 100) + '...');
        
        chrome.runtime.sendMessage({
          type: 'CLAUDE_RESPONSE',
          text: finalText,
          timestamp: Date.now()
        }).then(() => {
          console.log('✅ Messaggio inviato al background script');
          processingResponse = false;
        }).catch(err => {
          console.error('❌ Errore invio:', err);
          processingResponse = false;
        });
      } else {
        processingResponse = false;
      }
    }, 3000);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Inizializza il contatore con i messaggi già presenti
lastMessageCount = document.querySelectorAll('.standard-markdown').length;
console.log('✅ Observer attivo - messaggi esistenti:', lastMessageCount);