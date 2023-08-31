import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/"]
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: String(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabaseKey: String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }
  )

  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    console.log(session);
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}
