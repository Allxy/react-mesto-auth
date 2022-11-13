import { useRef, useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value)
    setError(inputRef.current?.validationMessage)
  }

  const resetInput = (value) => {
    setValue(value)
    setError(null)
  }

  return [value, onChange, resetInput, inputRef, error]
}