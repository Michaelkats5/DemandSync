# Quick Migration to DemandSync 3.0

## Option 1: Automated Script (Recommended)

Run the PowerShell script:

```powershell
cd C:\Users\MichaelKats\Desktop\src
.\migrate-to-3.0.ps1
```

## Option 2: Manual Commands

Copy and paste these commands one by one:

```powershell
# 1. Navigate to Desktop
cd C:\Users\MichaelKats\Desktop

# 2. Create folder
New-Item -ItemType Directory -Path "DemandSync-3-0" -Force

# 3. Copy project
Copy-Item -Path "src\*" -Destination "DemandSync-3-0\" -Recurse -Force

# 4. Navigate to new folder
cd DemandSync-3-0

# 5. Verify
Get-Content package.json | Select-String "demandsync-3-0"
```

## Option 3: One-Line Copy

```powershell
cd C:\Users\MichaelKats\Desktop; New-Item -ItemType Directory -Path "DemandSync-3-0" -Force; Copy-Item -Path "src\*" -Destination "DemandSync-3-0\" -Recurse -Force; cd DemandSync-3-0
```

## After Migration

1. **Update Git Remote** (if creating new repo):
   ```powershell
   git remote set-url origin https://github.com/Michaelkats5/DemandSync-3-0.git
   ```

2. **Install Dependencies**:
   ```powershell
   npm install
   python -m pip install -r requirements.txt
   ```

3. **Test**:
   ```powershell
   npm run dev
   ```

## Files Already Updated

✅ `package.json` - Name: `demandsync-3-0`, Version: `3.0.0`  
✅ `README.md` - Title: "DemandSync 3.0"  
✅ `index.html` - Title: "DemandSync 3.0"  
✅ `app/main.py` - FastAPI title: "DemandSync 3.0 Backend", Version: "3.0.0"

