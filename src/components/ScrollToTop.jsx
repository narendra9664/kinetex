import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// On route change: jump to the #hash target if there is one (e.g. /#how from
// another page), otherwise to the top.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // The target section may render a frame later; retry briefly.
    let tries = 0;
    const id = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el || ++tries > 20) {
        clearInterval(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    return () => clearInterval(id);
  }, [pathname, hash]);

  return null;
}
