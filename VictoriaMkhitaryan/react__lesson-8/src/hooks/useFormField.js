import React, { useState, useCallback } from 'react';

export const useFormField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(e => setValue(e.target.value), []);
  const clearValue = useCallback(() => setValue(''));
  return { value, onChange, clearValue };
}