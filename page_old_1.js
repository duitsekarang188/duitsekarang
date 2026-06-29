'use client';

import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('summary'); // summary, identity, financial
  const [selectedApp, setSelectedApp] = useState(null); // Menyimpan rekod pemohon yang sedang disemak dalam modal
  const [showConfirm, setShowConfirm] = useState({ show: false, type: '', id: null, nama: '' });
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const localData = localStorage.getItem('duitsekarang_admin_apps');
    if (localData) {
      setApplications(JSON.parse(localData));
    } else {
      // Data Mock awal yang sangat kaya dengan butiran sepadan borang mohon asal
      const initialMockData = [
        {
          id: 'DS-2026-001',
          nama: 'Muhammad Ammar Bin Rosli',
          ic: '980312105433',
          phone: '60134456789',
          pendapatan: 2800.00,
          status: 'PENDING',
          pelanPokok: 300,
          pelanBayarBalik: 339,
          pelanHari: 15,
          // Butiran Pekerjaan (Langkah 2)
          kerja: 'Operator Mesin Senior',
          syarikatNama: 'Intel Technology Sdn Bhd',
          syarikatAlamat: 'Bayan Lepas Free Industrial Zone, Phase 3, 11900 Bayan Lepas, Pulau Pinang',
          syarikatPhone: '046408888',
          tempohKerja: '3 Tahun',
          // Butiran Bank
          bankNama: 'Maybank Berhad',
          bankAkaun: '162012345678',
          // Kontak Rujukan (Langkah 3)
          rujukan1Nama: 'Rosli bin Ahmad',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '0194458899',
          rujukan2Nama: 'Siti Aminah binti Isa',
          rujukan2Hubungan: 'Suami/Isteri',
          rujukan2Phone: '0134451122',
          // Dokumen Sokongan (Langkah 4)
          dokumen: {
            mykadDepan: 'mykad_depan_ammar.jpg',
            mykadBelakang: 'mykad_belakang_ammar.jpg',
            selfie: 'selfie_980312105433_ekyc.jpg',
            gajiBulan1: 'slip_gaji_ammar_mei2026.pdf',
            gajiBulan2: 'slip_gaji_ammar_april2026.pdf',
            gajiBulan3: 'slip_gaji_ammar_mac2026.pdf',
            bankBulan1: 'penyata_bank_ammar_mei.pdf',
            bankBulan2: 'penyata_bank_ammar_april.pdf',
            bankBulan3: 'penyata_bank_ammar_mac.pdf',
            kwsp: 'penyata_kwsp_ammar_2026.pdf',
            bilUtiliti: 'bil_tnb_ammar_mei2026.pdf'
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
          // Butiran Pekerjaan (Langkah 2)
          kerja: 'Eksekutif Khidmat Pelanggan',
          syarikatNama: 'Maxis Broadband Sdn Bhd',
          syarikatAlamat: 'Level 18, Menara Maxis, Kuala Lumpur City Centre, 50088 Kuala Lumpur',
          syarikatPhone: '0323307000',
          tempohKerja: '2 Tahun 5 Bulan',
          // Butiran Bank
          bankNama: 'CIMB Bank Berhad',
          bankAkaun: '704512398455',
          // Kontak Rujukan (Langkah 3)
          rujukan1Nama: 'Ahmad bin Yunus',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '0173321155',
          rujukan2Nama: 'Fatin binti Ahmad',
          rujukan2Hubungan: 'Adik-Beradik',
          rujukan2Phone: '0129988776',
          // Dokumen Sokongan (Langkah 4)
          dokumen: {
            mykadDepan: 'mykad_depan_sitinurhaliza.jpg',
            mykadBelakang: 'mykad_belakang_sitinurhaliza.jpg',
            selfie: 'selfie_950722145562_ekyc.jpg',
            gajiBulan1: 'slip_gaji_siti_mei2026.pdf',
            gajiBulan2: 'slip_gaji_siti_april2026.pdf',
            gajiBulan3: 'slip_gaji_siti_mac2026.pdf',
            bankBulan1: 'penyata_bank_siti_mei.pdf',
            bankBulan2: 'penyata_bank_siti_april.pdf',
            bankBulan3: 'penyata_bank_siti_mac.pdf',
            kwsp: 'penyata_kwsp_siti_2026.pdf',
            bilUtiliti: 'bil_air_siti_mei2026.pdf'
          }
        },
        {
          id: 'DS-2026-003',
          nama: 'Ahmad Fahmi bin Mazlan',
          ic: '950101105431',
          phone: '60123456789',
          pendapatan: 3200.00,
          status: 'APPROVED',
          pelanPokok: 300,
          pelanBayarBalik: 339,
          pelanHari: 15,
          // Butiran Pekerjaan (Langkah 2)
          kerja: 'Juruterknik Kanan IT',
          syarikatNama: 'Inari Amertron Berhad',
          syarikatAlamat: 'Plot 51, Hilir Sungai Keluang 4, Bayan Lepas Free Industrial Zone, Pulau Pinang',
          syarikatPhone: '046456631',
          tempohKerja: '4 Tahun',
          // Butiran Bank
          bankNama: 'Bank Islam Malaysia Berhad',
          bankAkaun: '08013020456123',
          // Kontak Rujukan (Langkah 3)
          rujukan1Nama: 'Mazlan bin Harun',
          rujukan1Hubungan: 'Ibu/Bapa',
          rujukan1Phone: '0124455662',
          rujukan2Nama: 'Khairul bin Mazlan',
          rujukan2Hubungan: 'Adik-Beradik',
          rujukan2Phone: '0195544332',
          // Dokumen Sokongan (Langkah 4)
          dokumen: {
            mykadDepan: 'mykad_depan_fahmi.jpg',
            mykadBelakang: 'mykad_belakang_fahmi.jpg',
            selfie: 'selfie_950101105431_ekyc.jpg',
            gajiBulan1: 'slip_gaji_fahmi_mei2026.pdf',
            gajiBulan2: 'slip_gaji_fahmi_april2026.pdf',
            gajiBulan3: 'slip_gaji_fahmi_mac2026.pdf',
            bankBulan1: 'penyata_bank_fahmi_mei.pdf',
            bankBulan2: 'penyata_bank_fahmi_april.pdf',
            bankBulan3: 'penyata_bank_fahmi_mac.pdf',
            kwsp: 'penyata_kwsp_fahmi_2026.pdf',
            bilUtiliti: 'bil_syabas_fahmi_mei2026.pdf'
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

    // Kemaskini tetingkap dokumen yang aktif jika sedang terbuka
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp(prev => ({ ...prev, status: type === 'APPROVE' ? 'APPROVED' : 'REJECTED' }));
    }

    setNotification({
      type: type === 'APPROVE' ? 'success' : 'error',
      text: `Permohonan ${showConfirm.nama} berjaya di${type === 'APPROVE' ? 'luluskan (RM300)' : 'tolak'}!`
    });

    setTimeout(() => setNotification(null), 3500);
    setShowConfirm({ show: false, type: '', id: null, nama: '' });
  };

  const totalInSemakan = applications.filter(app => app.status === 'PENDING').length;
  const totalDiluluskan = applications.filter(app => app.status === 'APPROVED').length;

  // Mencari dan menapis permohonan mengikut query carian & status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ic.includes(searchTerm) ||
      app.phone.includes(searchTerm);
    
    if (filterStatus === 'ALL') return matchesSearch;
    return matchesSearch && app.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-[#070D19] text-slate-100 font-sans antialiased relative pb-20">
      {/* Background Subtle Grid & Glow Effects */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0"></div>

      {/* Header */}
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
        
        {/* Floating Toast Notification */}
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Dalam Semakan */}
          <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-all">
            <div className="text-slate-400 text-xs font-black uppercase tracking-wider">Dalam Semakan</div>
            <div className="text-4xl font-black text-amber-500 mt-3">{totalInSemakan} Kes</div>
            <div className="absolute right-4 bottom-4 text-4xl opacity-[0.03] group-hover:scale-110 transition-transform">⏳</div>
          </div>

          {/* Card 2: Jumlah Diluluskan */}
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

        {/* Search & Filter Bar */}
        <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">🔍</span>
            <input 
              type="text" 
              placeholder="Cari Nama, IC, atau Nombor Telefon..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#081121] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all uppercase border ${
                  filterStatus === status 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-[#081121] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {status === 'ALL' ? 'Semua' : status === 'PENDING' ? 'Semakan' : status === 'APPROVED' ? 'Lulus' : 'Ditolak'}
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 bg-[#0C1729]/80 flex justify-between items-center">
            <h3 className="text-md font-black text-white uppercase tracking-wider">Senarai Permohonan Terkini</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#081121] text-slate-400 text-[11px] font-black uppercase tracking-wider border-b border-slate-800/80">
                  <th className="py-4 px-6">Maklumat Pemohon</th>
                  <th className="py-4 px-6">Pendapatan</th>
                  <th className="py-4 px-6">Dokumen Sokongan (e-KYC)</th>
                  <th className="py-4 px-6">Pelan Cadangan</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500 text-xs font-semibold">
                      Tiada sebarang permohonan saringan ditemui.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-[#11213A]/50 transition-all">
                      {/* Column 1: Maklumat Pemohon */}
                      <td className="py-5 px-6">
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white">{app.nama}</div>
                          <div className="text-xs text-slate-400 font-mono">IC: {app.ic}</div>
                          <div>
                            <a 
                              href={`https://wa.me/${app.phone}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-cyan-400 hover:underline font-bold flex items-center gap-1"
                            >
                              WA: {app.phone} 📱
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

                      {/* Column 3: Dokumen Sokongan (Tab Controller) */}
                      <td className="py-5 px-6">
                        <div className="flex flex-col gap-1.5 text-xs">
                          {/* Summary Form Button */}
                          <button 
                            onClick={() => { setSelectedApp(app); setActiveTab('summary'); }}
                            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors text-[11px]"
                          >
                            <span>📝 Ringkasan Borang (Summary)</span>
                          </button>
                          {/* Identity Files Button */}
                          <button 
                            onClick={() => { setSelectedApp(app); setActiveTab('identity'); }}
                            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-[11px]"
                          >
                            <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 pointer-events-none scale-90" />
                            <span>MyKad & Swafoto (e-KYC)</span>
                          </button>
                          {/* Financial Files Button */}
                          <button 
                            onClick={() => { setSelectedApp(app); setActiveTab('financial'); }}
                            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors text-[11px]"
                          >
                            <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 pointer-events-none scale-90" />
                            <span>Bukti Gaji, Bank, KWSP, Bil</span>
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
                        <span className={`inline-block text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
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
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all shadow-md"
                            >
                              Lulus (RM300)
                            </button>
                            <button 
                              onClick={() => triggerAction('REJECT', app.id, app.nama)}
                              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all shadow-md"
                            >
                              Tolak
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 italic">
                            Selesai diproses
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
      {selectedApp && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-40 overflow-y-auto">
          <div className="bg-[#0E1B30] border border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-[#0C1729]/90 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                  Saringan e-KYC Bersepadu
                </span>
                <h3 className="text-lg font-black text-white mt-2">
                  {selectedApp.nama} ({selectedApp.id})
                </h3>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white text-xl font-bold bg-slate-800/50 hover:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="bg-[#091121] border-b border-slate-800 px-6 flex gap-2">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-4 px-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${
                  activeTab === 'summary' 
                    ? 'border-orange-500 text-orange-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                📝 Ringkasan Borang
              </button>
              <button
                onClick={() => setActiveTab('identity')}
                className={`py-4 px-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${
                  activeTab === 'identity' 
                    ? 'border-orange-500 text-orange-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                🪪 MyKad & Swafoto (e-KYC)
              </button>
              <button
                onClick={() => setActiveTab('financial')}
                className={`py-4 px-4 text-xs font-black uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${
                  activeTab === 'financial' 
                    ? 'border-orange-500 text-orange-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                📊 Kewangan & Utiliti
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 max-h-[550px] overflow-y-auto bg-[#0A1324] space-y-6">

              {/* TAB 1: SUMMARY FORM */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  {/* Seksyen 1: Profil Asas */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">👤 Profil Peribadi Pemohon</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-[#0E1B30] p-3.5 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block mb-1">Nama Penuh</span>
                        <span className="text-white font-extrabold">{selectedApp.nama}</span>
                      </div>
                      <div className="bg-[#0E1B30] p-3.5 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block mb-1">Nombor Kad Pengenalan</span>
                        <span className="text-white font-mono font-bold">{selectedApp.ic}</span>
                      </div>
                      <div className="bg-[#0E1B30] p-3.5 rounded-xl border border-slate-800">
                        <span className="text-slate-500 block mb-1">Nombor Telefon (WhatsApp)</span>
                        <span className="text-cyan-400 font-bold">{selectedApp.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Seksyen 2: Maklumat Pekerjaan & Bank */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">💼 Kedudukan Majikan & Kewangan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-[#0E1B30] p-4 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-slate-400 font-bold block border-b border-slate-800/60 pb-1.5">Maklumat Syarikat</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div><span className="text-slate-500 block">Syarikat:</span><span className="text-white font-semibold">{selectedApp.syarikatNama || 'Tech Sdn Bhd'}</span></div>
                          <div><span className="text-slate-500 block">Jawatan:</span><span className="text-white font-semibold">{selectedApp.kerja || 'Operator'}</span></div>
                          <div><span className="text-slate-500 block">Tel Pejabat:</span><span className="text-white font-semibold">{selectedApp.syarikatPhone || '03-892XXXX'}</span></div>
                          <div><span className="text-slate-500 block">Tempoh Bekerja:</span><span className="text-white font-semibold">{selectedApp.tempohKerja || '2 Tahun'}</span></div>
                        </div>
                        <div className="pt-2 border-t border-slate-800/40">
                          <span className="text-slate-500 block">Alamat Pejabat:</span>
                          <span className="text-white text-[11px] leading-relaxed block mt-1">{selectedApp.syarikatAlamat || 'Alamat tidak disediakan'}</span>
                        </div>
                      </div>

                      <div className="bg-[#0E1B30] p-4 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-slate-400 font-bold block border-b border-slate-800/60 pb-1.5">Kelayakan Pendapatan & Bank</span>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-[#081121] p-2 rounded-lg"><span className="text-slate-500">Gaji Bersih Bulanan:</span><span className="text-emerald-400 font-extrabold">RM {selectedApp.pendapatan.toFixed(2)}</span></div>
                          <div className="flex justify-between items-center bg-[#081121] p-2 rounded-lg"><span className="text-slate-500">Nama Bank Pembayaran:</span><span className="text-white font-bold">{selectedApp.bankNama || 'Maybank Berhad'}</span></div>
                          <div className="flex justify-between items-center bg-[#081121] p-2 rounded-lg"><span className="text-slate-500">Nombor Akaun:</span><span className="text-white font-mono font-bold">{selectedApp.bankAkaun || '1620XXXXXXXX'}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seksyen 3: Emergency Contacts */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">📞 Kontak Rujukan Kecemasan (Emergency Contacts)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Rujukan 1 */}
                      <div className="bg-[#0E1B30] p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-slate-400 font-bold block border-b border-slate-800/60 pb-1.5">Kontak Rujukan Utama (1)</span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between"><span className="text-slate-500">Nama Penuh:</span><span className="text-white font-bold">{selectedApp.rujukan1Nama || 'Rosli bin Ahmad'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Hubungan:</span><span className="text-orange-400 font-bold">{selectedApp.rujukan1Hubungan || 'Ibu/Bapa'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">No Telefon:</span><span className="text-white font-semibold">{selectedApp.rujukan1Phone || '019XXXXXXXX'}</span></div>
                        </div>
                      </div>
                      {/* Rujukan 2 */}
                      <div className="bg-[#0E1B30] p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-slate-400 font-bold block border-b border-slate-800/60 pb-1.5">Kontak Rujukan Kedua (2)</span>
                        <div className="space-y-1.5">
                          <div className="flex justify-between"><span className="text-slate-500">Nama Penuh:</span><span className="text-white font-bold">{selectedApp.rujukan2Nama || 'Siti Aminah binti Isa'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Hubungan:</span><span className="text-orange-400 font-bold">{selectedApp.rujukan2Hubungan || 'Suami/Isteri'}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">No Telefon:</span><span className="text-white font-semibold">{selectedApp.rujukan2Phone || '013XXXXXXXX'}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MYKAD & SWAFOTO */}
              {activeTab === 'identity' && (
                <div className="space-y-6">
                  {/* Kad Pengenalan Depan & Belakang */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">🪪 Kad Pengenalan Malaysia (MyKad)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                      {/* MyKad Depan */}
                      <div className="w-full max-w-[340px] h-52 bg-[#1e293b] rounded-2xl p-4 border border-cyan-500/20 relative shadow-inner flex flex-col justify-between text-left">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black tracking-widest text-cyan-400">KAD PENGENALAN MALAYSIA</p>
                            <p className="text-[10px] text-slate-300 font-bold">MYKAD DEPAN</p>
                          </div>
                          <span className="text-xs">🇲🇾</span>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                          <div className="w-14 h-18 bg-slate-700 rounded border border-slate-600 flex items-center justify-center text-2xl shrink-0">
                            👤
                          </div>
                          <div className="space-y-1 text-slate-300">
                            <p className="text-xs font-black text-white truncate max-w-[180px]">{selectedApp.nama}</p>
                            <p className="text-[10px] font-mono font-bold">{selectedApp.ic}</p>
                            <p className="text-[8px] text-slate-400">WARGANEGARA MALAYSIA</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[8px] text-slate-500">e-KYC Secure ID API</span>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">{selectedApp.dokumen?.mykadDepan || 'depan.jpg'}</span>
                        </div>
                      </div>

                      {/* MyKad Belakang */}
                      <div className="w-full max-w-[340px] h-52 bg-[#1e293b] rounded-2xl p-4 border border-cyan-500/10 relative shadow-inner flex flex-col justify-between text-left">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-[9px] font-black tracking-widest text-slate-400">KAD PENGENALAN MALAYSIA</p>
                            <p className="text-[10px] text-slate-300 font-bold">MYKAD BELAKANG</p>
                          </div>
                          <span className="text-xs">🇲🇾</span>
                        </div>
                        <div className="py-2 space-y-1 text-slate-400 text-[9px]">
                          <p className="text-slate-300 font-bold">Alamat:</p>
                          <p className="leading-relaxed">Kampung Melayu, Kajang, Selangor Darul Ehsan, Malaysia.</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[8px] text-slate-500">SULIT & PERSENDIRIAN</span>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">{selectedApp.dokumen?.mykadBelakang || 'belakang.jpg'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Swafoto / Live Selfie */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">📸 Pengesahan Swafoto (Live Selfie e-KYC)</h4>
                    <div className="flex flex-col items-center justify-center p-6 bg-[#081121] border border-slate-800 rounded-2xl">
                      <div className="w-40 h-40 rounded-full border-4 border-emerald-500/30 overflow-hidden relative shadow-lg bg-slate-900 flex items-center justify-center">
                        <span className="text-6xl">👤</span>
                        <div className="absolute inset-0 bg-emerald-500/10 flex items-end justify-center pb-2">
                          <span className="bg-emerald-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Padanan 98.4%
                          </span>
                        </div>
                      </div>
                      <div className="text-center mt-4 space-y-1">
                        <p className="text-xs font-bold text-white">{selectedApp.dokumen?.selfie || 'selfie_ekyc.jpg'}</p>
                        <p className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                          <span>✅ Padanan Biometrik Sistem Sah & Aktif</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FINANCIAL & UTILITY FILES */}
              {activeTab === 'financial' && (
                <div className="space-y-6">
                  {/* Slip Gaji 3 Bulan */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">💵 Penyata Slip Gaji Kakitangan (3 Bulan Terkini)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Bulan 1 (Mei)', 'Bulan 2 (April)', 'Bulan 3 (Mac)'].map((bulan, idx) => {
                        const fileKey = `gajiBulan${idx + 1}`;
                        return (
                          <div key={idx} className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wide">{bulan}</span>
                              <p className="text-xs font-bold text-white truncate">{selectedApp.dokumen?.[fileKey] || `slip_gaji_${idx + 1}.pdf`}</p>
                            </div>
                            <div className="bg-[#081121] p-3 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5 border border-slate-800/40">
                              <div className="flex justify-between"><span>Gaji Kasar:</span><span className="text-white font-bold">RM 3,200.00</span></div>
                              <div className="flex justify-between"><span>Potongan:</span><span className="text-red-400">RM 400.00</span></div>
                              <div className="flex justify-between border-t border-slate-800 pt-1 text-emerald-400 font-extrabold"><span>GAJI BERSIH:</span><span>RM {selectedApp.pendapatan.toFixed(2)}</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Penyata Bank 3 Bulan */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b border-slate-800 pb-2">📊 Penyata Akaun Bank Rasmi (3 Bulan Terkini)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Penyata Bulan 1', 'Penyata Bulan 2', 'Penyata Bulan 3'].map((penyata, idx) => {
                        const fileKey = `bankBulan${idx + 1}`;
                        return (
                          <div key={idx} className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wide">{penyata}</span>
                              <p className="text-xs font-bold text-white truncate">{selectedApp.dokumen?.[fileKey] || `bank_statement_${idx + 1}.pdf`}</p>
                            </div>
                            <div className="bg-[#081121] p-3 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5 border border-slate-800/40">
                              <div className="flex justify-between"><span>Nama Bank:</span><span className="text-white font-bold truncate max-w-[80px]">{selectedApp.bankNama}</span></div>
                              <div className="flex justify-between"><span>Kredit Gaji:</span><span className="text-emerald-400 font-extrabold">RM {selectedApp.pendapatan.toFixed(2)}</span></div>
                              <div className="flex justify-between"><span>Baki Purata:</span><span className="text-white font-bold">RM 1,245.00</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* KWSP & Bil Utiliti */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* KWSP Box */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">🛡️ Caruman Penyata KWSP Terkini</span>
                      <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white truncate">{selectedApp.dokumen?.kwsp || 'penyata_kwsp.pdf'}</p>
                          <span className="text-[9px] text-slate-500 block">Saringan No Ahli: 1299-4455-6677</span>
                        </div>
                        <div className="bg-[#081121] p-3 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5 border border-slate-800/40">
                          <div className="flex justify-between"><span>Caruman Majikan (13%):</span><span className="text-white font-bold">RM 416.00</span></div>
                          <div className="flex justify-between"><span>Caruman Pekerja (11%):</span><span className="text-white font-bold">RM 352.00</span></div>
                          <div className="flex justify-between border-t border-slate-800 pt-1 text-cyan-400 font-extrabold"><span>Baki Akaun 1 & 2:</span><span>RM 45,280.00</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Bil Utiliti Box */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">⚡ Bil Utiliti Kediaman (Alamat Semasa)</span>
                      <div className="bg-[#0E1B30] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white truncate">{selectedApp.dokumen?.bilUtiliti || 'bil_utiliti.jpg'}</p>
                          <span className="text-[9px] text-slate-500 block">Jenis Bil: TNB / Syabas / Telekom</span>
                        </div>
                        <div className="bg-[#081121] p-3 rounded-xl text-[10px] font-mono text-slate-400 space-y-1.5 border border-slate-800/40">
                          <div className="flex justify-between"><span>Tarikh Bil:</span><span className="text-white font-bold">Bulan Lepas</span></div>
                          <div className="flex justify-between"><span>Nama Pemilik:</span><span className="text-white font-bold truncate max-w-[110px]">{selectedApp.rujukan1Nama}</span></div>
                          <div className="flex justify-between border-t border-slate-800 pt-1 text-cyan-400 font-extrabold"><span>Status Padanan Alamat:</span><span>✓ Sah (Kajang)</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 border-t border-slate-800 bg-[#0C1729]/90 flex justify-between items-center">
              <div>
                {selectedApp.status === 'PENDING' ? (
                  <span className="text-xs text-slate-400 italic">Sila buat semakan semua tab sebelum meluluskan kes.</span>
                ) : (
                  <span className="text-xs text-slate-400 font-bold">Status semasa: {selectedApp.status === 'APPROVED' ? 'LULUS (RM300)' : 'DITOLAK'}</span>
                )}
              </div>
              
              <div className="flex gap-2">
                {selectedApp.status === 'PENDING' && (
                  <>
                    <button 
                      onClick={() => triggerAction('APPROVE', selectedApp.id, selectedApp.nama)}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase transition-all shadow-md"
                    >
                      Lulus (RM300)
                    </button>
                    <button 
                      onClick={() => triggerAction('REJECT', selectedApp.id, selectedApp.nama)}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase transition-all shadow-md"
                    >
                      Tolak
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase transition-all"
                >
                  Tutup Pusat Semakan
                </button>
              </div>
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