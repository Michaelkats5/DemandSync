# Installation Guide - Fix "Site Can't Be Reached"

## Problem: Python and Node.js are not installed

You need both to run the application.

## Step 1: Install Python

1. Go to: https://www.python.org/downloads/
2. Download Python 3.11 or 3.12 (Windows installer)
3. **IMPORTANT:** During installation, check ✅ "Add Python to PATH"
4. Click "Install Now"
5. After installation, **RESTART your terminal/PowerShell**

## Step 2: Install Node.js

1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through the installation (default settings are fine)
5. After installation, **RESTART your terminal/PowerShell**

## Step 3: Verify Installation

Open a NEW terminal/PowerShell and run:

```bash
python --version
node --version
npm --version
```

You should see version numbers for each.

## Step 4: Install Project Dependencies

```bash
cd C:\Users\MichaelKats\Desktop\src

# Install backend dependencies
python -m pip install -r requirements.txt

# Install frontend dependencies
npm install
```

## Step 5: Start the Servers

**Open TWO terminal windows:**

**Terminal 1 - Backend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
python -m uvicorn app.main:app --reload --port 8000
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
npm run dev
```

You should see: `Local: http://localhost:3000`

## Step 6: Open in Browser

Once both servers are running, open:
- **http://localhost:3000** (Frontend)
- **http://localhost:8000/docs** (Backend API docs)

## Troubleshooting

- **"Python not found"** → Restart terminal after installing Python
- **"Node not found"** → Restart terminal after installing Node.js
- **Port already in use** → Close other applications using ports 3000 or 8000
- **Permission errors** → Run terminal as Administrator


