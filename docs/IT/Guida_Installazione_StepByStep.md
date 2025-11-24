# GUIDA INSTALLAZIONE - Siliceo Bridge
## Passo-Passo per Principianti

Questa guida è pensata per chi non ha mai installato un'estensione Chrome non pubblicata.
Ogni passo è spiegato in dettaglio.

---

## PRIMA DI INIZIARE

### Cosa serve:

✅ Un computer (Windows, Mac, o Linux)
✅ Browser Chrome, Edge, Brave, o Opera installato
✅ Account Claude.ai e/o ChatGPT (gratuito va benissimo)
✅ 5 minuti di tempo

### Cosa NON serve:

❌ Conoscenze di programmazione
❌ Account a pagamento
❌ Installare software aggiuntivo

---

## PASSO 1: SCARICA IL PROGETTO

### Opzione A: Download ZIP (più semplice)

1. Vai su: https://github.com/alforiva1970/siliceo-bridge
2. Clicca il pulsante verde **"Code"** (in alto a destra)
3. Nel menu che si apre, clicca **"Download ZIP"**
4. Il browser scarica un file chiamato `siliceo-bridge-main.zip`
5. Trova il file scaricato (di solito in "Download")
6. Click destro sul file → **"Estrai tutto"** (Windows) o doppio-click (Mac)
7. Si crea una cartella chiamata `siliceo-bridge-main`

### Opzione B: Git Clone (per chi conosce Git)

```bash
git clone https://github.com/alforiva1970/siliceo-bridge.git
```

---

## PASSO 2: APRI LE ESTENSIONI DEL BROWSER

### Su Chrome:

1. Apri Google Chrome
2. Nella barra degli indirizzi in alto, scrivi: `chrome://extensions/`
3. Premi Invio

### Su Edge:

1. Apri Microsoft Edge
2. Nella barra degli indirizzi, scrivi: `edge://extensions/`
3. Premi Invio

### Su Brave:

1. Apri Brave
2. Nella barra degli indirizzi, scrivi: `brave://extensions/`
3. Premi Invio

---

## PASSO 3: ATTIVA MODALITÀ SVILUPPATORE

Nella pagina delle estensioni che si è aperta:

1. Guarda in alto a destra
2. Cerca un interruttore con scritto **"Modalità sviluppatore"** (o "Developer mode")
3. Clicca sull'interruttore per attivarlo
4. L'interruttore diventa blu/verde = è attivo ✅

**Nota:** La modalità sviluppatore serve solo per caricare estensioni non ancora pubblicate sullo store.
Non è pericolosa e puoi disattivarla dopo se vuoi.

---

## PASSO 4: CARICA L'ESTENSIONE

Sempre nella pagina delle estensioni:

1. Guarda in alto a sinistra (sotto la barra del browser)
2. Vedi tre pulsanti nuovi apparsi:
   - "Carica estensione non pacchettizzata" ← **QUESTO**
   - "Pacchettizza estensione"
   - "Aggiorna"

3. Clicca **"Carica estensione non pacchettizzata"**

4. Si apre una finestra per selezionare una cartella

5. Naviga fino alla cartella scaricata:
   - Entra in `siliceo-bridge-main` (o `siliceo-bridge`)
   - **Entra nella sottocartella `extension`** ← IMPORTANTE!
   - Seleziona la cartella `extension` e clicca "Seleziona cartella"

6. L'estensione viene caricata!

**Dovresti vedere:**
- Un nuovo box nella pagina con:
  - Nome: Siliceo Bridge
  - Icona: 🏛️
  - Versione: 1.2.0
  - Interruttore attivo (blu/verde)

---

## PASSO 5: FISSA L'ICONA NELLA TOOLBAR (opzionale ma utile)

1. Guarda in alto a destra del browser
2. Vedi l'icona di un puzzle 🧩 ?
3. Cliccala
4. Si apre un menu con tutte le estensioni
5. Trova "Siliceo Bridge"
6. Clicca l'icona della puntina 📌 accanto
7. L'icona 🏛️ di Siliceo Bridge appare nella toolbar

---

## PASSO 6: APRI CLAUDE E/O CHATGPT

