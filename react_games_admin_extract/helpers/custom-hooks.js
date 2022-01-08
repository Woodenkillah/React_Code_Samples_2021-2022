import { useState, useEffect, useReducer, useCallback, useRef } from "react";
import { isFunction } from "helpers/native-functions";

export const useToggle = initValue => {
  return useReducer(state => !state, initValue || false);
};


export const useStateAsync = (asyncFunc, initState, immediate=true) => {
  const [state, setState] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(() => {
    if (isLoading) {
      console.error("Request is in progress. Please wait");
      return;
    }

    setIsLoading(true);
    return asyncFunc()
      .then(r => setState(r))
      .finally(() => setIsLoading(false));

  }, [asyncFunc, isLoading]);

  useEffect(() => {
    if (asyncFunc && immediate) {
      setIsLoading(true);
      asyncFunc()
        .then(r => setState(r))
        .finally(() => setIsLoading(false));
    }
  }, [asyncFunc, immediate]);

  return { request, isLoading, state, setState };
};


export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {

    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }

      const evaluated = isFunction(initialValue)
      ? initialValue() 
      : initialValue

      window.localStorage.setItem(key, JSON.stringify(evaluated));
      return evaluated;
    }
    catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = newValue => {

    try {
      const evaluated = isFunction(newValue)
      ? newValue(storedValue) 
      : newValue

      window.localStorage.setItem(key, JSON.stringify(evaluated));
      setStoredValue(evaluated);
    }
    catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};


export const useOutsideClick = (refs, callback) => {
  useEffect(() => {
    const handleOutsideClick = evt => {
      if (refs.length && refs.every(({current}) => current && !current.contains(evt.target))) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);

  }, [refs, callback]);
};


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {

    const timeoutHandle = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutHandle);
    }

  }, [value, delay]);

  return debouncedValue;
};


export const useEventListener = (eventName, handler, element=window) => {

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;

    if (!isSupported) {
      throw new Error("Event listener is not supported by " + element);
    }

    const eventListener = evt => {
      if (savedHandler.current) {
        savedHandler.current(evt);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [element, eventName]);
};