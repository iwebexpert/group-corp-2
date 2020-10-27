import React, { useState, useCallback } from "react";

export const ChatListFormData = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback((event) => setValue(event.target.value), []);
  const clearValue = useCallback(() => setValue(""));
  return { value, onChange, clearValue };
};
