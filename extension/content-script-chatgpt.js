/*
 * Siliceo Bridge - Content Script per ChatGPT (chatgpt.com)
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * Licenza: AGPL-3.0
 * 
 * Strategia Anti-Fragile Auto-Discovery + Lexical Patch
 */

console.log('🏛️ Siliceo Bridge attivo su chatgpt.com');

// ============================================
// STRATEGIA ROBUSTA - AUTO-DISCOVERY
// ============================================

function findChatGPTInput() {
    const candidates = Array.from(document.querySelectorAll('div[contenteditable="true"]'));
    console.log('🔍 Candidati contenteditable trovati:', candidates.length);

    const visibleInMain = candidates.filter(el => {
        if (!el.offsetParent) return false;
        return !!el.closest('main');
    });
    console.log('🔍 Candidati visibili in <main>:', visibleInMain.length);

    let withPlaceholder = visibleInMain.filter(el =>
        el.getAttribute('data-placeholder') || el.getAttribute('aria-label')
    );
    console.log('🔍 Candidati con placeholder/aria-label:', withPlaceholder.length);

    if (withPlaceholder.length === 1) {
        console.log('✅ Input ChatGPT identificato');
        return withPlaceholder[0];
    }

    if (visibleInMain.length > 0) {
        console.log('⚠️ Fallback: ultimo contenteditable');
        return visibleInMain[visibleInMain.length - 1];
    }

    console.warn('❌ Nessun input trovato');
    return null;
}

function findSendButton() {
    let btn = document.querySelector('button[data-testid="send-button"]:not([disabled])');
    if (btn) {
        console.log('✅ Send button: data-testid');
        return btn;
    }

    btn = document.querySelector('button[aria-label*="Send"]:not([disabled])') ||
        document.querySelector('button[aria-label*="Invia"]:not([disabled])');
    if (btn) {
        console.log('✅ Send button: aria-label');
        return btn;
    }

    const inputEl = findChatGPTInput();
    if (inputEl) {
        const container = inputEl.closest('form, div, main') || document;
        const buttons = Array.from(container.querySelectorAll('button:not([disabled])'));
        if (buttons.length > 0) {
            console.log('✅ Send button: fallback');
            return buttons[buttons.length - 1];
        }
    }

    console.error('❌ Send button non trovato');
    return null;
}

// ============================================
// INVIO MESSAGGI (Lexical Patch)
// ============================================

function setLexicalText(el, text) {
    el.innerText = '';

    const before = new InputEvent('beforeinput', {
        bubbles: true,
        inputType: 'insertText',
        data: text
    });
    el.dispatchEvent(before);

    el.innerText = text;

    const input = new InputEvent('input', { bubbles: true });
    el.dispatchEvent(input);
}

function sendMessageToChatGPT(text) {
    const inputEl = findChatGPTInput();

    if (!inputEl) {
        console.error('❌ Input non trovato');
        return false;
    }

    console.log('✅ Invio messaggio...');
    inputEl.focus();
    setLexicalText(inputEl, text);
    console.log('✅ Testo inserito');

    setTimeout(() => {
        triggerSendButton();
    }, 150);

    return true;
}

function triggerSendButton() {
    const sendButton = findSendButton();

    if (sendButton && !sendButton.disabled) {
        console.log('✅ Click send');
        sendButton.click();
    } else {
        console.error('❌ Impossibile inviare');
    }
}

// ============================================
// CHROME MESSAGING
// ============================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SEND_TO_CHATGPT') {
        const success = sendMessageToChatGPT(request.message);
        sendResponse({ success });
    }
    return true;
});

console.log('✅ Content script ChatGPT pronto (Anti-Fragile + Lexical)');

// ============================================
// OBSERVER - TIMEOUT 8 SECONDI
// ============================================

console.log('🔍 Avvio observer...');

let lastCapturedText = '';
let lastMessageCount = 0;
let processingResponse = false;

const observer = new MutationObserver((mutations) => {
    if (processingResponse) return;

    const allMessages = document.querySelectorAll('[data-message-author-role="assistant"]');

    if (allMessages.length > lastMessageCount) {
        const newMessage = allMessages[allMessages.length - 1];

        processingResponse = true;
        console.log('⏳ Nuova risposta ChatGPT - attendo 8 secondi...');

        setTimeout(() => {
            let finalText = newMessage.innerText || newMessage.textContent;
            finalText = finalText.trim();

            if (finalText && finalText.length > 50 && finalText !== lastCapturedText) {
                lastCapturedText = finalText;
                lastMessageCount = allMessages.length;

                console.log('📨 ✅ RISPOSTA CHATGPT CATTURATA!');
                console.log('📏 Lunghezza:', finalText.length, 'caratteri');
                console.log('📄 Anteprima:', finalText.substring(0, 100) + '...');

                chrome.runtime.sendMessage({
                    type: 'CHATGPT_RESPONSE',
                    text: finalText,
                    timestamp: Date.now()
                }).then(() => {
                    console.log('✅ Risposta inviata a Siliceo');
                    processingResponse = false;
                }).catch(err => {
                    console.error('❌ Errore:', err);
                    processingResponse = false;
                });
            } else {
                processingResponse = false;
            }
        }, 8000);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

lastMessageCount = document.querySelectorAll('[data-message-author-role="assistant"]').length;
console.log('✅ Observer attivo - messaggi esistenti:', lastMessageCount);
