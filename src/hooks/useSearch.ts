import { useEffect, useState } from 'react';

export function useSearch(initialValue = ''): [string, string, (text: string) => void] {
  const [raw, setRaw] = useState(initialValue);
  const [debounced, setDebounced] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(raw), 150);
    return () => clearTimeout(timer);
  }, [raw]);

  return [raw, debounced, setRaw];
}
