import React, { useState } from 'react';
import { X, FolderHeart, FileText, Upload, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function HealthLockerModal({ isOpen, onClose }) {
  const [reports, setReports] = useState([
    { id: 1, name: 'Dr. Rahul Sharma - Prescription', date: '2026-08-28', type: 'Prescription PDF', size: '1.2 MB' },
    { id: 2, name: 'Full Body Blood Test Report (NABL)', date: '2026-08-15', type: 'Pathology Report', size: '2.4 MB' },
    { id: 3, name: 'ECG & Cardiology Evaluation', date: '2026-07-20', type: 'Diagnostic PDF', size: '980 KB' }
  ]);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpload = (e) => {
    e.preventDefault();
    const fileInput = e.target.reportFile;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const newReport = {
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: 'Uploaded Document',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setReports([newReport, ...reports]);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
      e.target.reset();
    }
  };

  const handleDownload = (report) => {
    alert(`📥 Downloading ${report.name} (${report.size}). Encrypted document retrieved successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
            <FolderHeart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Digital Health Locker & Records</h3>
            <p className="text-xs text-slate-500 font-medium">ABDM Aligned 256-bit Encrypted Storage</p>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-3">
          <label className="block text-xs font-bold text-slate-700">Upload New Prescription or Lab PDF</label>
          <div className="flex gap-2">
            <input
              type="file"
              name="reportFile"
              accept=".pdf,.jpg,.jpeg,.png"
              required
              className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-cyan-100 file:text-cyan-800"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" /> Upload
            </button>
          </div>
          {uploadSuccess && (
            <p className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Document uploaded to Ayucare Locker!
            </p>
          )}
        </form>

        {/* Saved Records List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Your Encrypted Health Records ({reports.length})</h4>
          
          {reports.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm hover:border-cyan-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm text-slate-900">{r.name}</h5>
                  <p className="text-xs text-slate-500 font-medium">{r.type} • {r.date} • {r.size}</p>
                </div>
              </div>

              <button
                onClick={() => handleDownload(r)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-cyan-50 text-cyan-800 font-bold text-xs flex items-center gap-1 border border-slate-200 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
