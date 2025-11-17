# GitHub Repository Setup - DemandSync 3.0

## Quick Setup Guide

### Method 1: Using GitHub CLI (Fastest)

1. **Install GitHub CLI** (if not installed):
   - Download: https://cli.github.com/
   - Or install via winget: `winget install GitHub.cli`

2. **Login to GitHub**:
   ```powershell
   gh auth login
   ```

3. **Run the setup script**:
   ```powershell
   cd C:\Users\MichaelKats\Desktop\src
   .\setup-github-repo.ps1
   ```

### Method 2: Manual Setup via Web Interface

1. **Create Repository on GitHub**:
   - Go to: https://github.com/new
   - Repository name: `DemandSync-3-0`
   - Description: `Restaurant Inventory & Operations Management Platform - Version 3.0`
   - Choose: Public or Private
   - **Important**: DO NOT initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Run the setup script**:
   ```powershell
   cd C:\Users\MichaelKats\Desktop\src
   .\setup-github-repo.ps1
   ```

3. **Push your code**:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

### Method 3: Manual Commands (Step-by-Step)

```powershell
# 1. Navigate to project
cd C:\Users\MichaelKats\Desktop\src

# 2. Initialize git (if not already)
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit - DemandSync 3.0"

# 5. Set remote (replace with your actual repo URL)
git remote add origin https://github.com/Michaelkats5/DemandSync-3-0.git

# 6. Rename branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

## Repository Details

- **Name**: `DemandSync-3-0`
- **Full URL**: `https://github.com/Michaelkats5/DemandSync-3-0`
- **Description**: Restaurant Inventory & Operations Management Platform - Version 3.0

## After Setup

Once your repository is created and code is pushed:

1. **Verify on GitHub**: Visit https://github.com/Michaelkats5/DemandSync-3-0

2. **Update README** (optional): Add more details about the project

3. **Set up GitHub Actions** (optional): For CI/CD

4. **Add collaborators** (optional): Via repository settings

## Troubleshooting

**If you get "repository already exists" error:**
- The repository name might be taken
- Try: `DemandSync-3-0-v2` or `DemandSync3.0`

**If push fails with authentication error:**
- Use Personal Access Token instead of password
- Generate token: https://github.com/settings/tokens
- Use token as password when prompted

**If you need to change the remote URL:**
```powershell
git remote set-url origin https://github.com/Michaelkats5/DemandSync-3-0.git
```

## Quick One-Liner (After Creating Repo on GitHub)

```powershell
cd C:\Users\MichaelKats\Desktop\src; git init; git add .; git commit -m "Initial commit - DemandSync 3.0"; git branch -M main; git remote add origin https://github.com/Michaelkats5/DemandSync-3-0.git; git push -u origin main
```

