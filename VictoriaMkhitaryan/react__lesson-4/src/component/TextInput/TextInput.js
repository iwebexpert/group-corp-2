import React from 'react';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import './TextInput.css';

export default function TextInput(props) {
  return(<TextField label={props.label}
                    className={classnames('text-input', props.modifiers)}
                    name={props.name}
                    margin="dense"
                    variant="outlined"
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
  />);
}