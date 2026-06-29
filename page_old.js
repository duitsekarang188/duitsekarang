'use client';

import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null); // Untuk paparan modal dokumen
  const [showConfirm, setShowConfirm] = useState({ show: false, type: '', id: null, nama: '' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const localData = localStorage.getItem('duitsekarang_admin_apps');
    if (localData) {
      setApplications(JSON.parse(localData));
    } else {
      // Data Mock awal yang super realistik mengikut imej rujukan 'image_634979.png'
      const initialMockData = [
        {
          id: 'DS-2026-001',
          nama: 'Muhammad Ammar Bin Rosli',
          ic: '980312105433',
          phone: '60134456789',
          pendapatan: 2800.00,
          status: 'PENDING', // PENDING, APPROVED, REJECTED
          pelanPokok: 300,
          pelanBayarBalik: 339,
          pelanHari: 15,
          dokumen: {
            icName: 'mykad_depan_ammar.jpg',
            slipGajiName: 'slip_gaji_ammar_mei2026.pdf'
          }
        },
        {
          id: 'DS-2026-002',
          nama: 'Siti Nurhaliza Binti Ahmad',
          ic: '950722145562',
          phone: '60172234455',
          pendapatan: 3500.00,
          status: 'PENDING',
          pelanPokok: 300,
          pelanBayarBalik: 339,
          pelanHari: 15,
          dokumen: {
            icName: 'mykad_depan_sitinurhaliza.jpg',
            slipGajiName: 'slip_gaji_siti_mei2026.pdf'
          }
        },
        {
          id: 'DS-2026-003',
          nama: 'Ahmad Fahmi bin Mazlan',
          ic: '950101105431',
          phone: '60123456789',
          pendapatan: 3500.00,
          status: 'APPROVED',
          pelanPokok: 300,
          pelanBayarBalik: 339,
          pelanHari: 15,
          dokumen: {
            icName: 'mykad_depan_fahmi.jpg',
            slipGajiName: 'slip_gaji_fahmi_mei2026.pdf'
          }
        }
      ];
      setApplications(initialMockData);
      localStorage.setItem('duitsekarang_admin_apps', JSON.stringify(initialMockData));
    }
  }, []);

  const triggerAction = (type, id, nama) => {
    setShowConfirm({ show: true, type, id, nama });
  };

  const confirmAction = () => {
    const { type, id } = showConfirm;
    const updated = applications.map(app => {
      if (app.id === id) {
        return { ...app, status: type === 'APPROVE' ? 'APPROVED' : 'REJECTED' };
      }
      return app;
    });

    setApplications(updated);
    localStorage.setItem('duitsekarang_admin_apps', JSON.stringify(updated));

    setNotification({
      type: type === 'APPROVE' ? 'success' : 'error',
      text: `Permohonan ${showConfirm.nama} berjaya di${type === 'APPROVE' ? 'luluskan (RM300)' : 'tolak'}!`
    });

    setTimeout(() => setNotification(null), 3500);
    setShowConfirm({ show: false, type: '', id: null, nama: '' });
  };

  const totalInSemakan = applications.filter(app => app.status === 'PENDING').length;
  const totalDiluluskan = applications.filter(app => app.status === 'APPROVED').length;

  return (
    <div className="min-h-screen bg-[#070D19] text-slate-100 font-sans antialiased relative pb-20">
      {/* Background Subtle Grid & Glow Effects */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0"></div>

      {}
      <header className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 border-b border-slate-900/60">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Sistem Pengurusan Admin
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Saringan Permohonan & Kelulusan Skrin Kredit duitsekarang.online
          </p>
        </div>

        {/* Database & System Badges */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 bg-[#0E1F30] border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-black shadow-lg">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Sistem Aktif
          </div>
          <div className="bg-[#0B1528] border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
            Database: Supabase Connected
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-10 relative z-10 space-y-8">
        
        {/* Floating Success/Error Toast notification */}
        {notification && (
          <div className={`fixed top-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
            notification.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300' 
              : 'bg-red-950/90 border-red-500/30 text-red-300'
          }`}>
            <span className="text-xl">{notification.type === 'success' ? '✅' : '🛑'}</span>
            <span className="text-sm font-bold">{notification.text}</span>
          </div>
        )}

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Dalam Semakan */}
          <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-all">
            <div className="text-slate-400 text-xs font-black uppercase tracking-wider">Dalam Semakan</div>
            <div className="text-4xl font-black text-amber-500 mt-3">{totalInSemakan} Kes</div>
            <div className="absolute right-4 bottom-4 text-4xl opacity-[0.03] group-hover:scale-110 transition-transform">⏳</div>
          </div>

          {/* Card 2: Jumlah Diluluskan (Tier 1) */}
          <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="text-slate-400 text-xs font-black uppercase tracking-wider">Jumlah Diluluskan (Tier 1)</div>
            <div className="text-4xl font-black text-emerald-400 mt-3">{totalDiluluskan} Kes</div>
            <div className="absolute right-4 bottom-4 text-4xl opacity-[0.03] group-hover:scale-110 transition-transform">✔️</div>
          </div>

          {/* Card 3: Had Percubaan Auto */}
          <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="text-slate-400 text-xs font-black uppercase tracking-wider">Had Percubaan Auto</div>
            <div className="text-4xl font-black text-cyan-400 mt-3">RM 300.00</div>
            <div className="absolute right-4 bottom-4 text-4xl opacity-[0.03] group-hover:scale-110 transition-transform">💸</div>
          </div>
        </div>

        {}
        <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-[#0C1729]/80 flex justify-between items-center">
            <h3 className="text-md font-black text-white uppercase tracking-wider">Senarai Permohonan Terkini</h3>
          </div>

          {}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#081121] text-slate-400 text-[11px] font-black uppercase tracking-wider border-b border-slate-800/80">
                  <th className="py-4 px-6">Maklumat Pemohon</th>
                  <th className="py-4 px-6">Pendapatan</th>
                  <th className="py-4 px-6">Dokumen Sokongan</th>
                  <th className="py-4 px-6">Pelan Cadangan</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-slate-500 text-sm">
                      Tiada sebarang permohonan saringan dijumpai.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-[#11213A]/50 transition-all">
                      {/* Column 1: Maklumat Pemohon */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white">{app.nama}</div>
                          <div className="text-xs text-slate-400">IC: {app.ic}</div>
                          <div>
                            <a 
                              href={`https://wa.me/${app.phone}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-cyan-400 hover:underline font-semibold flex items-center gap-1"
                            >
                              WA: {app.phone}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Pendapatan */}
                      <td className="py-5 px-6">
                        <span className="text-sm font-extrabold text-white">
                          RM {app.pendapatan.toFixed(2)}
                        </span>
                      </td>

                      {/* Column 3: Dokumen Sokongan */}
                      <td className="py-5 px-6">
                        <div className="space-y-2 text-xs">
                          <button 
                            onClick={() => setSelectedDoc({ type: 'MyKad', filename: app.dokumen.icName, nama: app.nama })}
                            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer pointer-events-none" />
                            <span>Lihat Gambar IC</span>
                          </button>
                          <button 
                            onClick={() => setSelectedDoc({ type: 'Slip Gaji', filename: app.dokumen.slipGajiName, nama: app.nama })}
                            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
                          >
                            <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer pointer-events-none" />
                            <span>Lihat Slip Gaji</span>
                          </button>
                        </div>
                      </td>

                      {/* Column 4: Pelan Cadangan */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-emerald-400">
                            Pokok: RM {app.pelanPokok}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Bayar Balik: RM {app.pelanBayarBalik} ({app.pelanHari} Hari)
                          </div>
                        </div>
                      </td>

                      {/* Column 5: Status Badge */}
                      <td className="py-5 px-6">
                        <span className={`inline-block text-[11px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border ${
                          app.status === 'APPROVED' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                            : app.status === 'REJECTED' 
                            ? 'bg-red-500/10 text-red-400 border-red-500/25' 
                            : 'bg-amber-500/15 text-amber-500 border-amber-500/20'
                        }`}>
                          {app.status === 'APPROVED' ? 'Lulus' : app.status === 'REJECTED' ? 'Ditolak' : 'Dalam Semakan'}
                        </span>
                      </td>

                      {/* Column 6: Tindakan Buttons */}
                      <td className="py-5 px-6 text-center">
                        {app.status === 'PENDING' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => triggerAction('APPROVE', app.id, app.nama)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-emerald-950/20"
                            >
                              Lulus (RM300)
                            </button>
                            <button 
                              onClick={() => triggerAction('REJECT', app.id, app.nama)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all shadow-md shadow-red-950/20"
                            >
                              Tolak
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">
                            Tiada tindakan diperlukan
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0E1B30] border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h3 className="text-md font-black text-white uppercase tracking-wider">
                Semakan: {selectedDoc.type} - {selectedDoc.nama}
              </h3>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            
            {/* Mock Visual Document Representation */}
            <div className="bg-[#081121] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
              {selectedDoc.type === 'MyKad' ? (
                <>
                  <div className="w-full max-w-[320px] h-48 bg-[#1e293b] rounded-2xl p-4 border border-cyan-500/20 relative shadow-inner flex flex-col justify-between text-left">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black tracking-widest text-cyan-400">KAD PENGENALAN MALAYSIA</p>
                        <p className="text-[10px] text-slate-300 font-bold">MYKAD</p>
                      </div>
                      <span className="text-xs">🇲🇾</span>
                    </div>
                    
                    <div className="flex items-center gap-4 py-2">
                      <div className="w-14 h-18 bg-slate-700 rounded border border-slate-600 flex items-center justify-center text-2xl">
                        👤
                      </div>
                      <div className="space-y-1 text-slate-300">
                        <p className="text-xs font-black text-white truncate max-w-[180px]">{selectedDoc.nama}</p>
                        <p className="text-[10px] font-mono">980312-10-5433</p>
                        <p className="text-[8px] text-slate-400">WARGANEGARA</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <span className="text-[8px] text-slate-500">DuitSekarang e-KYC Secure API</span>
                      <div className="w-6 h-6 bg-amber-500/20 rounded-full border border-amber-500/25"></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-mono italic">{selectedDoc.filename}</p>
                </>
              ) : (
                <>
                  <div className="w-full max-w-[320px] bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-4 shadow-xl">
                    <div className="border-b border-slate-800 pb-2">
                      <p className="text-xs font-black text-slate-400">PENYATA SLIP GAJI BULANAN</p>
                      <p className="text-[10px] text-slate-500">SULIT & PERSENDIRIAN</p>
                    </div>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between"><span className="text-slate-400">Nama Kakitangan:</span><span className="text-white font-bold">{selectedDoc.nama}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Gaji Pokok:</span><span className="text-emerald-400 font-bold">RM 3,200.00</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Potongan KWSP:</span><span className="text-red-400">RM 352.00</span></div>
                      <div className="flex justify-between border-t border-slate-800 pt-2 text-xs"><span className="text-white font-bold">GAJI BERSIH:</span><span className="text-emerald-400 font-extrabold">RM 2,800.00</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-mono italic">{selectedDoc.filename}</p>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase transition-all"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showConfirm.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0E1B30] border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-6 text-center">
            <div className="text-4xl">
              {showConfirm.type === 'APPROVE' ? '🚀' : '🛑'}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white uppercase">
                {showConfirm.type === 'APPROVE' ? 'Sahkan Kelulusan' : 'Sahkan Penolakan'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adakah anda pasti mahu {showConfirm.type === 'APPROVE' ? 'Meluluskan (RM300)' : 'Menolak'} permohonan saringan digital daripada <strong className="text-white">{showConfirm.nama}</strong>? Tindakan ini tidak boleh diundur.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm({ show: false, type: '', id: null, nama: '' })}
                className="w-1/2 py-3 bg-[#081121] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-black uppercase transition-all border border-slate-800"
              >
                Batal
              </button>
              <button 
                onClick={confirmAction}
                className={`w-1/2 py-3 text-white rounded-xl text-xs font-black uppercase transition-all shadow-md ${
                  showConfirm.type === 'APPROVE' 
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/20' 
                    : 'bg-red-600 hover:bg-red-700 shadow-red-950/20'
                }`}
              >
                Ya, Teruskan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}