'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-YKN7GD4E4L', {
        page_path,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [pathname, searchParams]);

  return null;
}
