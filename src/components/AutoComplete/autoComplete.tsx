import React, { FC, useState, ChangeEvent } from 'react';
import Input, { InputProps } from '../Input/input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
};

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="yuger-auto-complete">
      <Input
        value={value}
        onChange={handleChange}
        { ...restProps }
      />
    </div>
  );
};
