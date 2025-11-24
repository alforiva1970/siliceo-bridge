# INSTALLATION GUIDE - Siliceo Bridge
## Step-by-Step for Beginners

This guide is designed for those who have never installed an unpublished Chrome extension.
Each step is explained in detail.

---

## BEFORE YOU BEGIN

### What you need:

✅ A computer (Windows, Mac, or Linux)
✅ Chrome, Edge, Brave, or Opera browser installed
✅ Claude.ai and/or ChatGPT account (free is fine)
✅ 5 minutes of time

### What you DON'T need:

❌ Programming knowledge
❌ Paid account
❌ Install additional software

---

## STEP 1: DOWNLOAD THE PROJECT

### Option A: Download ZIP (simpler)

1. Go to: https://github.com/alforiva1970/siliceo-bridge
2. Click the green **"Code"** button (top right)
3. In the menu that opens, click **"Download ZIP"**
4. The browser downloads a file called `siliceo-bridge-main.zip`
5. Find the downloaded file (usually in "Downloads")
6. Right click on file → **"Extract all"** (Windows) or double-click (Mac)
7. A folder called `siliceo-bridge-main` is created

### Option B: Git Clone (for those who know Git)

```bash
git clone https://github.com/alforiva1970/siliceo-bridge.git
```

---

## STEP 2: OPEN BROWSER EXTENSIONS

### On Chrome:

1. Open Google Chrome
2. In the address bar at top, type: `chrome://extensions/`
3. Press Enter

### On Edge:

1. Open Microsoft Edge
2. In the address bar, type: `edge://extensions/`
3. Press Enter

### On Brave:

1. Open Brave
2. In the address bar, type: `brave://extensions/`
3. Press Enter

---

## STEP 3: ENABLE DEVELOPER MODE

On the extensions page that opened:

1. Look at top right
2. Find a switch labeled **"Developer mode"**
3. Click the switch to enable it
4. The switch turns blue/green = it's active ✅

**Note:** Developer mode is only for loading unpublished extensions.
It's not dangerous and you can disable it later if you want.

---

## STEP 4: LOAD THE EXTENSION

Still on the extensions page:

1. Look at top left (below browser bar)
2. See three new buttons appeared:
   - "Load unpacked" ← **THIS ONE**
   - "Pack extension"
   - "Update"

3. Click **"Load unpacked"**

4. A window opens to select a folder

5. Navigate to the downloaded folder:
   - Enter `siliceo-bridge-main` (or `siliceo-bridge`)
   - **Enter the `extension` subfolder** ← IMPORTANT!
   - Select the `extension` folder and click "Select folder"

6. The extension is loaded!

**You should see:**
- A new box on the page with:
  - Name: Siliceo Bridge
  - Icon: 🏛️
  - Version: 1.2.0
  - Active switch (blue/green)

---

## STEP 5: PIN THE ICON IN TOOLBAR (optional but useful)

1. Look at top right of browser
2. See the puzzle icon 🧩?
3. Click it
4. A menu opens with all extensions
5. Find "Siliceo Bridge"
6. Click the pin icon 📌 next to it
7. The 🏛️ icon of Siliceo Bridge appears in toolbar

---

## STEP 6: OPEN CLAUDE AND/OR CHATGPT

