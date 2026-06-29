'use client';

import React, { useState, useEffect } from 'react';

export default function HomePage() {
  // Default set ke RM500 & 30 hari untuk match sample RM507.50 kau sebiji-sebiji
  const [jumlah, setJumlah] = useState(500);
  const [hari, setHari] = useState(30);
  const [faqTerbuka, setFaqTerbuka] = useState(null);

  // State untuk Live Notification Pop-up
  const [showNotif, setShowNotif] = useState(false);
  const [notifData, setNotifData] = useState({ nama: '', amaun: '', lokasi: '' });

  // Senarai data rawak untuk simulasi notifikasi aktif gred industri
  const senaraiPelanggan = [
    { nama: "En. Mohd Rizuan ****", amaun: "2,000", lokasi: "Shah Alam" },
    { nama: "Pn. Nurul Asyikin ****", amaun: "500", lokasi: "Kajang" },
    { nama: "En. Khairul Anuar ****", amaun: "1,500", lokasi: "Cheras" },
    { nama: "Cik Siti Aishah ****", amaun: "3,000", lokasi: "Balakong" },
    { nama: "En. Muhammad Faizal ****", amaun: "800", lokasi: "Gombak" },
    { nama: "Pn. Farhana ****", amaun: "2,500", lokasi: "Klang" }
  ];

  // --- EFFECT 1: SISTEM KUNCI KESELAMATAN INSPECT ELEMENT ---
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

  // --- EFFECT 2: LIVE NOTIFIKASI SOSIAL (SOCIAL PROOF) ---
  useEffect(() => {
    // Kitaran meluncurkan notifikasi setiap 10 saat untuk social proof
    const interval = setInterval(() => {
      const rawak = senaraiPelanggan[Math.floor(Math.random() * senaraiPelanggan.length)];
      setNotifData(rawak);
      setShowNotif(true);

      // Sembunyikan notifikasi selepas 4 saat terpapar
      setTimeout(() => {
        setShowNotif(false);
      }, 4000);

    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setFaqTerbuka(faqTerbuka === index ? null : index);
  };

  // STRATEGI FORMULA BARU (Kadar Harian Malar 0.05% @ 18% setahun)
  const dailyRatePercent = 0.05; 
  const totalProfit = jumlah * (dailyRatePercent / 100) * hari;
  const totalPayable = jumlah + totalProfit;

  const dataFaq = [
    { q: "Apakah syarat kelayakan asas untuk memohon?", a: "Anda hanya perlu berwarganegara Malaysia, berumur 18 hingga 60 tahun, mempunyai pekerjaan tetap/kontrak/e-hailing, dan memiliki akaun bank simpanan peribadi yang aktif." },
    { q: "Berapa lamakah proses saringan profil kredit ini?", a: "Sistem kecerdasan buatan (AI) kami bersama panel pentadbir akan melakukan saringan dokumen e-KYC anda secara teliti dalam tempoh 1 hingga 2 hari bekerja." },
    { q: "Mengapakah saya perlu melalui fasa matang Tier 1 (RM300)?", a: "Bagi pemohon baharu yang tiada rekod dalam sistem kami, fasa mikro RM300 selama 15 hari ini bertindak sebagai pembina skor kredit automatik. Penyelesaian awal yang berdisiplin akan membuktikan integriti data anda sekaligus membuka had pembiayaan penuh sehingga RM50,000 pada fasa kedua." },
    { q: "Adakah terdapat sebarang wang pendahuluan (upfront deposit)?", a: "TIADA. Kami mematuhi standard integriti tinggi. Tiada sebarang yuran pendahuluan atau wang jaminan insurans diminta sebelum permohonan diluluskan." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1E36] via-[#0B1528] to-[#040814] text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      {/* 2-TONE PREMIUM SHINE EFFECT */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent pointer-events-none rounded-full blur-[150px] z-0"></div>
      <div className="absolute top-[30%] right-0 w-[700px] h-[700px] bg-gradient-to-tl from-orange-500/5 to-transparent pointer-events-none rounded-full blur-[140px] z-0"></div>

      {/* DYNAMIC LIVE POP-UP NOTIFICATION (Meluncur dari bawah kiri skrin) */}
      <div className={`fixed bottom-6 left-6 z-50 max-w-sm bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all duration-500 transform ${showNotif ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
        <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 animate-pulse">
          🔔
        </div>
        <div className="text-left text-xs sm:text-sm">
          <p className="font-extrabold text-white">Saringan Berjaya 🎉</p>
          <p className="text-slate-400 mt-0.5">
            <span className="text-orange-400 font-bold">{notifData.nama}</span> ({notifData.lokasi}) baru sahaja menerima pembiayaan <span className="text-emerald-400 font-black">RM {notifData.amaun}</span>.
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Saringan selesai diproses baru-baru ini</p>
        </div>
      </div>

      {/* 1. TOP LEGAL COMPLIANCE BAR */}
      <div className="bg-[#060D1A] text-slate-400 text-[11px] sm:text-xs font-semibold py-2.5 px-4 tracking-wider text-center border-b border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
          <span className="flex items-center gap-1.5 text-orange-400 font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SISTEM SEMAKAN KREDIT AKTIF
          </span>
          <span className="hidden sm:inline text-slate-800">|</span>
          <span>Sistem Maklumat Diperakui & Dilindungi di bawah Akta Perlindungan Data Peribadi (PDPA) 2010</span>
        </div>
      </div>

      {/* 2. EXCLUSIVE MEGA HEADER - LOGO GERGASI & MENU CENTERED PERFECT */}
      <header className="sticky top-0 z-50 bg-[#0A162C]/95 backdrop-blur-xl border-b border-slate-900/60 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between relative">
          
          {/* LOGO: Bebas tanpa sekatan CSS, skala memanjang tajam */}
          <div className="flex items-center z-10">
            <a href="#" className="block w-[260px] sm:w-[340px] h-24">
              <img 
                src="/logo.png" 
                alt="DuitSekarang" 
                className="w-full h-full object-contain object-left"
              />
            </a>
          </div>

          {/* MENU TEXTS: Dipaksa duduk 100% di tengah-tengah ruang kosong header */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-6 xl:space-x-8 text-base font-black tracking-wide text-slate-300">
            <a href="#" className="text-white border-b-2 border-orange-500 pb-1 transition-all">Utama</a>
            <a href="#kelayakan" className="hover:text-orange-400 transition-colors whitespace-nowrap">Syarat Kelayakan</a>
            <a href="#workflow" className="hover:text-orange-400 transition-colors whitespace-nowrap">Aliran Kerja</a>
            <a href="#faq" className="hover:text-orange-400 transition-colors whitespace-nowrap">Soalan Lazim</a>
          </nav>

          {/* BUTTON CTA: Kekal kemas di hujung kanan skrin */}
          <div className="flex-shrink-0 z-10">
            <a href="/mohon" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs sm:text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 uppercase tracking-widest">
              Mula Saringan
            </a>
          </div>

        </div>
      </header>

      {/* 3. HERO & INTERACTIVE CALCULATOR SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 grid lg:grid-cols-12 gap-12 items-center">
        {/* Sisi Kiri: Teks Hero */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-cyan-400 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-widest border border-blue-500/20">
            ⚡ PROSES SARINGAN DALAM 1-2 HARI BEKERJA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Pembiayaan Digital <br />
            Pantas, Selamat & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Dipercayai.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Dapatkan penilaian skor kredit anda secara telus. Proses 100% atas talian tanpa penjamin atau wang pendahuluan tersembunyi.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto lg:mx-0 text-center">
            <div className="bg-[#111F37] p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Atas Talian</div>
            </div>
            <div className="bg-[#111F37] p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div className="text-xl sm:text-2xl font-black text-orange-400">SSL</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Secure</div>
            </div>
            <div className="bg-[#111F37] p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">RM 0</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Caj Muka</div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: KOTAK KALKULATOR BARU (GAYA PREMIUM SEBIJI SEPERTI image_6e9ae0.png) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-950/20 border border-slate-100 space-y-8 relative text-slate-800">
          
          {/* Lencana Live Jingga */}
          <div className="absolute -top-3 left-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-md uppercase flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
            LIVE
          </div>

          {/* Tajuk Kalkulator */}
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Estimate Your Loan</h3>
            <p className="text-xs text-slate-500 mt-1">Slide to see your terms · max 18% APR</p>
          </div>

          {/* Slider Amaun (Amount) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm font-bold">Amount</span>
              <span className="text-blue-600 text-2xl font-black">RM {jumlah}</span>
            </div>
            <div className="relative">
              <input 
                type="range" 
                min="300" 
                max="3000" 
                step="100" 
                value={jumlah} 
                onChange={(e) => setJumlah(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer outline-none transition-all accent-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-all" 
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>RM 300 (Had Saringan)</span>
              <span>RM 3,000</span>
            </div>
          </div>

          {/* Slider Tempoh (Tenure) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 text-sm font-bold">Tenure</span>
              <span className="text-blue-600 text-2xl font-black">{hari} days</span>
            </div>
            <div className="relative">
              <input 
                type="range" 
                min="7" 
                max="30" 
                step="1" 
                value={hari} 
                onChange={(e) => setHari(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer outline-none transition-all accent-blue-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:transition-all" 
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>7 days</span>
              <span>30 days</span>
            </div>
          </div>

          {/* Kotak Rincian Biru Lembut (Sama Seperti image_6e9ae0.png & image_6eb9a5.png) */}
          <div className="bg-[#f0f7ff]/80 border border-[#dbeafe] p-6 rounded-3xl space-y-4 text-xs sm:text-sm text-slate-600 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-500">Daily rate</span>
              <span className="font-extrabold text-slate-800">{dailyRatePercent}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-500">Total profit</span>
              <span className="font-extrabold text-slate-800">RM {totalProfit.toFixed(2)}</span>
            </div>
            
            {/* Garis Putus-putus Pemisah */}
            <div className="border-t border-dashed border-[#bfdbfe] my-2"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-extrabold text-slate-900">Total payable</span>
              <span className="text-2xl font-black text-blue-600 font-mono">
                RM {totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Butang Ganti "Apply on google play" dengan Hantar Permohonan Digital */}
          <a 
            href="/mohon" 
            className="block text-center text-white bg-blue-600 hover:bg-blue-700 transition-all py-4.5 rounded-full font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-600/20"
          >
            Hantar Permohonan Digital
          </a>
        </div>
      </section>

      {/* SEKSYEN BARU: EXAMPLE CALCULATOR (SAMA SEBUIJI SEPERTI image_6eb9a5.png) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          
          {/* Kad Kiri: Forest Green Term Card */}
          <div className="md:col-span-4 bg-[#1e5e3a] p-8 sm:p-10 rounded-[2rem] flex flex-col justify-center text-center space-y-6 shadow-xl border border-[#2d7d51]">
            <h3 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">
              What is the loan term?
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[#a7f3d0] text-xs uppercase tracking-wider font-bold">Minimum loan term:</p>
                <p className="text-white text-xl font-black mt-1">92 days</p>
              </div>
              
              <div className="pt-2 border-t border-emerald-800">
                <p className="text-[#a7f3d0] text-xs uppercase tracking-wider font-bold">Maximum loan term:</p>
                <p className="text-white text-sm sm:text-base font-semibold leading-relaxed mt-2">
                  92 days for first loan and 180 days for repeat loan
                </p>
              </div>
            </div>
          </div>

          {/* Kad Kanan: Example Calculation List Card */}
          <div className="md:col-span-8 bg-[#f8fafc] border border-slate-200/80 p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between space-y-6 shadow-xl text-slate-800">
            
            <div className="space-y-3">
              <span className="text-[#ff6f61] font-extrabold text-xs uppercase tracking-wider block">Example</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                The loan is calculated as follows
              </h3>
            </div>

            {/* List Row dengan Dotted Connector Line */}
            <div className="space-y-4 text-sm sm:text-base font-bold text-slate-700 pt-2">
              <div className="flex justify-between items-end">
                <span>Loan amount:</span>
                <span className="border-b border-dotted flex-grow mx-3 mb-1.5 border-slate-300"></span>
                <span className="text-slate-950 font-black">RM1000</span>
              </div>
              <div className="flex justify-between items-end">
                <span>Loan period:</span>
                <span className="border-b border-dotted flex-grow mx-3 mb-1.5 border-slate-300"></span>
                <span className="text-slate-950 font-black">92 days</span>
              </div>
              <div className="flex justify-between items-end">
                <span>Interest rate (18% / year):</span>
                <span className="border-b border-dotted flex-grow mx-3 mb-1.5 border-slate-300"></span>
                <span className="text-slate-950 font-black">RM45</span>
              </div>
              <div className="flex justify-between items-end">
                <span>Total payment:</span>
                <span className="border-b border-dotted flex-grow mx-3 mb-1.5 border-slate-300"></span>
                <span className="text-slate-950 font-black">RM1045</span>
              </div>
            </div>

            {/* Catatan Kepatuhan/Legal di bawah */}
            <div className="pt-6 border-t border-slate-200 space-y-2">
              <p className="text-[#1e5e3a] font-extrabold text-xs sm:text-sm">
                The 18% interest rate is applicable to all loans consulted
              </p>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                DuitSekarang do not require you to pay off the loan within 92 days.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SEKSYEN SYARAT KELAYAKAN */}
      <section id="kelayakan" className="relative z-10 bg-[#0B1425] border-t border-b border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <div className="text-xs font-black text-orange-400 uppercase tracking-widest">TAPISAN KELAYAKAN AWAM</div>
            <h2 className="text-3xl font-black text-white">Kriteria Utama Permohonan</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#121E36] rounded-2xl border border-slate-800 space-y-2">
              <div className="text-2xl">🇲🇾</div>
              <h4 className="font-extrabold text-white text-base">Warganegara</h4>
              <p className="text-xs text-slate-400">Terbuka eksklusif kepada Warganegara Malaysia sahaja yang memiliki MyKad sah.</p>
            </div>
            <div className="p-6 bg-[#121E36] rounded-2xl border border-slate-800 space-y-2">
              <div className="text-2xl">⏳</div>
              <h4 className="font-extrabold text-white text-base">Had Umur Layak</h4>
              <p className="text-xs text-slate-400">Berumur di antara 18 tahun sehingga 60 tahun pada waktu permohonan digital dibuat.</p>
            </div>
            <div className="p-6 bg-[#121E36] rounded-2xl border border-slate-800 space-y-2">
              <div className="text-2xl">💼</div>
              <h4 className="font-extrabold text-white text-base">Status Pekerjaan</h4>
              <p className="text-xs text-slate-400">Kakitangan swasta, penjawat awam, pekerja kilang, mahupun pemandu e-hailing layak memohon.</p>
            </div>
            <div className="p-6 bg-[#121E36] rounded-2xl border border-slate-800 space-y-2">
              <div className="text-2xl">🏦</div>
              <h4 className="font-extrabold text-white text-base">Akaun Bank Aktif</h4>
              <p className="text-xs text-slate-400">Mempunyai akaun bank simpanan peribadi yang aktif bagi tujuan pengeluaran dana automatik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WORKFLOW GRAPHIC */}
      <section id="workflow" className="bg-[#040814] border-b border-slate-900 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-black text-orange-400 uppercase tracking-widest">PROSES PEMBINAAN PROFIL KREDIT</div>
          <h2 className="text-3xl font-black text-white tracking-tight">Bagaimana Ia Berfungsi?</h2>
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="p-8 bg-gradient-to-b from-[#0E1B30] to-[#0A1424] rounded-3xl border border-slate-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-6xl font-black text-slate-800/20">01</div>
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center font-black border border-blue-500/20">📱</div>
              <h4 className="font-black text-white text-lg mt-6 mb-2">Hantar Data e-KYC</h4>
              <p className="text-xs text-slate-400">Isi borang digital selamat kami dengan melampirkan gambar MyKad dan bukti pendapatan bulanan anda.</p>
            </div>
            <div className="p-8 bg-gradient-to-b from-[#0E1B30] to-[#0A1424] rounded-3xl border border-slate-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-6xl font-black text-slate-800/20">02</div>
              <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center font-black border border-orange-500/20">⚙️</div>
              <h4 className="font-black text-white text-lg mt-6 mb-2">Saringan & Penilaian</h4>
              <p className="text-xs text-slate-400">Panel pentadbir bersama sistem menyemak gred kedudukan komitmen bulanan anda dalam masa 1 hingga 2 hari bekerja.</p>
            </div>
            <div className="p-8 bg-gradient-to-b from-[#0E1B30] to-[#0A1424] rounded-3xl border border-slate-800 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-6xl font-black text-slate-800/20">03</div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center font-black border border-emerald-500/20">🚀</div>
              <h4 className="font-black text-white text-lg mt-6 mb-2">Aktivasi Kematangan Had</h4>
              <p className="text-xs text-slate-400">Selepas pengaktifan kontrak fasa matang Tier 1 selesai, status anda disah bersih dan had utama RM50,000 akan terbuka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section id="faq" className="relative z-10 bg-[#0B1425] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <div className="text-xs font-black text-orange-400 uppercase tracking-widest">SOALAN LAZIM LENGKAP</div>
            <h2 className="text-3xl font-black text-white">Mempunyai Keraguan?</h2>
          </div>
          <div className="space-y-4">
            {dataFaq.map((item, index) => (
              <div key={index} className="bg-[#111F36] rounded-2xl border border-slate-800/60 overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="w-full text-left px-6 py-5 font-bold flex justify-between items-center text-white hover:bg-slate-800/40 transition-colors">
                  <span>{item.q}</span>
                  <span className="text-orange-400 text-xl font-black">{faqTerbuka === index ? '−' : '+'}</span>
                </button>
                {faqTerbuka === index && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4 bg-[#0E1A2F]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONI SECTION */}
      <section id="testimoni" className="relative z-10 bg-[#040814] border-t border-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="text-xs font-black text-orange-400 uppercase tracking-widest">BUKTI KEPUASAN PELANGGAN</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Kisah Kejayaan Pemohon Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="p-8 bg-[#0E1B30] rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
              <p className="text-slate-200 text-sm italic">"Mula-mula ragu juga dengan pelan aktivasi RM300 tu. Tapi selepas bayar balik tepat pada waktu dalam 15 hari, gred profil saya terus naik. Permohonan had besar RM20,000 saya lepas dalam fasa kedua!"</p>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold">AM</div>
                <div>
                  <div className="font-bold text-white text-sm">Ahmad Mazlan</div>
                  <div className="text-[11px] text-slate-500">Perniagaan Runcit, Cheras</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-[#0E1B30] rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
              <p className="text-slate-200 text-sm italic">"Servis terbaik untuk bina balik record kredit. Sistem 100% online, tak perlu penjamin atau isi kertas tebal-tebal macam bank biasa. Saringan selesai dalam 1-2 hari bekerja."</p>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">SN</div>
                <div>
                  <div className="font-bold text-white text-sm">Siti Nurhaliza</div>
                  <div className="text-[11px] text-slate-500">Eksekutif Jualan, Shah Alam</div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-[#0E1B30] rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6">
              <p className="text-slate-200 text-sm italic">"Pecahan kos sangat telus sejak dari slider mula-mula lagi. Tiada sebarang upfront deposit atau kos tersorok. Sangat disyorkan kepada sesiapa yang perlukan saringan profil digital."</p>
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">KV</div>
                <div>
                  <div className="font-bold text-white text-sm">Khairul V.</div>
                  <div className="text-[11px] text-slate-500">Pekerja Bebas, Kajang</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER KORPORAT MATANG GRED INDUSTRI */}
      <footer className="bg-[#050B14] border-t border-slate-900 text-slate-500 text-xs py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
            <strong>🚨 NOTA PENAFIAN PENTING & AMARAN SCAM:</strong> *duitsekarang.online* bukan merupakan institusi perbankan berlesen di bawah Akta Perkhidmatan Kewangan 2013 mahupun syarikat pinjaman wang di bawah Akta Pemberi Pinjam Wang 1951. Hak cipta terpelihara © 2026 duitsekarang.online.
          </p>
        </div>
      </footer>

    </div>
  );
}