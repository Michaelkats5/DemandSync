# Migration Guide: DemandSync 3.0

## Step-by-Step Instructions for Windows

Follow these commands in PowerShell or Command Prompt to organize your project as DemandSync 3.0.

### Step 1: Navigate to Your Desktop

```powershell
cd C:\Users\MichaelKats\Desktop
```

### Step 2: Create the DemandSync-3-0 Folder

```powershell
New-Item -ItemType Directory -Path "DemandSync-3-0" -Force
```

### Step 3: Copy Current Project to New Folder

**Option A: Copy the entire `src` folder (Recommended)**

```powershell
Copy-Item -Path "src\*" -Destination "DemandSync-3-0\" -Recurse -Force
```

**Option B: If you want to move instead of copy (removes from src)**

```powershell
Move-Item -Path "src\*" -Destination "DemandSync-3-0\" -Force
```

### Step 4: Navigate to the New Project Folder

```powershell
cd DemandSync-3-0
```

### Step 5: Initialize Git Repository (if not already initialized)

```powershell
# Check if git is already initialized
if (Test-Path ".git") {
    Write-Host "Git repository already exists"
} else {
    git init
    Write-Host "Git repository initialized"
}
```

### Step 6: Update Git Remote (if needed)

**Option A: Update existing remote to new repository name**

```powershell
git remote set-url origin https://github.com/Michaelkats5/DemandSync-3-0.git
```

**Option B: Add new remote (if creating new repo)**

```powershell
git remote add origin https://github.com/Michaelkats5/DemandSync-3-0.git
```

**Option C: Keep existing remote (if keeping same repo)**

```powershell
# No action needed - remote stays the same
git remote -v
```

### Step 7: Verify Project Structure

```powershell
# Check that all files are present
Get-ChildItem -Recurse -File | Measure-Object | Select-Object Count

# Verify package.json was updated
Get-Content package.json | Select-String "demandsync-3-0"
```

### Step 8: Install Dependencies (if needed)

```powershell
# Install frontend dependencies
npm install

# Install backend dependencies (if requirements.txt exists)
if (Test-Path "requirements.txt") {
    python -m pip install -r requirements.txt
}
```

### Step 9: Commit Changes (if using git)

```powershell
# Stage all changes
git add .

# Commit with message
git commit -m "Migrate to DemandSync 3.0 - Update project metadata and structure"

# Push to remote (if remote is set)
git push -u origin main
```

### Step 10: Verify Everything Works

```powershell
# Test frontend build
npm run build

# Test backend (if applicable)
# python -m uvicorn app.main:app --reload --port 8000
```

## Quick Migration Script (All-in-One)

Copy and paste this entire block into PowerShell:

```powershell
# Navigate to Desktop
cd C:\Users\MichaelKats\Desktop

# Create new folder
New-Item -ItemType Directory -Path "DemandSync-3-0" -Force

# Copy project files
Copy-Item -Path "src\*" -Destination "DemandSync-3-0\" -Recurse -Force

# Navigate to new folder
cd DemandSync-3-0

# Initialize git if needed
if (-not (Test-Path ".git")) {
    git init
}

# Check git remote
Write-Host "Current git remote:"
git remote -v

# Verify package.json
Write-Host "`nPackage.json name and version:"
Get-Content package.json | Select-String -Pattern '"name"|"version"'

Write-Host "`nMigration complete! Project is now in DemandSync-3-0 folder."
```

## Files Updated for Version 3.0

The following files have been updated with the new version information:

- ✅ `package.json` - Name: `demandsync-3-0`, Version: `3.0.0`
- ✅ `README.md` - Title updated to "DemandSync 3.0"
- ✅ `index.html` - Title updated to "DemandSync 3.0"
- ✅ `app/main.py` - FastAPI title: "DemandSync Backend" (can be updated if needed)

## Next Steps After Migration

1. **Update GitHub Repository** (if creating new repo):
   - Create new repository: `DemandSync-3-0` on GitHub
   - Update remote URL: `git remote set-url origin https://github.com/Michaelkats5/DemandSync-3-0.git`

2. **Update Environment Variables** (if any):
   - Check for `.env` files and update project paths if needed
   - Update any hardcoded paths in configuration files

3. **Update Documentation**:
   - Update any internal documentation references
   - Update deployment scripts if applicable

4. **Test the Application**:
   - Run `npm run dev` to start frontend
   - Run backend server to verify everything works
   - Test all major features

## Troubleshooting

**If files don't copy correctly:**
```powershell
# Use robocopy for better file copying
robocopy "C:\Users\MichaelKats\Desktop\src" "C:\Users\MichaelKats\Desktop\DemandSync-3-0" /E /COPYALL
```

**If git remote needs updating:**
```powershell
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/Michaelkats5/DemandSync-3-0.git

# Verify
git remote -v
```

**If you need to start fresh with git:**
```powershell
# Remove existing .git folder
Remove-Item -Path ".git" -Recurse -Force

# Initialize new repository
git init
git add .
git commit -m "Initial commit - DemandSync 3.0"
```

