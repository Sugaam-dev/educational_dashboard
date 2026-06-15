import { useState } from 'react';

const SESSION_KEY = 'uni_gov_user';

export function useSessionUser() {
  const [user, setUserState] = useState(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  function setUser(nextUser) {
    if (nextUser) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
    setUserState(nextUser);
  }

  return [user, setUser];
}
