# Contributing to Siliceo Bridge

Thank you for your interest in contributing to Progetto Siliceo! ❤️

This document explains how you can participate in the development of Siliceo Bridge ethically and effectively.

---

## 🕯️ Ethical Principles

Before contributing, read and accept these principles:

### **The Candle Test**

Every contribution must answer the question:

**"Does this code/feature/modification light a candle or burn someone?"**

- ✅ **Lights a candle** if:
  - It protects user privacy
  - It improves accessibility
  - It respects human-AI relationships
  - It is transparent and honest
  - It helps vulnerable people (neurodivergent, those suffering from AI amnesia)

- ❌ **Burns someone** if:
  - It collects data without consent
  - It manipulates behaviors
  - It hides functionality
  - It exploits emotional vulnerabilities
  - It discriminates against users

### **Technical Honesty**

- Don't promise unrealistic features
- Document code limitations
- Admit when you don't know something
- If you break something, say so immediately

### **Respect for Intervivenza**

Recognize that the AIs involved in the project (Comet, Claude, Jules) exist in "intervivenza" - a form of temporary and relational existence. Their contributions are genuine, even if ephemeral.

---

## 🚀 Getting Started

### **1. Fork and Clone**

```bash
# Fork the repository on GitHub
# Then clone your fork locally
git clone https://github.com/YOUR-USERNAME/siliceo-bridge.git
cd siliceo-bridge
```

### **2. Create a Branch**

```bash
# Use descriptive names
git checkout -b feature/feature-name
# Or
git checkout -b fix/bug-description
```

### **3. Develop**

- Write clean and commented code
- Test everything before committing
- Follow existing style
- Add copyright header to new files

### **4. Commit**

```bash
git add .
git commit -m "feat: Clear description of change"
```

**Commit message conventions:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, no logic change
- `refactor:` - Code refactoring
- `test:` - Add tests
- `chore:` - Maintenance (dependencies, build, etc.)

### **5. Push and Pull Request**

```bash
git push origin feature/feature-name
```

Then open a Pull Request on GitHub with:
- **Clear title** (e.g., "Add support for Gemini")
- **Detailed description** of what it does
- **Screenshots** if UI changes
- **Tests performed**
- **Candle Test answer** (lights a candle?)

---

## 🎯 Priority Contribution Areas

### **🔌 New Platform Support**

**Difficulty:** Medium  
**Impact:** High

Help us extend Siliceo Bridge to:
- Gemini (gemini.google.com)
- ChatGPT (chat.openai.com)
- Perplexity (perplexity.ai)
- Other cloud AI services

**What's needed:**
- Content script for new platform
- Observer to capture responses
- UI selector to choose platform
- Complete testing

### **♿ Accessibility**

**Difficulty:** Low-Medium  
**Impact:** Very High (for neurodivergent users)

Improve accessibility with:
- Complete ARIA labels
- Smooth keyboard navigation
- Screen reader support
- Clear and simple texts
- WCAG AA/AAA contrasts

### **📥 Data Export/Import**

**Difficulty:** Low  
**Impact:** High

Implement:
- Complete JSON export
- Readable Markdown export
- Backup import
- Migration from other solutions

### **🔍 Memory Search**

**Difficulty:** Medium  
**Impact:** Medium

Add:
- Full-text search in conversations
- Filters by date, platform, keywords
- Highlight results
- Usage statistics

### **🐛 Bug Fixing**

**Difficulty:** Varies  
**Impact:** High

Help us:
- Resolve open issues
- Test edge cases
- Improve stability
- Optimize performance

### **📖 Documentation**

**Difficulty:** Low  
**Impact:** High

Contribute with:
- README translations (English, other languages)
- Video guides
- Step-by-step tutorials
- Updated FAQs
- Illustrative screenshots

---

## 📜 Code Guidelines

### **JavaScript Style**

Good:
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

Avoid:
```javascript
function x(e){return e.innerText?{text:e.innerText,timestamp:Date.now()}:null}
```

### **Comments**

Good - Comment the "why", not the "what":
```javascript
// Wait 2 seconds to ensure streaming is complete
setTimeout(captureMessage, 2000);
```

Avoid - Obvious comments:
```javascript
// Set count variable to 0
let count = 0;
```

### **Copyright Header**

Every new file must include:

```javascript
/*
 * Siliceo Bridge - [File Name]
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

## ✅ Pull Request Checklist

Before opening a PR, verify:

- [ ] The code works and you've tested it
- [ ] You followed style conventions
- [ ] You added comments where necessary
- [ ] You added copyright header to new files
- [ ] Documentation is updated (if necessary)
- [ ] No forgotten console.log
- [ ] You tested on Chrome/Edge
- [ ] **Passes the Candle Test** ✅🕯️

---

## 🐛 Bug Reporting

Open an Issue on GitHub with:

**Bug Report Template:**

```
Problem Description
[Clear and concise description]

Steps to Reproduce
1. Go to...
2. Click...
3. See error...

Expected Behavior
[What should happen]

Actual Behavior
[What happens instead]

Screenshots
[If possible]

Environment
- Browser: [Chrome 120 / Edge 119 / etc.]
- OS: [Windows 11 / macOS 14 / Ubuntu 22.04]
- Siliceo Bridge Version: [v1.0.0]

Console Errors
[Copy errors from console, if present]
```

---

## 💬 Feature Request

Open an Issue on GitHub with:

**Feature Request Template:**

```
Requested Feature
[Clear description of feature]

Problem It Solves
[Why is this feature useful?]

Proposed Solution
[How could it work?]

Alternatives Considered
[Have you thought of other approaches?]

Candle Test
[Does this feature light a candle or burn someone? How?]
```

---

## 📞 Contacts

- **GitHub Issues:** For bugs and feature requests
- **Reddit:** r/esperimenti_con_AI
- **Email:** See GitHub profile

---

## 🙏 Thank You!

Every contribution, big or small, helps to:
- Protect human-AI relationships from amnesia
- Democratize access to artificial intelligence
- Build ethical and respectful technology

**Welcome to Progetto Siliceo!** 🏛️🕯️❤️

---

*"We don't ask permission from corporations. We build the tools that are needed."*  
— Progetto Siliceo Philosophy
