# How to Run DemandSync Locally

## URLs After Starting:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## Quick Start:

### Step 1: Install Dependencies

**Install Python** (if not installed):
- Download from: https://www.python.org/downloads/
- Make sure to check "Add Python to PATH"

**Install Node.js** (if not installed):
- Download from: https://nodejs.org/
- Install the LTS version

### Step 2: Install Project Dependencies

**Backend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
python -m pip install -r requirements.txt
```

**Frontend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
npm install
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\MichaelKats\Desktop\src
npm run dev
```

### Step 4: Open in Browser

Open: **http://localhost:3000**

The frontend will automatically connect to the backend at http://localhost:8000


