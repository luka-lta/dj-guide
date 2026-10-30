import { useEffect, useState } from 'react';
import { formatRewardRemaining } from './rewardTime';

/** Refresh interval of the visible countdown, in milliseconds. */
const COUNTDOWN_TICK_MS = 1000;

/** Returns the remaining ad-free time as `m:ss`, or `null` without a running reward. */
export function useRewardCountdown(rewardEnd: number | null): string | null {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (rewardEnd === null) return;
    setNowMs(Date.now());
    const timer = setInterval(() => setNowMs(Date.now()), COUNTDOWN_TICK_MS);
    return () => clearInterval(timer);
  }, [rewardEnd]);

  if (rewardEnd === null) return null;
  return formatRewardRemaining(rewardEnd - nowMs);
}
