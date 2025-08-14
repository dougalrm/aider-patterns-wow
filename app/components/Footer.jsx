'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');
  useEffect(() => setYear(String(new Date().getFullYear())), []);
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        <p>&copy; <span>{year}</span> Agile Articles. All rights reserved.</p>
      </div>
    </footer>
  );
}
