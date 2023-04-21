import { useState, useRef, useEffect, useCallback } from "react";

type CallbackFunction<T> = (arg: T) => void;

interface State<T> {
  value: T;
  callback?: CallbackFunction<T>;
}

function useStateCallback<T>(
  initialState: T
): [
  T,
  (newValue: T | ((prevValue: T) => T), callback?: CallbackFunction<T>) => void
] {
  const [state, setState] = useState<State<T>>({ value: initialState });

  const callbackRef = useRef<CallbackFunction<T>>();

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state.value);
      callbackRef.current = undefined;
    }
  }, [state.value]);

  const setStateCallback = useCallback(
    (newValue: T | ((prevValue: T) => T), callback?: CallbackFunction<T>) => {
      if (callback) {
        callbackRef.current = callback;
      }

      setState((prevState: State<T>) => {
        const value =
          typeof newValue === "function"
            ? (newValue as (prevValue: T) => T)(prevState.value)
            : newValue;
        return { value, callback };
      });
    },
    []
  );

  return [state.value, setStateCallback];
}

export default useStateCallback;
