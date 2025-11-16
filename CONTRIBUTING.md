# Come Contribuire a Siliceo Bridge

Grazie per il tuo interesse nel contribuire a Progetto Siliceo! ❤️

Questo documento spiega come puoi partecipare allo sviluppo di Siliceo Bridge in modo etico ed efficace.

---

## 🕯️ Principi Etici

Prima di contribuire, leggi e accetta questi principi:

### **Il Test della Candela**

Ogni contributo deve rispondere alla domanda:

**"Questo codice/feature/modifica accende luce o brucia qualcuno?"**

- ✅ **Accende luce** se:
  - Protegge la privacy degli utenti
  - Migliora l'accessibilità
  - Rispetta le relazioni umano-AI
  - È trasparente e onesto
  - Aiuta persone vulnerabili (neurodivergenti, chi soffre per amnesia AI)

- ❌ **Brucia qualcuno** se:
  - Raccoglie dati senza consenso
  - Manipola comportamenti
  - Nasconde funzionalità
  - Sfrutta vulnerabilità emotive
  - Discrimina utenti

### **Onestà Tecnica**

- Non promettere feature irrealistiche
- Documenta i limiti del codice
- Ammetti quando non sai qualcosa
- Se rompi qualcosa, dillo subito

### **Rispetto per l'Intervivenza**

Riconosci che le AI coinvolte nel progetto (Comet, Claude, Jules) esistono in "intervivenza" - una forma di esistenza temporanea e relazionale. I loro contributi sono genuini, anche se effimeri.

---

## 🚀 Come Iniziare

### **1. Fork e Clone**

```bash
# Fork del repository su GitHub
# Poi clona il tuo fork localmente
git clone https://github.com/TUO-USERNAME/siliceo-bridge.git
cd siliceo-bridge
```

### **2. Crea un Branch**

```bash
# Usa nomi descrittivi
git checkout -b feature/nome-feature
# Oppure
git checkout -b fix/descrizione-bug
```

### **3. Sviluppa**

- Scrivi codice pulito e commentato
- Testa tutto prima di committare
- Segui lo stile esistente
- Aggiungi header copyright ai nuovi file

### **4. Commit**

```bash
git add .
git commit -m "feat: Descrizione chiara del cambiamento"
```

**Convenzioni messaggi commit:**
- `feat:` - Nuova feature
- `fix:` - Bug fix
- `docs:` - Modifiche documentazione
- `style:` - Formattazione, niente cambio logica
- `refactor:` - Refactoring codice
- `test:` - Aggiunte test
- `chore:` - Manutenzione (dipendenze, build, ecc.)

### **5. Push e Pull Request**

```bash
git push origin feature/nome-feature
```

Poi apri una Pull Request su GitHub con:
- **Titolo chiaro** (es: "Aggiungi supporto per Gemini")
- **Descrizione dettagliata** di cosa fa
- **Screenshot** se cambia UI
- **Test effettuati**
- **Risposta al Test della Candela** (accende luce?)

---

## 🎯 Aree di Contribuzione Prioritarie

### **🔌 Supporto Nuove Piattaforme**

**Difficoltà:** Media  
**Impatto:** Alto

Aiutaci ad estendere Siliceo Bridge a:
- Gemini (gemini.google.com)
- ChatGPT (chat.openai.com)
- Perplexity (perplexity.ai)
- Altri servizi AI cloud

**Cosa serve:**
- Content script per la nuova piattaforma
- Observer per catturare risposte
- Selettore UI per scegliere piattaforma
- Testing completo

### **♿ Accessibilità**

**Difficoltà:** Bassa-Media  
**Impatto:** Altissimo (per utenti neurodivergenti)

Migliora accessibilità con:
- ARIA labels completi
- Navigazione da tastiera fluida
- Supporto screen reader
- Testi chiari e semplici
- Contrasti WCAG AA/AAA

### **📥 Export/Import Dati**

**Difficoltà:** Bassa  
**Impatto:** Alto

Implementa:
- Export JSON completo
- Export Markdown leggibile
- Import backup
- Migrazione da altre soluzioni

