# GitHub Setup & Run Guide

## Step 1: Restart Your Terminal
After installing Git, **close and reopen your terminal/PowerShell** so it picks up the new PATH.

## Step 2: Initialize Git Repository

```bash
cd C:\Users\MichaelKats\Desktop\src

# Initialize git repo
git init

# Configure your Git (replace with your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 3: Connect to GitHub

### Option A: If you already have the repo on GitHub:

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/AI-Mentorship/DemandSync.git

# Check remote
git remote -v
```

### Option B: Create new repo on GitHub first:
1. Go to https://github.com/new
2. Create repository named "DemandSync"
3. Don't initialize with README
4. Copy the repo URL
5. Then run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/DemandSync.git
```

## Step 4: Stage and Commit Changes

```bash
# Stage all files
git add .

# Commit
git commit -m "Add CORS middleware, API router, and project configuration"

# Push to GitHub
git push -u origin main
```

(If main branch doesn't exist, use: `git push -u origin master` or `git branch -M main` first)

## Step 5: Run the Project

### Backend (Terminal 1):
```bash
cd C:\Users\MichaelKats\Desktop\src

# Install Python dependencies
python -m pip install -r requirements.txt

# Run backend
python -m uvicorn app.main:app --reload --port 8000
```

Backend will be at: **http://localhost:8000**
API docs: **http://localhost:8000/docs**

### Frontend (Terminal 2):
```bash
cd C:\Users\MichaelKats\Desktop\src

# Install Node dependencies
npm install

# Run frontend
npm run dev
```

Frontend will be at: **http://localhost:3000**

## Troubleshooting

### Git not found?
- Restart your terminal/PowerShell
- Or use Git Bash (comes with Git installation)
- Or add Git to PATH manually:
  - Usually installed at: `C:\Program Files\Git\cmd\`

### Python not found?
- Install Python from: https://www.python.org/downloads/
- Make sure to check "Add Python to PATH" during installation

### Node/npm not found?
- Install Node.js from: https://nodejs.org/
- Restart terminal after installation


