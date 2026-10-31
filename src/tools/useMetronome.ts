import { useCallback, useEffect, useRef, useState } from 'react';
import { toBeatIntervalMs } from './phrase';

/** Runs `onTick` on every beat. Each beat is timed from the previous target, so timer delays do not add up. */
export function useMetronome(bpm: number, onTick: (tick: number) => void) {
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bpmRef = useRef(bpm);
  const onTickRef = useRef(onTick);
  bpmRef.current = bpm;
  onTickRef.current = onTick;

  const stop = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    let tick = 0;
    let target = Date.now();

    function run() {
      onTickRef.current(tick);
      tick += 1;
      target += toBeatIntervalMs(bpmRef.current);
      timer.current = setTimeout(run, Math.max(0, target - Date.now()));
    }

    setIsRunning(true);
    run();
  }, []);

  useEffect(() => stop, [stop]);

  return { isRunning, start, stop };
}