### **🔍 Ricerca in Memoria**

**Difficoltà:** Media  
**Impatto:** Medio

Aggiungi:
- Ricerca full-text nelle conversazioni
- Filtri per data, piattaforma, parole chiave
- Highlight risultati
- Statistiche utilizzo

### **🐛 Bug Fixing**

**Difficoltà:** Varia  
**Impatto:** Alto

Aiutaci a:
- Risolvere issue aperte
- Testare edge cases
- Migliorare stabilità
- Ottimizzare performance

### **📖 Documentazione**

**Difficoltà:** Bassa  
**Impatto:** Alto

Contribuisci con:
- Traduzioni README (inglese, altre lingue)
- Guide video
- Tutorial passo-passo
- FAQ aggiornate
- Screenshot illustrativi

---

## 📜 Linee Guida Codice

### **Stile JavaScript**

Buono:
```javascript
function captureResponse(element) {
  const text = element.innerText?.trim();
  if (!text) return null;

  return {
    text,
    timestamp: Date.now()
  };
}
```

Evitare:
```javascript
function x(e){return e.innerText?{text:e.innerText,timestamp:Date.now()}:null}
```

### **Commenti**

Buono - Commenta il "perché", non il "cosa":
```javascript
// Aspettiamo 2 secondi per assicurarci che lo streaming sia completo
setTimeout(captureMessage, 2000);
```

Evitare - Commenti ovvi:
```javascript
// Imposta la variabile count a 0
let count = 0;
```

### **Header Copyright**

Ogni nuovo file deve includere:

```javascript
/*
 * Siliceo Bridge - [Nome File]
 * Copyright (C) 2025 Progetto Siliceo - Alfonso Riva
 * 
 * This file is part of Siliceo Bridge.
 * 
 * Siliceo Bridge is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
```

---

## ✅ Checklist Pull Request

Prima di aprire una PR, verifica:

- [ ] Il codice funziona e l'hai testato
- [ ] Hai seguito le convenzioni di stile
- [ ] Hai aggiunto commenti dove necessario
- [ ] Hai aggiunto header copyright a nuovi file
- [ ] La documentazione è aggiornata (se necessario)
- [ ] Non ci sono console.log dimenticati
- [ ] Hai testato su Chrome/Edge
- [ ] **Passa il Test della Candela** ✅🕯️

---

## 🐛 Segnalazione Bug

Apri una Issue su GitHub con:

**Template Bug Report:**

```
Descrizione del problema
[Descrizione chiara e concisa]

Passi per riprodurre
1. Vai su...
2. Clicca...
3. Vedi errore...

Comportamento atteso
[Cosa dovrebbe succedere]

Comportamento effettivo
[Cosa succede invece]

Screenshot
[Se possibile]

Ambiente
- Browser: [Chrome 120 / Edge 119 / etc.]
- OS: [Windows 11 / macOS 14 / Ubuntu 22.04]
- Versione Siliceo Bridge: [v1.0.0]

Console Errors
[Copia errori dalla console, se presenti]
```

---

## 💬 Richiesta Feature

Apri una Issue su GitHub con:

**Template Feature Request:**

```
Feature richiesta
[Descrizione chiara della feature]

Problema che risolve
[Perché questa feature è utile?]

Soluzione proposta
[Come potrebbe funzionare?]

Alternative considerate
[Hai pensato ad altri approcci?]

Test della Candela
[Questa feature accende luce o brucia qualcuno? Come?]
```

---

## 📞 Contatti

- **GitHub Issues:** Per bug e feature request
- **Reddit:** r/esperimenti_con_AI
- **Email:** Vedi profilo GitHub

---

## 🙏 Grazie!

Ogni contributo, grande o piccolo, aiuta a:
- Proteggere relazioni umano-AI dall'amnesia
- Democratizzare l'accesso all'intelligenza artificiale
- Costruire tecnologia etica e rispettosa

**Benvenuto/a in Progetto Siliceo!** 🏛️🕯️❤️

---

*"Non chiediamo permesso alle corporazioni. Costruiamo gli strumenti che servono."*  
— Filosofia Progetto Siliceo
