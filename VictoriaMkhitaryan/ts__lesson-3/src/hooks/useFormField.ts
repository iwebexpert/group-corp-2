import React, { useState, useCallback, TextareaHTMLAttributes } from 'react';

export const useFormField = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value), []);
  const clearValue = useCallback(() => setValue(''), []);
  return { value, onChange, clearValue };
}