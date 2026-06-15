import { useEffect, useState } from 'react';
import { parseHash } from '../utils/routing';

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#landing');
    }

    const syncRoute = () => setRoute(parseHash());
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  return route;
}
