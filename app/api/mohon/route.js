import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Vercel akan automatik baca dari Environment Variables yang kau masukkan semalam
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qypekzgxqvpzfdbgwjqf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cGVremd4cXB2emZkYmd3anFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODEyNjAsImV4cCI6MjA5ODA1NzI2MH0.WShQ9rEs6LjE1N3tQBHprhzGGAIVceZQuet7VNf-A9A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const body = await request.json();

    // Saja buat semakan log untuk kau tengok dekat Vercel tab Logs nanti
    console.log("Menerima data permohonan untuk:", body.nama_penuh);

    const { data, error } = await supabase
      .from('permohonan_pinjaman')
      .insert([
        {
          nama_penuh: body.nama_penuh || null,
          no_ic: body.no_ic || null,
          no_phone: body.no_phone || null,
          jawatan: body.jawatan || null,
          pendapatan: body.pendapatan || 0,
          nama_syarikat: body.nama_syarikat || null,
          alamat_syarikat: body.alamat_syarikat || null,
          phone_syarikat: body.phone_syarikat || null,
          tempoh_bekerja: body.tempoh_bekerja || null,
          nama_bank: body.nama_bank || null,
          no_akaun_bank: body.no_akaun_bank || null,
          rujukan1_nama: body.rujukan1_nama || null,
          rujukan1_hubungan: body.rujukan1_hubungan || null,
          rujukan1_phone: body.rujukan1_phone || null,
          rujukan2_nama: body.rujukan2_nama || null,
          rujukan2_hubungan: body.rujukan2_hubungan || null,
          rujukan2_phone: body.rujukan2_phone || null,
          // Diubah kepada body.selfie_base64 supaya sepadan dengan frontend page.tsx kau!
          selfie_base64: body.selfie_base64 || null  
        }
      ]);

    if (error) {
      console.error("Supabase Database Error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Data berjaya dimasukkan ke Supabase cloud!' });
  } catch (err) {
    console.error("Server Catch Error:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
