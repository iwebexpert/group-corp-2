import React from 'react';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import './TextInput.css';

type TextInputType = {
  label: string;
  modifiers?: string;
  name?: string;
  value: string | number;
  onChange: any;
  onKeyDown?: any;
};

export const TextInput: React.FC<TextInputType> = ({ label, modifiers, name, value, onChange, onKeyDown }) => {
  return(<TextField label={label}
                    className={classnames('text-input', modifiers)}
                    name={name}
                    margin="dense"
                    variant="outlined"
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
  />);
}