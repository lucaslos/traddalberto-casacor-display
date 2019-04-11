import { useState, useRef, useEffect } from 'react';
/**
 * Returns a throttled value
 *
 * @param value value to be debounced
 * @param limit limit in ms
 */
export function useThrottle<T>(value: T, limit: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);
  return throttledValue;
}