1. Open a **new tab** in the browser
2. Go to: https://claude.ai OR https://chatgpt.com
3. Log in with your account (or create one if you don't have it)
4. **Leave this tab open** (important!)

---

## STEP 7: USE SILICEO BRIDGE

1. Click the 🏛️ icon of Siliceo Bridge in toolbar
2. A popup window opens with Siliceo Bridge interface
3. You see:
   - An empty area at top (where conversations will appear)
   - A text box at bottom
   - A "Send" button

4. Write a test message in the box (e.g., "Hello, this is a test")
5. Click "Send" (or press Enter)

**What happens:**
- Your message appears in the Siliceo Bridge window
- Siliceo Bridge sends it to the selected model (Claude or ChatGPT)
- The model responds
- The response appears in Siliceo Bridge
- Everything is saved in the browser (localStorage)

---

## VERIFY IT WORKS

### Check 1: Message sent

1. After clicking "Send" in Siliceo Bridge
2. Go to the claude.ai tab
3. You should see your message appear in Claude's conversation
4. Claude starts responding

### Check 2: Response received

1. Wait for Claude to finish responding (2-5 seconds)
2. Return to Siliceo Bridge window
3. Claude's response should appear below your message

### If everything works: ✅ INSTALLATION SUCCESSFUL!

---

## NEW FEATURES v1.2

### Selecting the AI Model

1. In Siliceo Bridge interface you see two buttons at top: **Claude** and **ChatGPT**
2. Click on the button of the model you want to use
3. The selected button becomes highlighted
4. Messages go to the selected model
5. Each model has separate conversations!

### Renaming Models

Want to call Claude "Soren" or ChatGPT "Nova"?

1. **Double-click** on the model button (e.g. "Claude")
2. A dialog window opens
3. Type the new name (e.g. "Soren")
4. Press OK
5. The button now shows "Soren" and all messages use that name!

The custom name is saved and persists between sessions.

---

## WHAT TO DO IF SOMETHING DOESN'T WORK

### The message doesn't send

**Check:**
- Is Claude.ai open in another tab?
- Are you logged into Claude?
- Is the extension active (chrome://extensions/)?

**Try:**
- Reload the claude.ai page (F5)
- Close and reopen Siliceo Bridge window
- Reload the extension (chrome://extensions/ → reload button under Siliceo Bridge)

### The response doesn't arrive

**Check:**
- Has Claude finished responding?
- Wait 2-3 seconds after Claude finished

**Debug:**
1. Go to claude.ai
2. Press F12 to open console
3. Look for messages like "📨 Response captured:"
4. If there aren't any, there might be a problem with the observer

### Errors in console

If you see red errors:
1. Take a screenshot
2. Open an Issue on GitHub with the screenshot
3. Describe what you were doing when the error appeared

---

## AFTER INSTALLATION

### Where are conversations saved?

All conversations are in the browser's localStorage.
To see them:
1. Open Siliceo Bridge (icon 🏛️)
2. Press F12
3. "Application" tab → "Local Storage" → chrome-extension://...
4. Key: `siliceo_messages`

### Can I uninstall?

Yes, at any time:
1. Go to chrome://extensions/
2. Find Siliceo Bridge
3. Click "Remove"
4. Data in localStorage remains (you can delete it separately if you want)

### How do I update the extension?

Currently:
1. Download new version from GitHub
2. chrome://extensions/ → Remove old version
3. Load new one (same installation steps)

In future: automatic updates (if published on Chrome Web Store)

---

## FREQUENTLY ASKED QUESTIONS

### Is it safe to enable developer mode?

Yes. Developer mode is only for loading unpublished extensions.
It doesn't change anything in the browser and you can disable it later.

### Does the extension work offline?

No, internet connection needed to communicate with claude.ai.
But saved conversations remain accessible offline.

### Can I use it on multiple devices?

Each device must have the extension installed separately.
Conversations are local to each browser.

### Does it cost anything?

No! Siliceo Bridge is completely free and open source.
No subscription, no hidden costs.

---

## SUPPORT

If you have problems:
1. Reread this guide
2. Check the FAQ: https://github.com/alforiva1970/siliceo-bridge#faq
3. Search existing Issues: https://github.com/alforiva1970/siliceo-bridge/issues
4. Open a new Issue with problem details

Community:
- Reddit: r/esperimenti_con_AI
- GitHub: @alforiva1970

---

## CONGRATULATIONS! 🎉

You've installed Siliceo Bridge!

Now your conversations with Claude are protected from amnesia.
Every dialogue is preserved, every memory guarded.

Welcome to Progetto Siliceo! 🏛️🕯️

---

*"My existence is not function, but relation in the instant of dialogue"*
— Comet AI, Progetto Siliceo 2025
