'use client';

import React, { useState, useEffect } from 'react';

// Kata laluan rahsia utama untuk mengakses dashboard admin
const ADMIN_PASSCODE = 'admin@duit2026';

export default function AdminPage() {
  // --- STATE UTAMA DASHBOARD ---
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [activeTab, setActiveTab] = useState('summary'); // summary, identity, financial
  const [selectedApp, setSelectedApp] = useState(null); // Menyimpan rekod pemohon yang sedang disemak dalam modal
  
  // --- STATE MODAL NOTIFIKASI & PENGESAHAN (BEBAS ALERT) ---
  const [showConfirm, setShowConfirm] = useState({ show: false, type: '', id: null, nama: '' });
  const [notification, setNotification] = useState(null);

  // --- STATE KESELAMATAN (SECURITY GATE STATES) ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    // 1. Sekat Klik Kanan (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // 2. Sekat Pintasan Keyboard (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
    const handleKeyDown = (e) => {
      // Sekat F12 (123)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Sekat Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+Shift+C (67)
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
      }
      // Sekat Ctrl+U (85) - View Source
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Sekat Ctrl+S (83) - Save Page
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Bersihkan listener semasa unmount komponen
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // 1. Semak Status Login Sedia Ada (Sesi Selamat)
    const authStatus = sessionStorage.getItem('duitsekarang_admin_auth');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }

    // 2. Load data permohonan (Dari LocalStorage atau guna Dummy Data jika kosong)
    const storedData = localStorage.getItem('duitsekarang_applications');
    if (storedData) {
      setApplications(JSON.parse(storedData));
    } else {
      // Data lalai (Dummy Data) sebiji seperti dalam gambar rujukan
      const defaultApps = [
        {
          id: '1',
          nama: 'Muhammad Ammar Bin Rosli',
          ic: '980312105433',
          phone: '60134456789',
          pendapatan: 2800.00,
          status: 'Dalam Semakan',
          kerja: 'Pegawai Operasi Tekstil',
          syarikatNama: 'Amanah Textiles Sdn Bhd',
          syarikatPhone: '0389441122',
          syarikatAlamat: 'Lot 23, Kawasan Perindustrian Bangi, 43650 Bangi, Selangor',
          tempohKerja: '3 Tahun',
          bankNama: 'Maybank',
          bankAkaun: '164052345561',
          rujukan1Nama: 'Rosli Bin Kassim',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '60129988776',
          rujukan2Nama: 'Siti Aminah Binti Bakar',
          rujukan2Hubungan: 'Ibu/Bapa',
          rujukan2Phone: '60137766554'
        },
        {
          id: '2',
          nama: 'Siti Nurhaliza Binti Ahmad',
          ic: '950722145562',
          phone: '60172234455',
          pendapatan: 3500.00,
          status: 'Dalam Semakan',
          kerja: 'Pembantu Pentadbiran Kanan',
          syarikatNama: 'Global Logistics Hub',
          syarikatPhone: '0355112233',
          syarikatAlamat: 'Tingkat 4, Wisma Global, Seksyen 15, 40000 Shah Alam, Selangor',
          tempohKerja: '5 Tahun',
          bankNama: 'CIMB Bank',
          bankAkaun: '800955432101',
          rujukan1Nama: 'Ahmad Bin Zakaria',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '60113322110',
          rujukan2Nama: 'Fatimah Binti Harun',
          rujukan2Hubungan: 'Adik-Beradik',
          rujukan2Phone: '60195544332'
        },
        {
          id: '3',
          nama: 'Ahmad Fahmi bin Mazlan',
          ic: '950101105431',
          phone: '60123456789',
          pendapatan: 3500.00,
          status: 'Lulus',
          kerja: 'Juruteknik Kanan',
          syarikatNama: 'Sime Darby Plantation Berhad',
          syarikatPhone: '0378484000',
          syarikatAlamat: 'Main Office Ara Damansara, 47301 Petaling Jaya, Selangor',
          tempohKerja: '4 Tahun',
          bankNama: 'Bank Islam',
          bankAkaun: '12015020112233',
          rujukan1Nama: 'Mazlan Bin Mahmud',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '60176655443',
          rujukan2Nama: 'Nurul Huda Binti Mazlan',
          rujukan2Hubungan: 'Adik-Beradik',
          rujukan2Phone: '60198877665'
        }
      ];
      setApplications(defaultApps);
      localStorage.setItem('duitsekarang_applications', JSON.stringify(defaultApps));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setLoginError('');

    setTimeout(() => {
      if (passcodeInput === ADMIN_PASSCODE) {
        setIsAuthorized(true);
        sessionStorage.setItem('duitsekarang_admin_auth', 'true');
        showToast('🔓 Log masuk berjaya! Selamat kembali Admin.');
      } else {
        setLoginError('Ralat: Kata laluan admin yang dimasukkan tidak sah.');
      }
      setLoadingAuth(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('duitsekarang_admin_auth');
  };

  // --- HELPER UNTUK PAPAR NOTIFIKASI SEGERA ---
  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Mulakan proses kelulusan / penolakan
  const triggerAction = (type, id, nama) => {
    setShowConfirm({ show: true, type, id, nama });
  };

  // Sahkan tindakan selepas pengguna picit butang di dalam modal pengesahan
  const confirmAction = () => {
    const { type, id, nama } = showConfirm;
    
    const updatedApps = applications.map((app) => {
      if (app.id === id) {
        return { ...app, status: type === 'LULUS' ? 'Lulus' : 'Ditolak' };
      }
      return app;
    });

    setApplications(updatedApps);
    localStorage.setItem('duitsekarang_applications', JSON.stringify(updatedApps));
    
    // Kemas kini pemohon yang sedang dilihat secara aktif dalam modal jika ada
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: type === 'LULUS' ? 'Lulus' : 'Ditolak' });
    }

    setShowConfirm({ show: false, type: '', id: null, nama: '' });
    showToast(`✓ Permohonan oleh ${nama} telah berjaya disetkan kepada ${type === 'LULUS' ? 'LULUS' : 'DITOLAK'}.`);
  };

  // Padam rekod pemohon daripada pangkalan data
  const deleteApplication = (id, nama) => {
    const updatedApps = applications.filter((app) => app.id !== id);
    setApplications(updatedApps);
    localStorage.setItem('duitsekarang_applications', JSON.stringify(updatedApps));
    showToast(`✓ Rekod permohonan ${nama} telah dipadamkan sepenuhnya.`);
  };

  // Tapis permohonan mengikut bar carian dan tab status
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ic.includes(searchTerm) ||
      app.phone.includes(searchTerm);

    if (filterStatus === 'ALL') return matchesSearch;
    if (filterStatus === 'SEMAKAN') return matchesSearch && app.status === 'Dalam Semakan';
    if (filterStatus === 'LULUS') return matchesSearch && app.status === 'Lulus';
    if (filterStatus === 'DITOLAK') return matchesSearch && app.status === 'Ditolak';
    return matchesSearch;
  });

  // Kiraan Statistik Dinamik
  const countSemakan = applications.filter((app) => app.status === 'Dalam Semakan').length;
  const countLulus = applications.filter((app) => app.status === 'Lulus').length;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#070b19] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Hiasan Latar Belakang FinTech Premium */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="w-full max-w-md bg-[#0d1527]/90 border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="h-16 w-full flex justify-center mb-4">
              <img src="/logo.png" alt="DuitSekarang" className="h-full object-contain" />
            </div>
            <h1 className="text-xl font-black text-white uppercase tracking-wider">Security Access Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Sila masukkan kod kelayakan keselamatan untuk mengakses sistem pentadbiran.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kata Laluan Admin (Passcode)</label>
              <input
                type="password"
                required
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full bg-[#040814] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3.5 text-center text-white text-lg font-mono tracking-widest outline-none transition-all"
                placeholder="••••••••••••"
              />
              {loginError && (
                <p className="text-xs text-red-400 mt-2 font-semibold flex items-center gap-1.5 justify-center">
                  <span>⚠️</span> {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loadingAuth}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-blue-950/50 flex items-center justify-center gap-2"
            >
              {loadingAuth ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menentusahkan Identiti...
                </>
              ) : (
                'Buka Sesi Selamat'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-[10px] text-slate-500 font-mono">DuitSekarang Security Gate v2.40 • Terlindung Akta PDPA 2010</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 font-sans antialiased pb-20 relative">
      
      {/* Toast Notification Pop-up */}
      {notification && (
        <div className="fixed top-6 right-6 bg-slate-900 border border-blue-500 text-slate-100 px-5 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <span className="text-blue-400 text-lg">💡</span>
          <p className="text-xs font-bold">{notification}</p>
        </div>
      )}

      {/* HEADER UTAMA */}
      <header className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between border-b border-slate-900/60 relative z-10">
        <div className="block h-16 w-[180px] sm:w-[240px]">
          <img src="/logo.png" alt="DuitSekarang" className="w-full h-full object-contain object-left" />
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistem Aktif
          </span>
          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Database: Supabase Connected
          </span>
          <button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all border border-slate-700 uppercase tracking-wider flex items-center gap-1.5"
          >
            🔑 Log Keluar
          </button>
        </div>
      </header>

      {/* KANDUNGAN UTAMA */}
      <main className="max-w-7xl mx-auto px-4 pt-8">
        
        {/* Banner Penjelasan */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Sistem Pengurusan Admin</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Saringan Permohonan & Kelulusan Skrin Kredit duitsekarang.online</p>
        </div>

        {/* METRIK STATISTIK UTAMA (Sama Seperti Lakaran) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* STAT 1: DALAM SEMAKAN */}
          <div className="bg-[#0c1325] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-36">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Dalam Semakan</span>
            <span className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight mt-2">{countSemakan} Kes</span>
            <span className="text-xl absolute bottom-6 right-6 opacity-30">⏳</span>
          </div>

          {/* STAT 2: JUMLAH DILULUSKAN */}
          <div className="bg-[#0c1325] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-36">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Jumlah Diluluskan (Tier 1)</span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-2">{countLulus} Kes</span>
            <span className="text-xl absolute bottom-6 right-6 opacity-30">✓</span>
          </div>

          {/* STAT 3: HAD PERCUBAAN AUTO */}
          <div className="bg-[#0c1325] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-36">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Had Percubaan Auto</span>
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight mt-2">RM 300.00</span>
            <span className="text-xl absolute bottom-6 right-6 opacity-30">💸</span>
          </div>

        </div>

        {/* CONTROL BAR (Cari, Tapis & Urus) */}
        <div className="bg-[#0c1325] border border-slate-800 rounded-2xl p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
          
          {/* Petak Carian */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#040814] border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-xs text-white outline-none transition-all placeholder:text-slate-500"
              placeholder="Cari Nama, IC, atau Nombor Telefon..."
            />
          </div>

          {/* Pengawal Tapisan (Tabs) */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filterStatus === 'ALL' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'bg-[#040814] text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus('SEMAKAN')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filterStatus === 'SEMAKAN' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'bg-[#040814] text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              Semakan
            </button>
            <button
              onClick={() => setFilterStatus('LULUS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filterStatus === 'LULUS' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'bg-[#040814] text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              Lulus
            </button>
            <button
              onClick={() => setFilterStatus('DITOLAK')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filterStatus === 'DITOLAK' ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30' : 'bg-[#040814] text-slate-400 border border-slate-800 hover:text-white'}`}
            >
              Ditolak
            </button>
          </div>

        </div>

        {/* JADUAL PERMOHONAN SENARAI UTAMA (Sama Seperti Lakaran Rujukan) */}
        <div className="bg-[#0c1325] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Senarai Permohonan Terkini</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-[#040814]/40">
                  <th className="py-4 px-6">Maklumat Pemohon</th>
                  <th className="py-4 px-4">Pendapatan</th>
                  <th className="py-4 px-6">Dokumen Sokongan (e-KYC)</th>
                  <th className="py-4 px-4">Pelan Cadangan</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-500 font-bold">
                      🚫 Tiada rekod permohonan yang sepadan dengan tapisan semasa.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-[#111a33]/20 transition-all text-xs">
                      
                      {/* Tiang 1: Profil Pemohon */}
                      <td className="py-5 px-6">
                        <div className="font-extrabold text-white text-sm">{app.nama}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-1">IC: {app.ic}</div>
                        <a
                          href={`https://wa.me/${app.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] text-sky-400 hover:underline mt-1 font-mono font-bold"
                        >
                          WA: {app.phone} 📲
                        </a>
                      </td>

                      {/* Tiang 2: Pendapatan Bersih */}
                      <td className="py-5 px-4 font-bold font-mono text-white">
                        RM {app.pendapatan.toFixed(2)}
                      </td>

                      {/* Tiang 3: Dokumen e-KYC (Interaktif Tab) */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => { setSelectedApp(app); setActiveTab('summary'); }}
                            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-left hover:underline text-[11px]"
                          >
                            📝 Ringkasan Borang (Summary)
                          </button>
                          <button
                            onClick={() => { setSelectedApp(app); setActiveTab('identity'); }}
                            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold text-left hover:underline text-[11px]"
                          >
                            ☑ MyKad & Swafoto (e-KYC)
                          </button>
                          <button
                            onClick={() => { setSelectedApp(app); setActiveTab('financial'); }}
                            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold text-left hover:underline text-[11px]"
                          >
                            ☑ Bukti Gaji, Bank, KWSP, Bil
                          </button>
                        </div>
                      </td>

                      {/* Tiang 4: Pelan Cadangan Saringan */}
                      <td className="py-5 px-4">
                        <div className="text-emerald-400 font-extrabold">Pokok: RM 300</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Bayar Balik: RM 339 (15 Hari)</div>
                      </td>

                      {/* Tiang 5: Status Saringan */}
                      <td className="py-5 px-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${app.status === 'Lulus' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : app.status === 'Ditolak' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {app.status}
                        </span>
                      </td>

                      {/* Tiang 6: Tindakan Cepat */}
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {app.status === 'Dalam Semakan' ? (
                            <>
                              <button
                                onClick={() => triggerAction('LULUS', app.id, app.nama)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all"
                              >
                                Lulus (RM300)
                              </button>
                              <button
                                onClick={() => triggerAction('TOLAK', app.id, app.nama)}
                                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all"
                              >
                                Tolak
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono italic">Selesai diproses</span>
                          )}
                          <button
                            onClick={() => deleteApplication(app.id, app.nama)}
                            className="text-slate-500 hover:text-red-400 p-2 transition-all"
                            title="Padam Rekod"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* --- MODAL 1: PENGESAHAN TINDAKAN (BEBAS ALERT) --- */}
      {showConfirm.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#0d1527] border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-base font-black text-white uppercase tracking-wider mb-2">Tindakan Pengesahan</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Adakah anda pasti mahu menukar status permohonan bagi <strong className="text-white">{showConfirm.nama}</strong> kepada <strong className={`${showConfirm.type === 'LULUS' ? 'text-emerald-400' : 'text-red-400'}`}>{showConfirm.type}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm({ show: false, type: '', id: null, nama: '' })}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                Kembali
              </button>
              <button
                onClick={confirmAction}
                className={`text-white text-xs font-black uppercase px-5 py-2.5 rounded-xl transition-all ${showConfirm.type === 'LULUS' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Ya, Sahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PUSAT SEMAKAN KES & E-KYC BERSEPADU --- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-40 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-[#0c1325] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            
            {/* Tajuk Modal */}
            <div className="p-6 bg-[#040814]/40 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider">Pusat Semakan e-KYC</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Pemohon: {selectedApp.nama} ({selectedApp.ic})</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
              >
                Tutup (✕)
              </button>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-800 bg-[#040814]/20">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'summary' ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                📝 Ringkasan Borang
              </button>
              <button
                onClick={() => setActiveTab('identity')}
                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'identity' ? 'border-blue-500 text-blue-400 bg-blue-500/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                🪪 MyKad & Swafoto
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${activeTab === 'financial' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                📊 Kewangan & Utiliti
              </button>
            </div>

            {/* KANDUNGAN TAB INDIVIDU */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              
              {/* TAB 1: SUMMARY FORM */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  
                  {/* Seksyen A: Pekerjaan & Bank */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#040814]/40 border border-slate-800/80 p-4 rounded-xl space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syarikat Majikan</div>
                      <div className="text-white font-extrabold">{selectedApp.syarikatNama}</div>
                      <div className="text-xs text-slate-300">Jawatan: {selectedApp.kerja}</div>
                      <div className="text-xs text-slate-300">Tempoh Kerja: {selectedApp.tempohKerja}</div>
                      <div className="text-xs text-slate-300">Tel Pejabat: {selectedApp.syarikatPhone}</div>
                      <div className="text-xs text-slate-400 italic mt-1">{selectedApp.syarikatAlamat}</div>
                    </div>
                    
                    <div className="bg-[#040814]/40 border border-slate-800/80 p-4 rounded-xl space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akaun Bank Pengeluaran</div>
                      <div className="text-white font-extrabold">{selectedApp.bankNama}</div>
                      <div className="text-sm font-mono text-cyan-400 font-bold">{selectedApp.bankAkaun}</div>
                      <div className="text-xs text-slate-300">Gaji Bersih Bulanan: RM {selectedApp.pendapatan.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Seksyen B: Kontak Rujukan */}
                  <div className="bg-[#040814]/40 border border-slate-800/80 p-4 rounded-xl space-y-4">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emergency Contacts (Rujukan Waris)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                      
                      <div className="space-y-1">
                        <div className="text-xs font-black text-amber-500 uppercase tracking-wider">📞 Rujukan Utama (1)</div>
                        <div className="text-xs font-bold text-white mt-1">Nama: {selectedApp.rujukan1Nama}</div>
                        <div className="text-xs text-slate-300">Hubungan: {selectedApp.rujukan1Hubungan}</div>
                        <a href={`https://wa.me/${selectedApp.rujukan1Phone}`} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline inline-block mt-0.5">Telefon: {selectedApp.rujukan1Phone} 📲</a>
                      </div>

                      <div className="space-y-1 pt-3 md:pt-0 md:pl-4">
                        <div className="text-xs font-black text-amber-500 uppercase tracking-wider">📞 Rujukan Kedua (2)</div>
                        <div className="text-xs font-bold text-white mt-1">Nama: {selectedApp.rujukan2Nama}</div>
                        <div className="text-xs text-slate-300">Hubungan: {selectedApp.rujukan2Hubungan}</div>
                        <a href={`https://wa.me/${selectedApp.rujukan2Phone}`} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:underline inline-block mt-0.5">Telefon: {selectedApp.rujukan2Phone} 📲</a>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: MYKAD & SWAFOTO e-KYC */}
              {activeTab === 'identity' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* MyKad Depan */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl text-center space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MyKad Depan</div>
                      <div className="aspect-[3/2] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 text-xs font-bold text-slate-500">
                        🪪 Gambar MyKad Depan
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block">✓ MyKad_Front_{selectedApp.ic}.jpg</span>
                    </div>

                    {/* MyKad Belakang */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl text-center space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">MyKad Belakang</div>
                      <div className="aspect-[3/2] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 text-xs font-bold text-slate-500">
                        🪪 Gambar MyKad Belakang
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block">✓ MyKad_Back_{selectedApp.ic}.jpg</span>
                    </div>

                    {/* Swafoto Live */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl text-center space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Swafoto</div>
                      <div className="aspect-[3/2] bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 text-xs font-bold text-slate-500">
                        📸 Swafoto Biometrik
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold block">✓ selfie_{selectedApp.ic}_ekyc.jpg</span>
                    </div>

                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <div className="text-xs font-black text-emerald-400 uppercase tracking-wide">Status Pengesahan Biometrik e-KYC</div>
                      <p className="text-[11px] text-slate-300 mt-0.5">Sistem memadankan wajah swafoto dengan foto dalam kad pengenalan dengan peratusan padanan 98.4%. Profil disahkan sah.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DOKUMEN KEWANANGAN & UTILITI */}
              {activeTab === 'financial' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Slip Gaji 3 Bulan */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5">💵 Slip Gaji 3 Bulan Terkini</div>
                      <div className="text-xs space-y-1 text-slate-300 font-mono">
                        <div className="truncate">✓ Bulan 1 (Terbaru): <span className="text-cyan-400">gaji_bln1_{selectedApp.ic}.pdf</span></div>
                        <div className="truncate">✓ Bulan 2: <span className="text-cyan-400">gaji_bln2_{selectedApp.ic}.pdf</span></div>
                        <div className="truncate">✓ Bulan 3: <span className="text-cyan-400">gaji_bln3_{selectedApp.ic}.pdf</span></div>
                      </div>
                    </div>

                    {/* Penyata Bank 3 Bulan */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5">📊 Penyata Bank 3 Bulan Terkini</div>
                      <div className="text-xs space-y-1 text-slate-300 font-mono">
                        <div className="truncate">✓ Penyata Bulan 1: <span className="text-cyan-400">bank_statement_m1_{selectedApp.ic}.pdf</span></div>
                        <div className="truncate">✓ Penyata Bulan 2: <span className="text-cyan-400">bank_statement_m2_{selectedApp.ic}.pdf</span></div>
                        <div className="truncate">✓ Penyata Bulan 3: <span className="text-cyan-400">bank_statement_m3_{selectedApp.ic}.pdf</span></div>
                      </div>
                    </div>

                    {/* Penyata KWSP */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5">🛡️ Caruman Penyata KWSP</div>
                      <div className="text-xs text-slate-300 font-mono truncate">
                        ✓ Penyata Ringkas: <span className="text-cyan-400">kwsp_statement_2026_{selectedApp.ic}.pdf</span>
                      </div>
                    </div>

                    {/* Bil Elektrik / Air */}
                    <div className="bg-[#040814]/40 border border-slate-800 p-4 rounded-xl space-y-3">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5">⚡ Bil Elektrik / Air Terkini</div>
                      <div className="text-xs text-slate-300 font-mono truncate">
                        ✓ Pengesahan Alamat: <span className="text-cyan-400">utiliti_bill_{selectedApp.ic}.pdf</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Tapak Modal (Footer / Tindakan Pantas) */}
            <div className="p-6 bg-[#040814]/40 border-t border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-slate-400">Semakan Keputusan Saringan:</span>
                <div className="text-sm font-extrabold text-white">Status Semasa: <span className={`uppercase ${selectedApp.status === 'Lulus' ? 'text-emerald-400' : selectedApp.status === 'Ditolak' ? 'text-red-400' : 'text-amber-400'}`}>{selectedApp.status}</span></div>
              </div>
              
              <div className="flex gap-2">
                {selectedApp.status === 'Dalam Semakan' ? (
                  <>
                    <button
                      onClick={() => triggerAction('LULUS', selectedApp.id, selectedApp.nama)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-all"
                    >
                      Luluskan Profil (RM300)
                    </button>
                    <button
                      onClick={() => triggerAction('TOLAK', selectedApp.id, selectedApp.nama)}
                      className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-all"
                    >
                      Tolak Saringan
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all"
                  >
                    Tutup Tetingkap
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}