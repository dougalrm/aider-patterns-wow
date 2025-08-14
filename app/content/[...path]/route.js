import { NextResponse } from 'next/server';
import { resolveContentDir } from '../../../lib/contentLoader';
import fs from 'fs/promises';
import path from 'path';

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    case '.ico': return 'image/x-icon';
    case '.txt': return 'text/plain; charset=utf-8';
    case '.md': return 'text/markdown; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.pdf': return 'application/pdf';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

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
    const mime = contentType(filePath);
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
