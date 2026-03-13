import { NextResponse } from "next/server";

export async function GET() {
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    supabaseConfigured
  });
}

