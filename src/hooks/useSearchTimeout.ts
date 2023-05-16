import { useEffect, useRef } from "react";

/** Runs a callback after a certain delay whenever the trigger value is changed. Resets timer if trigger changes before the timer expires.
 *
 * @param {*} trigger value to watch that triggers this effect
 * @param {*} callback callback to run if timeout expires
 * @param {*} delay timeout length
 */

export default function useSearchTimeout(
  trigger: any,
  callback: () => void,
  delay: number
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    // does not run on first render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // stores timeout ID
    let timeoutId: ReturnType<typeof setTimeout>;
    // promise that resolves when timeout expires
    const searchTimeout = new Promise<void>((res: Function) => {
      timeoutId = setTimeout(() => {
        res();
      }, delay);
    });

    // runs callback when timeout expires
    searchTimeout.then(callback);

    // clears timeout if search value changes within the timeout lifespan
    return () => {
      clearTimeout(timeoutId);
    };
  }, [trigger]);
}
