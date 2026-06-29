'use client';
import React, { useState, useRef } from 'react';

export default function MohonPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // State Maklumat Pemohon
  const [formData, setFormData] = useState({
    nama: '', ic: '', phone: '',
    kerja: '', pendapatan: '', syarikatNama: '', syarikatAlamat: '', syarikatPhone: '', tempohKerja: '',
    bankNama: '', bankAkaun: '',
    rujukan1Nama: '', rujukan1Hubungan: '', rujukan1Phone: '',
    rujukan2Nama: '', rujukan2Hubungan: '', rujukan2Phone: ''
  });

  // State Nama Fail Berasingan (Satu Kotak, Satu Fail)
  const [fileNames, setFileNames] = useState({
    mykadDepan: '',
    mykadBelakang: '',
    bilUtiliti: '',
    gajiBulan1: '',
    gajiBulan2: '',
    gajiBulan3: '',
    bankBulan1: '',
    bankBulan2: '',
    bankBulan3: '',
    kwsp: ''
  });
  
  // State Kamera Live Selfie Teks Nama sahaja
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedSelfieName, setCapturedSelfieName] = useState('');
  const videoRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSingleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames(prev => ({ ...prev, [key]: file.name }));
    }
  };

  const startCamera = async () => {
    setCameraActive(true);
    setCapturedSelfieName('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240, facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Gagal membuka kamera. Pastikan kebenaran akses aktif.");
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      setCapturedSelfieName(`selfie_${formData.ic || 'user'}_ekyc.jpg`);
      
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      setCameraActive(false);
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!capturedSelfieName) {
      alert("Sila ambil gambar selfie bersama kad pengenalan anda terlebih dahulu di Langkah 4.");
      return;
    }
    
    setLoading(true);

    try {
      const res = await fetch('/api/mohon', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nama_penuh: formData.nama,
          no_ic: formData.ic,
          no_phone: formData.phone,
          jawatan: formData.kerja,
          pendapatan: parseFloat(formData.pendapatan || 0),
          nama_syarikat: formData.syarikatNama,
          alamat_syarikat: formData.syarikatAlamat,
          phone_syarikat: formData.syarikatPhone,
          tempoh_bekerja: formData.tempohKerja,
          nama_bank: formData.bankNama,
          no_akaun_bank: formData.bankAkaun,
          rujukan1_nama: formData.rujukan1Nama,
          rujukan1_hubungan: formData.rujukan1Hubungan,
          rujukan1_phone: formData.rujukan1Phone,
          rujukan2_nama: formData.rujukan2Nama,
          rujukan2_hubungan: formData.rujukan2Hubungan,
          rujukan2_phone: formData.rujukan2Phone,
          selfie_base64: capturedSelfieName
        })
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        alert('🚨 [RALAT RESPONSE SERVER]:\n' + (result.error || 'Server memberikan maklum balas gagal tanpa huraian teks.'));
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      alert('🚨 [CRASH SEBELUM SERVER RESPOND]:\n' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1E36] via-[#0B1528] to-[#040814] text-slate-100 font-sans antialiased relative pb-20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none rounded-full blur-[130px] z-0"></div>

      <header className="max-w-7xl mx-auto px-4 h-24 flex items-center border-b border-slate-900/60 relative z-10">
        <div className="block h-20 w-[240px] sm:w-[320px]">
          <img src="/logo.png" alt="DuitSekarang" className="w-full h-full object-contain object-left" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-10 relative z-10">
        {!success && (
          <div className="mb-10 text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-white">Borang Saringan Digital (e-KYC)</h1>
            <p className="text-xs sm:text-sm text-slate-400">Langkah {step} daripada 4 — Sila isi maklumat yang sah demi kelulusan data.</p>
            <div className="w-full bg-slate-800 h-2.5 rounded-full p-0.5 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>
          </div>
        )}

        <div className="bg-[#0E1B30] border border-slate-800 rounded-[2rem] p-6 sm:p-10 shadow-2xl">
          {!success ? (
            <form onSubmit={step === 4 ? handleSubmit : nextStep} className="space-y-6">
              
              {/* LANGKAH 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-3"><h3 className="text-lg font-black text-orange-400 uppercase tracking-wider">Langkah 1: Profil Asas</h3></div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Penuh (Seperti dalam IC)</label>
                    <input type="text" name="nama" required value={formData.nama} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500" placeholder="Contoh: Ahmad Bin Mazlan" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nombor Kad Pengenalan (Tanpa Dash)</label>
                    <input type="text" name="ic" required value={formData.ic} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500" placeholder="Contoh: 95010110XXXX" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nombor WhatsApp Aktif</label>
                    <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-orange-500" placeholder="Contoh: 0123456789" />
                  </div>
                </div>
              )}

              {/* LANGKAH 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-3"><h3 className="text-lg font-black text-orange-400 uppercase tracking-wider">Langkah 2: Kedudukan Majikan & Pendapatan</h3></div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Syarikat / Tempat Bekerja</label><input type="text" name="syarikatNama" required value={formData.syarikatNama} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" placeholder="Contoh: Tech Sdn Bhd" /></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Jawatan / Sektor</label><input type="text" name="kerja" required value={formData.kerja} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" placeholder="Contoh: Operator" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nombor Telefon Pejabat</label><input type="text" name="syarikatPhone" required value={formData.syarikatPhone} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" placeholder="Contoh: 038925XXXX" /></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tempoh Bekerja</label><input type="text" name="tempohKerja" required value={formData.tempohKerja} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" placeholder="Contoh: 2 Tahun" /></div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Alamat Penuh Syarikat</label>
                    <input type="text" name="syarikatAlamat" required value={formData.syarikatAlamat} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" placeholder="Alamat pejabat..." />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Gaji Bersih (RM)</label><input type="number" name="pendapatan" required value={formData.pendapatan} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" /></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Bank</label><input type="text" name="bankNama" required value={formData.bankNama} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" /></div>
                    <div className="space-y-1"><label className="text-xs font-bold text-slate-400 uppercase tracking-wide">No Akaun Bank</label><input type="text" name="bankAkaun" required value={formData.bankAkaun} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white" /></div>
                  </div>
                </div>
              )}

              {/* LANGKAH 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="border-b border-slate-800 pb-3"><h3 className="text-lg font-black text-orange-400 uppercase tracking-wider">Langkah 3: Emergency Contacts</h3></div>
                  <div className="bg-[#081121]/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="text-xs font-black text-slate-400 tracking-wider">📞 KONTAK RUJUKAN UTAMA (PERTAMA)</div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Hubungan</label>
                        <select name="rujukan1Hubungan" required value={formData.rujukan1Hubungan} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-3 py-3.5 text-white text-sm">
                          <option value="">-- Pilih --</option>
                          <option value="Ibu/Bapa">Ibu/Bapa</option>
                          <option value="Suami/Isteri">Suami/Isteri</option>
                          <option value="Adik-Beradik">Adik-Beradik</option>
                        </select>
                      </div>
                      <div className="space-y-1"><label className="text-xs font-bold text-slate-500">Nama Penuh</label><input type="text" name="rujukan1Nama" required value={formData.rujukan1Nama} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-bold text-slate-500">Nombor Telefon</label><input type="text" name="rujukan1Phone" required value={formData.rujukan1Phone} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm" /></div>
                    </div>
                  </div>
                  <div className="bg-[#081121]/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="text-xs font-black text-slate-400 tracking-wider">📞 KONTAK RUJUKAN KEDUA</div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500">Hubungan</label>
                        <select name="rujukan2Hubungan" required value={formData.rujukan2Hubungan} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-3 py-3.5 text-white text-sm">
                          <option value="">-- Pilih --</option>
                          <option value="Ibu/Bapa">Ibu/Bapa</option>
                          <option value="Suami/Isteri">Suami/Isteri</option>
                          <option value="Adik-Beradik">Adik-Beradik</option>
                        </select>
                      </div>
                      <div className="space-y-1"><label className="text-xs font-bold text-slate-500">Nama Penuh</label><input type="text" name="rujukan2Nama" required value={formData.rujukan2Nama} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm" /></div>
                      <div className="space-y-1"><label className="text-xs font-bold text-slate-500">Nombor Telefon</label><input type="text" name="rujukan2Phone" required value={formData.rujukan2Phone} onChange={handleInputChange} className="w-full bg-[#081121] border border-slate-800 rounded-xl px-4 py-3.5 text-white text-sm" /></div>
                    </div>
                  </div>
                </div>
              )}

              {/* LANGKAH 4 */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-800 pb-3"><h3 className="text-lg font-black text-orange-400 uppercase tracking-wider">Langkah 4: Pengesahan Dokumen & e-KYC</h3></div>

                  {/* KAD PENGENALAN */}
                  <div className="p-5 bg-[#081121] border border-dashed border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl p-3 bg-slate-900 rounded-xl">🪪</div>
                      <div><div className="text-sm font-bold text-white">Muat Naik MyKad</div><div className="text-[11px] text-slate-400">Pastikan jelas, tidak silau.</div></div>
                    </div>
                    <div className="w-full sm:w-auto space-y-2">
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-white block mb-1">Bahagian Depan</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'mykadDepan')} className="text-xs text-slate-500 w-full" />
                        {fileNames.mykadDepan && <p className="text-[10px] text-orange-400 font-mono mt-1 truncate">✓ {fileNames.mykadDepan}</p>}
                      </div>
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-white block mb-1">Bahagian Belakang</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'mykadBelakang')} className="text-xs text-slate-500 w-full" />
                        {fileNames.mykadBelakang && <p className="text-[10px] text-orange-400 font-mono mt-1 truncate">✓ {fileNames.mykadBelakang}</p>}
                      </div>
                    </div>
                  </div>

                  {/* LIVE SELFIE */}
                  <div className="bg-[#081121] border border-dashed border-slate-800 p-6 rounded-2xl text-center space-y-4 relative overflow-hidden">
                    <div className="text-2xl">📸</div>
                    <div>
                      <div className="text-sm font-bold text-white">Kamera Live Selfie Bersama MyKad</div>
                      <div className="text-[11px] text-slate-400">Pegang MyKad berdekatan muka anda.</div>
                    </div>

                    {cameraActive && (
                      <div className="relative max-w-sm mx-auto overflow-hidden rounded-xl border border-orange-500/30 bg-black">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-auto transform -scale-x-100" />
                        <button type="button" onClick={capturePhoto} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-black text-xs px-6 py-2.5 rounded-full">📷 Tangkap</button>
                      </div>
                    )}

                    {capturedSelfieName && (
                      <div className="space-y-2">
                        <div className="p-4 max-w-xs mx-auto rounded-xl border border-emerald-500/30 bg-[#0E1B30]">
                          <p className="text-xs text-emerald-400 font-mono font-bold truncate">✓ {capturedSelfieName}</p>
                        </div>
                        <p className="text-xs text-emerald-400 font-bold">✓ Gambar Berjaya Disahkan!</p>
                      </div>
                    )}
                    {!cameraActive && (
                      <button type="button" onClick={startCamera} className="px-6 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-700">
                        {capturedSelfieName ? '🔄 Ambil Semula Selfie' : '🔌 Buka Kamera e-KYC'}
                      </button>
                    )}
                  </div>

                  {/* BIL UTILITI */}
                  <div className="bg-[#081121] border border-dashed border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl p-3 bg-slate-900 rounded-xl">⚡</div>
                      <div><div className="text-sm font-bold text-white">Bil Elektrik / Air Terkini</div><div className="text-[11px] text-slate-400">Untuk pengesahan alamat semasa.</div></div>
                    </div>
                    <div className="w-full sm:w-auto">
                      <input type="file" required onChange={(e) => handleSingleFileChange(e, 'bilUtiliti')} className="text-xs text-slate-500" />
                      {fileNames.bilUtiliti && <p className="text-[10px] text-cyan-400 font-mono mt-1">✓ {fileNames.bilUtiliti}</p>}
                    </div>
                  </div>

                  {/* SLIP GAJI 3 BULAN */}
                  <div className="p-5 bg-[#081121] border border-dashed border-slate-800 rounded-2xl space-y-4 text-left">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <div className="text-2xl p-3 bg-slate-900 rounded-xl">💵</div>
                      <div><div className="text-sm font-bold text-white">Penyata Slip Gaji 3 Bulan Terkini</div><div className="text-[11px] text-slate-400">Muat naik satu fail setiap kotak.</div></div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Slip Bulan 1 (Terbaru)</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'gajiBulan1')} className="text-xs text-slate-500 w-full" />
                        {fileNames.gajiBulan1 && <p className="text-[10px] text-emerald-400 font-mono mt-1 truncate">✓ {fileNames.gajiBulan1}</p>}
                      </div>
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Slip Bulan 2</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'gajiBulan2')} className="text-xs text-slate-500 w-full" />
                        {fileNames.gajiBulan2 && <p className="text-[10px] text-emerald-400 font-mono mt-1 truncate">✓ {fileNames.gajiBulan2}</p>}
                      </div>
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Slip Bulan 3</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'gajiBulan3')} className="text-xs text-slate-500 w-full" />
                        {fileNames.gajiBulan3 && <p className="text-[10px] text-emerald-400 font-mono mt-1 truncate">✓ {fileNames.gajiBulan3}</p>}
                      </div>
                    </div>
                  </div>

                  {/* BANK STATEMENT 3 BULAN */}
                  <div className="p-5 bg-[#081121] border border-dashed border-slate-800 rounded-2xl space-y-4 text-left">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <div className="text-2xl p-3 bg-slate-900 rounded-xl">📊</div>
                      <div><div className="text-sm font-bold text-white">Penyata Bank 3 Bulan Terkini</div><div className="text-[11px] text-slate-400">Muat naik satu fail setiap kotak.</div></div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Penyata Bulan 1</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'bankBulan1')} className="text-xs text-slate-500 w-full" />
                        {fileNames.bankBulan1 && <p className="text-[10px] text-cyan-400 font-mono mt-1 truncate">✓ {fileNames.bankBulan1}</p>}
                      </div>
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Penyata Bulan 2</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'bankBulan2')} className="text-xs text-slate-500 w-full" />
                        {fileNames.bankBulan2 && <p className="text-[10px] text-cyan-400 font-mono mt-1 truncate">✓ {fileNames.bankBulan2}</p>}
                      </div>
                      <div className="p-3 bg-[#0E1B30] rounded-xl border border-slate-800">
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">Penyata Bulan 3</label>
                        <input type="file" required onChange={(e) => handleSingleFileChange(e, 'bankBulan3')} className="text-xs text-slate-500 w-full" />
                        {fileNames.bankBulan3 && <p className="text-[10px] text-cyan-400 font-mono mt-1 truncate">✓ {fileNames.bankBulan3}</p>}
                      </div>
                    </div>
                  </div>

                  {/* KWSP */}
                  <div className="bg-[#081121] border border-dashed border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl p-3 bg-slate-900 rounded-xl">🛡️</div>
                      <div><div className="text-sm font-bold text-white">Penyata KWSP Terbaharu</div><div className="text-[11px] text-slate-400">Penyata rasmi dari portal KWSP.</div></div>
                    </div>
                    <div className="w-full sm:w-auto">
                      <input type="file" required onChange={(e) => handleSingleFileChange(e, 'kwsp')} className="text-xs text-slate-500" />
                      {fileNames.kwsp && <p className="text-[10px] text-orange-400 font-mono mt-1">✓ {fileNames.kwsp}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGASI */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                {step > 1 ? (<button type="button" onClick={prevStep} className="px-6 py-3.5 bg-slate-800 text-white rounded-xl font-bold text-sm uppercase">Kembali</button>) : <div />}
                <button type="submit" disabled={loading} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-black text-sm uppercase tracking-widest disabled:opacity-50">
                  {loading ? 'Menghantar Dokumen...' : step === 4 ? 'Hantar Saringan Digital' : 'Seterusnya'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-8 py-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto font-black border border-emerald-500/20">✓</div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white">Permohonan Profil Diterima!</h2>
                <p className="text-sm text-slate-400">Data e-KYC anda telah berjaya disimpan.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}