import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qypekzgxqvpzfdbgwjqf.supabase.co';
// Guna Anon Key atau Service Role Key kau di sini (Selamat sebab run di sebelah server hosting)
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cGVremd4cXB2emZkYmd3anFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODEyNjAsImV4cCI6MjA5ODA1NzI2MH0.WShQ9rEs6LjE1N3tQBHprhzGGAIVceZQuet7VNf-A9A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('permohonan_pinjaman')
      .insert([
        {
          nama_penuh: body.nama_penuh,
          no_ic: body.no_ic,
          no_phone: body.no_phone,
          jawatan: body.jawatan,
          pendapatan: body.pendapatan,
          nama_syarikat: body.nama_syarikat,
          alamat_syarikat: body.alamat_syarikat,
          phone_syarikat: body.phone_syarikat,
          tempoh_bekerja: body.tempoh_bekerja,
          nama_bank: body.nama_bank,
          no_akaun_bank: body.no_akaun_bank,
          rujukan1_nama: body.rujukan1_nama,
          rujukan1_hubungan: body.rujukan1_hubungan,
          rujukan1_phone: body.rujukan1_phone,
          rujukan2_nama: body.rujukan2_nama,
          rujukan2_hubungan: body.rujukan2_hubungan,
          rujukan2_phone: body.rujukan2_phone,
          selfie_base64: body.selfie_file_name 
        }
      ]);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Data berjaya dimasukkan ke Supabase cloud!' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}