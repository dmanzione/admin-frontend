import { useState } from "react";

export default function useLocalStorage(key: string) {
  const _key = localStorage.getItem(key);
  const [value, setValueState] = useState<string | null>((_key === "null" ? null : _key));

  const setValue = (value: string) => {
    localStorage.setItem(key, value);
    setValueState(value);
  };

  return [value, setValue];
}
