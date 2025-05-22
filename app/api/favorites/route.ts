import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const favs = cookieStore.get('favorites')?.value;
  return NextResponse.json(favs ? JSON.parse(favs) : []);
}

export async function POST(req: Request) {
  const body = await req.json();

  // Očekuje se: { id, name, image, type }
  if (!body.id || !body.type) {
    return NextResponse.json({ error: 'Missing id or type' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const favs = cookieStore.get('favorites')?.value;
  const parsed = favs ? JSON.parse(favs) : [];

  const alreadyExists = parsed.find((f: any) => f.id === body.id && f.type === body.type);

  if (!alreadyExists) {
    parsed.push(body);
  }

  cookieStore.set('favorites', JSON.stringify(parsed));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id || !body.type) {
    return NextResponse.json({ error: 'Missing id or type' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const favs = cookieStore.get('favorites')?.value;
  const parsed = favs ? JSON.parse(favs) : [];

  const updated = parsed.filter((f: any) => !(f.id === body.id && f.type === body.type));
  cookieStore.set('favorites', JSON.stringify(updated));

  return NextResponse.json({ success: true });
}