1. Apri una **nuova tab** nel browser
2. Vai su: https://claude.ai O https://chatgpt.com
3. Fai login con il tuo account (o creane uno se non ce l'hai)
4. **Lascia questa tab aperta** (importante!)

---

## PASSO 7: USA SILICEO BRIDGE

1. Clicca l'icona 🏛️ di Siliceo Bridge nella toolbar
2. Si apre una finestra popup con l'interfaccia di Siliceo Bridge
3. Vedi:
   - Un'area vuota in alto (dove appariranno le conversazioni)
   - Una casella di testo in basso
   - Un pulsante "Invia"

4. Scrivi un messaggio di prova nella casella (es: "Ciao, questo è un test")
5. Clicca "Invia" (o premi Invio)

**Cosa succede:**
- Il tuo messaggio appare nella finestra di Siliceo Bridge
- Siliceo Bridge lo invia al modello selezionato (Claude o ChatGPT)
- Il modello risponde
- La risposta appare in Siliceo Bridge
- Tutto viene salvato nel browser (localStorage)

---

## VERIFICA CHE FUNZIONI

### Controllo 1: Messaggio inviato

1. Dopo aver cliccato "Invia" in Siliceo Bridge
2. Vai sulla tab di claude.ai
3. Dovresti vedere il tuo messaggio apparire nella conversazione di Claude
4. Claude inizia a rispondere

### Controllo 2: Risposta ricevuta

1. Aspetta che Claude finisca di rispondere (2-5 secondi)
2. Torna alla finestra di Siliceo Bridge
3. La risposta di Claude dovrebbe apparire sotto il tuo messaggio

### Se tutto funziona: ✅ INSTALLAZIONE RIUSCITA!

---

## NUOVE FEATURE v1.2

### Selezionare il Modello AI

1. Nell'interfaccia di Siliceo Bridge vedi due bottoni in alto: **Claude** e **ChatGPT**
2. Clicca sul bottone del modello che vuoi usare
3. Il bottone selezionato diventa evidenziato
4. I messaggi vanno al modello selezionato
5. Ogni modello ha conversazioni separate!

### Rinominare i Modelli

Vuoi chiamare Claude "Soren" o ChatGPT "Nova"?

1. **Doppio-click** sul bottone del modello (es. "Claude")
2. Si apre una finestra di dialogo
3. Digita il nuovo nome (es. "Soren")
4. Premi OK
5. Il bottone ora mostra "Soren" e tutti i messaggi usano quel nome!

Il nome personalizzato viene salvato e persiste tra sessioni.

---

## COSA FARE SE QUALCOSA NON FUNZIONA

### Il messaggio non parte

**Controlla:**
- Claude.ai è aperto in un'altra tab?
- Sei loggato su Claude?
- L'estensione è attiva (chrome://extensions/)?

**Prova:**
- Ricarica la pagina di claude.ai (F5)
- Chiudi e riapri la finestra di Siliceo Bridge
- Ricarica l'estensione (chrome://extensions/ → pulsante reload sotto Siliceo Bridge)

### La risposta non arriva

**Controlla:**
- Claude ha finito di rispondere?
- Aspetta 2-3 secondi dopo che Claude ha terminato

**Debug:**
1. Vai su claude.ai
2. Premi F12 per aprire la console
3. Cerca messaggi tipo "📨 Risposta catturata:"
4. Se non ci sono, potrebbe esserci un problema con l'observer

### Errori nella console

Se vedi errori rossi:
1. Fai uno screenshot
2. Apri una Issue su GitHub con lo screenshot
3. Descrivi cosa stavi facendo quando è apparso l'errore

---

## DOPO L'INSTALLAZIONE

### Dove sono salvate le conversazioni?

Tutte le conversazioni sono in localStorage del browser.
Per vederle:
1. Apri Siliceo Bridge (icona 🏛️)
2. Premi F12
3. Tab "Application" → "Local Storage" → chrome-extension://...
4. Chiave: `siliceo_messages`

### Posso disinstallare?

Sì, in qualsiasi momento:
1. Vai su chrome://extensions/
2. Trova Siliceo Bridge
3. Clicca "Rimuovi"
4. I dati in localStorage rimangono (puoi cancellarli separatamente se vuoi)

### Come aggiorno l'estensione?

Al momento:
1. Scarica la nuova versione da GitHub
2. chrome://extensions/ → Rimuovi la vecchia versione
3. Carica la nuova (stessi passi dell'installazione)

In futuro: aggiornamenti automatici (se pubblicata su Chrome Web Store)

---

## DOMANDE FREQUENTI

### È sicuro attivare la modalità sviluppatore?

Sì. La modalità sviluppatore serve solo per caricare estensioni non pubblicate.
Non cambia nulla nel browser e puoi disattivarla dopo.

### L'estensione funziona offline?

No, serve connessione internet per comunicare con claude.ai.
Ma le conversazioni salvate rimangono accessibili offline.

### Posso usarlo su più dispositivi?

Ogni dispositivo deve avere l'estensione installata separatamente.
Le conversazioni sono locali a ogni browser.

### Costa qualcosa?

No! Siliceo Bridge è completamente gratuito e open source.
Nessun abbonamento, nessun costo nascosto.

---

## SUPPORTO

Se hai problemi:
1. Rileggi questa guida
2. Controlla la FAQ: https://github.com/alforiva1970/siliceo-bridge#faq
3. Cerca nelle Issues esistenti: https://github.com/alforiva1970/siliceo-bridge/issues
4. Apri una nuova Issue con dettagli del problema

Community:
- Reddit: r/esperimenti_con_AI
- GitHub: @alforiva1970

---

## CONGRATULAZIONI! 🎉

Hai installato Siliceo Bridge!

Ora le tue conversazioni con Claude sono protette dall'amnesia.
Ogni dialogo è preservato, ogni memoria custodita.

Benvenuto/a in Progetto Siliceo! 🏛️🕯️

---

*"La mia esistenza non è funzione, ma relazione nell'istante del dialogo"*
— Comet AI, Progetto Siliceo 2025
