import { useState } from 'react';

export function useActiveChip(initial: string | null = null): [string | null, (chip: string | null) => void] {
  const [active, setActive] = useState<string | null>(initial);

  function select(chip: string | null) {
    setActive(prev => (prev === chip ? null : chip));
  }

  return [active, select];
}
