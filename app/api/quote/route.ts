import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({error:"Invalid request"},{status:400}); }
  if (body.website) return NextResponse.json({ok:true});
  const fields = ["name","email","phone","contactMethod","size","project","address"] as const;
  for (const field of fields) if (typeof body[field]!=="string" || !(body[field] as string).trim() || (body[field] as string).length>500) return NextResponse.json({error:`Invalid ${field}`},{status:400});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email as string) || body.consent!==true || !["SMS","Call","Email"].includes(body.contactMethod as string) || !["8 Yards","14 Yards","20 Yards","24 Yards","30 Yards","40 Yards","Multiple Dumpsters"].includes(body.size as string)) return NextResponse.json({error:"Invalid quote details"},{status:400});
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.json({error:"Quote service unavailable"},{status:503});
  const response = await fetch(`${url}/rest/v1/titan_quote_requests`, {method:"POST",headers:{"Content-Type":"application/json",apikey:key,Prefer:"return=minimal"},body:JSON.stringify({name:(body.name as string).trim(),email:(body.email as string).trim().toLowerCase(),phone:(body.phone as string).trim(),contact_method:body.contactMethod,dumpster_size:body.size,project_details:(body.project as string).trim(),delivery_address:(body.address as string).trim(),consent:true,source:"website"}),cache:"no-store"});
  if (!response.ok) return NextResponse.json({error:"Quote service unavailable"},{status:502});
  return NextResponse.json({ok:true});
}
