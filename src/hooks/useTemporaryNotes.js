import { useState } from 'react';

const NOTE_KEY = 'uni_gov_draft_notes';
const NOTE_TTL_MS = 10 * 60 * 1000;

export function useTemporaryNotes() {
  const [notes, setNotesState] = useState(() => {
    const saved = localStorage.getItem(NOTE_KEY);
    if (!saved) return '';

    const parsed = JSON.parse(saved);
    if (Date.now() - parsed.savedAt > NOTE_TTL_MS) {
      localStorage.removeItem(NOTE_KEY);
      return '';
    }
    return parsed.text;
  });

  function setNotes(nextText) {
    setNotesState(nextText);
    localStorage.setItem(NOTE_KEY, JSON.stringify({ text: nextText, savedAt: Date.now() }));
  }

  return [notes, setNotes];
}
