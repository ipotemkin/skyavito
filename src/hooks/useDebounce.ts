import { useState, useEffect } from 'react';

export default function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)

    return () => {
      clearTimeout(handler);
    }
  }, [value])

  return debouncedValue
}

export const useDebounceLazy = () => {
  const [debouncedValue, setDebouncedValue] = useState('')

  // useEffect(() => {
  //   const handler = setTimeout(() => setDebouncedValue(value), delay)

  //   return () => clearTimeout(handler)
  // }, [value])

  const debounce = (value: string, delay = 300) => {
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay)
  
      return () => clearTimeout(handler)
    }, [value])
    
    return debouncedValue
  }

  return debounce
}

