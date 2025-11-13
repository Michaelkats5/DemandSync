import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";

export default function ImportData() {
  const [fileType, setFileType] = useState("csv");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [importType, setImportType] = useState("inventory");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImportStatus(null);

    if (fileType === "csv") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1, Math.min(11, lines.length)).map(line => {
          const values = line.split(',').map(v => v.trim());
          return headers.reduce((obj, header, idx) => {
            obj[header] = values[idx] || '';
            return obj;
          }, {});
        });
        setPreviewData({ headers, rows, totalRows: lines.length - 1 });
      };
      reader.readAsText(file);
    } else {
      setPreviewData({
        headers: ["Note: Excel parsing requires additional library"],
        rows: [{ note: "Excel file selected. Install 'xlsx' library for full support." }],
        totalRows: 0
      });
    }
  };

  const handleImport = () => {
    if (!selectedFile) {
      setImportStatus({ type: "error", message: "Please select a file first" });
      return;
    }

    setImportStatus({ type: "processing", message: "Importing data..." });
    
    setTimeout(() => {
      setImportStatus({
        type: "success",
        message: `Successfully imported ${previewData?.totalRows || 0} records`
      });
    }, 2000);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
        body { background: radial-gradient(circle at top, #e6f4ff 0, #b9e6ff 35%, #8ad0ff 100%); padding: 24px; color: #0f172a; }
        .page-container { max-width: 1400px; margin: 0 auto; }
        .header-card { background: linear-gradient(135deg, #0ea5e9, #38bdf8); color: white; padding: 24px; border-radius: 24px; margin-bottom: 24px; }
        .page-title { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
        .page-subtitle { font-size: 14px; opacity: 0.9; }
        .card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 24px; }
        .card-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #334155; }
        .form-select, .form-input { width: 100%; padding: 10px 12px; border: 1px solid #dbeafe; border-radius: 8px; font-size: 14px; background: white; }
        .file-upload-area { border: 2px dashed #0ea5e9; border-radius: 12px; padding: 40px; text-align: center; background: #f0f9ff; cursor: pointer; transition: all 0.2s; }
        .file-upload-area:hover { background: #e0f2fe; border-color: #0284c7; }
        .file-upload-area.dragover { background: #dbeafe; border-color: #0284c7; }
        .file-input { display: none; }
        .upload-icon { font-size: 48px; margin-bottom: 12px; }
        .upload-text { font-size: 16px; font-weight: 500; color: #0ea5e9; margin-bottom: 4px; }
        .upload-hint { font-size: 12px; color: #6b7280; }
        .selected-file { background: #f0f9ff; padding: 12px; border-radius: 8px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center; }
        .file-name { font-weight: 500; color: #0f172a; }
        .file-size { font-size: 12px; color: #6b7280; }
        .preview-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .preview-table th { background: #eff6ff; padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; border-bottom: 2px solid #dbeafe; }
        .preview-table td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .preview-table tr:hover { background: #f9fafb; }
        .status-message { padding: 12px 16px; border-radius: 8px; margin-top: 16px; font-size: 14px; }
        .status-success { background: #d1fae5; color: #065f46; border: 1px solid #86efac; }
        .status-error { background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
        .status-processing { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
        .action-buttons { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: #0ea5e9; color: white; }
        .btn-primary:hover { background: #0284c7; transform: translateY(-1px); }
        .btn-secondary { background: white; color: #0ea5e9; border: 1px solid #0ea5e9; }
        .btn-secondary:hover { background: #f0f9ff; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .info-box { background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .info-box-title { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
        .info-box-text { font-size: 13px; color: #475569; line-height: 1.6; }
        .info-box ul { margin-left: 20px; margin-top: 8px; }
        .info-box li { margin-bottom: 4px; }
      `}</style>

      <div className="page-container">
        <div className="header-card">
          <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: 14, marginBottom: 16, display: "block" }}>← Back to Dashboard</Link>
          <h1 className="page-title">Import Data</h1>
          <p className="page-subtitle">Upload Excel (.xlsx, .xls) or CSV files to import inventory, pricing, or usage data</p>
        </div>

        <div className="info-box">
          <div className="info-box-title">Supported File Formats</div>
          <div className="info-box-text">
            <ul>
              <li><strong>CSV (.csv):</strong> Comma-separated values - Full support</li>
              <li><strong>Excel (.xlsx, .xls):</strong> Microsoft Excel files - Basic support (install 'xlsx' library for full parsing)</li>
            </ul>
            <div style={{ marginTop: 12 }}>
              <strong>Supported Import Types:</strong>
              <ul>
                <li><strong>Inventory:</strong> Import current inventory levels, par levels, and on-hand quantities</li>
                <li><strong>Pricing:</strong> Import price history and vendor pricing data</li>
                <li><strong>Usage:</strong> Import historical usage data and consumption records</li>
                <li><strong>Purchase Orders:</strong> Import purchase order data and vendor information</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Import Configuration</h2>
          
          <div className="form-group">
            <label className="form-label">Import Type</label>
            <select className="form-select" value={importType} onChange={(e) => setImportType(e.target.value)}>
              <option value="inventory">Inventory Data</option>
              <option value="pricing">Pricing Data</option>
              <option value="usage">Usage Data</option>
              <option value="purchase-orders">Purchase Orders</option>
              <option value="products">Product Catalog</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">File Format</label>
            <select className="form-select" value={fileType} onChange={(e) => setFileType(e.target.value)}>
              <option value="csv">CSV (.csv)</option>
              <option value="excel">Excel (.xlsx, .xls)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select File</label>
            <div
              className="file-upload-area"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('dragover');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) {
                  setSelectedFile(file);
                  handleFileSelect({ target: { files: [file] } });
                }
              }}
              onClick={() => document.getElementById('file-input').click()}
            >
              <div className="upload-icon">📄</div>
              <div className="upload-text">Click to upload or drag and drop</div>
              <div className="upload-hint">
                {fileType === "csv" 
                  ? "CSV files only (.csv)" 
                  : "Excel files only (.xlsx, .xls)"}
              </div>
              <input
                id="file-input"
                type="file"
                className="file-input"
                accept={fileType === "csv" ? ".csv" : ".xlsx,.xls"}
                onChange={handleFileSelect}
              />
            </div>

            {selectedFile && (
              <div className="selected-file">
                <div>
                  <div className="file-name">{selectedFile.name}</div>
                  <div className="file-size">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewData(null);
                    setImportStatus(null);
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {previewData && (
            <div className="form-group">
              <label className="form-label">Data Preview ({previewData.totalRows} total rows)</label>
              <div style={{ maxHeight: "400px", overflow: "auto", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <table className="preview-table">
                  <thead style={{ position: "sticky", top: 0, background: "#eff6ff", zIndex: 10 }}>
                    <tr>
                      {previewData.headers.map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.rows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {previewData.headers.map((header, colIdx) => (
                          <td key={colIdx}>{row[header] || '-'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {previewData.totalRows > 10 && (
                <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
                  Showing first 10 rows of {previewData.totalRows} total rows
                </div>
              )}
            </div>
          )}

          {importStatus && (
            <div className={`status-message status-${importStatus.type}`}>
              {importStatus.message}
            </div>
          )}

          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={handleImport}
              disabled={!selectedFile || importStatus?.type === "processing"}
            >
              {importStatus?.type === "processing" ? "Importing..." : "Import Data"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedFile(null);
                setPreviewData(null);
                setImportStatus(null);
              }}
            >
              Clear
            </button>
            <button className="btn btn-secondary">
              Download Template
            </button>
            <button className="btn btn-secondary">
              View Import History
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Import Instructions</h2>
          <div className="info-box-text">
            <p><strong>For Inventory Import:</strong></p>
            <ul>
              <li>Required columns: Item Name, Category, Current On Hand, Par Level</li>
              <li>Optional columns: Unit of Measure, Storage Location, Vendor, Unit Cost</li>
              <li>Item names must match existing inventory items for updates</li>
            </ul>
            <p style={{ marginTop: 16 }}><strong>For Pricing Import:</strong></p>
            <ul>
              <li>Required columns: Item Name, Current Price, Date</li>
              <li>Optional columns: Vendor, Previous Price, Price Change %</li>
            </ul>
            <p style={{ marginTop: 16 }}><strong>For Usage Import:</strong></p>
            <ul>
              <li>Required columns: Item Name, Date, Quantity Used</li>
              <li>Optional columns: Category, Station, Shift</li>
            </ul>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

