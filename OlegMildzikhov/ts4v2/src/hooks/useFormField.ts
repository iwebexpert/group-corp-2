import React, {useState, useCallback} from 'react';

export const useFormField = (initialValue: string = '') => {
    const [value, setValue] = useState<string>(initialValue);
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setValue(event.target.value), []);
    const clearValue = useCallback(() => {setValue('');}, []);
    return {value, onChange, clearValue};
};