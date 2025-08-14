import { NextResponse } from 'next/server';
import { resolveContentDir } from '../../../lib/contentLoader';
import { lookup as mimeLookup } from 'mime-types';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req, { params }) {
  try {
    const parts = Array.isArray(params.path) ? params.path : [params.path];
    const CONTENT_DIR = resolveContentDir();
    const filePath = path.resolve(CONTENT_DIR, ...parts);

    // Prevent path traversal outside CONTENT_DIR
    const rel = path.relative(CONTENT_DIR, filePath);
    if (rel.startsWith('..')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await fs.readFile(filePath);
    const mime = mimeLookup(filePath) || 'application/octet-stream';
    return new NextResponse(data, {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (e) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
