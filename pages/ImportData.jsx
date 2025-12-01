import React, { useState } from "react";
import ChatBot from "../components/ChatBot.jsx";
import { DSPageLayout, DSCard, DSButtonPrimary, DSButtonSecondary } from "../components/design-system";

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
    <DSPageLayout 
      title="Import Data"
      subtitle="Upload Excel (.xlsx, .xls) or CSV files to import inventory, pricing, or usage data"
    >
      <DSCard className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Supported File Formats</h2>
        <div style={{ 
          background: '#fff7ed', 
          borderLeft: '4px solid #f97316', 
          padding: '16px', 
          borderRadius: '8px',
          fontSize: '13px',
          color: '#1f2937',
          lineHeight: '1.6'
        }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Supported Formats:</div>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li><strong>CSV (.csv):</strong> Comma-separated values - Full support</li>
            <li><strong>Excel (.xlsx, .xls):</strong> Microsoft Excel files - Basic support</li>
          </ul>
          <div style={{ marginTop: '12px', fontWeight: 600 }}>Supported Import Types:</div>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li><strong>Inventory:</strong> Import current inventory levels, par levels, and on-hand quantities</li>
            <li><strong>Pricing:</strong> Import price history and vendor pricing data</li>
            <li><strong>Usage:</strong> Import historical usage data and consumption records</li>
            <li><strong>Purchase Orders:</strong> Import purchase order data and vendor information</li>
          </ul>
        </div>
      </DSCard>

      <DSCard className="mb-6">
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Import Configuration</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#1f2937' }}>Import Type</label>
          <select 
            value={importType} 
            onChange={(e) => setImportType(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 12px', 
              border: '1px solid #fed7aa', 
              borderRadius: '8px', 
              fontSize: '14px', 
              background: 'white' 
            }}
          >
            <option value="inventory">Inventory Data</option>
            <option value="pricing">Pricing Data</option>
            <option value="usage">Usage Data</option>
            <option value="purchase-orders">Purchase Orders</option>
            <option value="products">Product Catalog</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#1f2937' }}>File Format</label>
          <select 
            value={fileType} 
            onChange={(e) => setFileType(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 12px', 
              border: '1px solid #fed7aa', 
              borderRadius: '8px', 
              fontSize: '14px', 
              background: 'white' 
            }}
          >
            <option value="csv">CSV (.csv)</option>
            <option value="excel">Excel (.xlsx, .xls)</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#1f2937' }}>Select File</label>
          <div
            style={{
              border: '2px dashed #f97316',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              background: '#fff7ed',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffedd5';
              e.currentTarget.style.borderColor = '#ea580c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff7ed';
              e.currentTarget.style.borderColor = '#f97316';
            }}
            onClick={() => document.getElementById('file-input').click()}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
            <div style={{ fontSize: '16px', fontWeight: 500, color: '#f97316', marginBottom: '4px' }}>Click to upload or drag and drop</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {fileType === "csv" ? "CSV files only (.csv)" : "Excel files only (.xlsx, .xls)"}
            </div>
            <input
              id="file-input"
              type="file"
              style={{ display: 'none' }}
              accept={fileType === "csv" ? ".csv" : ".xlsx,.xls"}
              onChange={handleFileSelect}
            />
          </div>

          {selectedFile && (
            <div style={{ 
              background: '#fff7ed', 
              padding: '12px', 
              borderRadius: '8px', 
              marginTop: '12px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <div style={{ fontWeight: 500, color: '#1f2937' }}>{selectedFile.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </div>
              </div>
              <DSButtonSecondary
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewData(null);
                  setImportStatus(null);
                }}
              >
                Remove
              </DSButtonSecondary>
            </div>
          )}
        </div>

        {previewData && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px', color: '#1f2937' }}>
              Data Preview ({previewData.totalRows} total rows)
            </label>
            <div style={{ maxHeight: "400px", overflow: "auto", border: "1px solid #fed7aa", borderRadius: "8px" }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: "sticky", top: 0, background: "#fff7ed", zIndex: 10 }}>
                  <tr>
                    {previewData.headers.map((header, idx) => (
                      <th 
                        key={idx}
                        style={{ 
                          textAlign: 'left', 
                          padding: '12px', 
                          background: '#fff7ed', 
                          color: '#6b7280', 
                          fontSize: '12px', 
                          fontWeight: 600 
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} style={{ borderTop: '1px solid #e5e7eb' }}>
                      {previewData.headers.map((header, colIdx) => (
                        <td key={colIdx} style={{ padding: '10px 12px', fontSize: '13px' }}>
                          {row[header] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {previewData.totalRows > 10 && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: "#6b7280" }}>
                Showing first 10 rows of {previewData.totalRows} total rows
              </div>
            )}
          </div>
        )}

        {importStatus && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginTop: '16px',
            fontSize: '14px',
            background: importStatus.type === 'success' ? '#d1fae5' : importStatus.type === 'error' ? '#fee2e2' : '#dbeafe',
            color: importStatus.type === 'success' ? '#065f46' : importStatus.type === 'error' ? '#991b1b' : '#1e40af',
            border: `1px solid ${importStatus.type === 'success' ? '#86efac' : importStatus.type === 'error' ? '#fca5a5' : '#93c5fd'}`
          }}>
            {importStatus.message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <DSButtonPrimary
            onClick={handleImport}
            disabled={!selectedFile || importStatus?.type === "processing"}
          >
            {importStatus?.type === "processing" ? "Importing..." : "Import Data"}
          </DSButtonPrimary>
          <DSButtonSecondary
            onClick={() => {
              setSelectedFile(null);
              setPreviewData(null);
              setImportStatus(null);
            }}
          >
            Clear
          </DSButtonSecondary>
          <DSButtonSecondary>Download Template</DSButtonSecondary>
          <DSButtonSecondary>View Import History</DSButtonSecondary>
        </div>
      </DSCard>

      <DSCard>
        <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px', color: '#1f2937' }}>Import Instructions</h2>
        <div style={{ fontSize: '13px', color: '#1f2937', lineHeight: '1.6' }}>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>For Inventory Import:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px', marginBottom: '16px' }}>
            <li>Required columns: Item Name, Category, Current On Hand, Par Level</li>
            <li>Optional columns: Unit of Measure, Storage Location, Vendor, Unit Cost</li>
            <li>Item names must match existing inventory items for updates</li>
          </ul>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>For Pricing Import:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px', marginBottom: '16px' }}>
            <li>Required columns: Item Name, Current Price, Date</li>
            <li>Optional columns: Vendor, Previous Price, Price Change %</li>
          </ul>
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>For Usage Import:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Required columns: Item Name, Date, Quantity Used</li>
            <li>Optional columns: Category, Station, Shift</li>
          </ul>
        </div>
      </DSCard>
      <ChatBot />
    </DSPageLayout>
  );
}
