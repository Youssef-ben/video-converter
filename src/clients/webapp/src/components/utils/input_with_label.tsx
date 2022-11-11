/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { InputError } from '../../types/input_error';

type InputWithLabelProps = {
  label?: string;
  placeholder?: string;

  value?: string;
  error?: InputError;
  setValue?: (value: string) => void;
};

function InputWithLabel({ placeholder, label, value, error, setValue }: InputWithLabelProps): JSX.Element {
  const id = `value-${Math.floor(Math.random() * 1000)}`;

  const onValueChange = !setValue
    ? undefined
    : (event: React.FormEvent<HTMLInputElement>): void => {
        if (setValue) setValue(event.currentTarget.value);
      };

  return <Form.Field id={id} control={Input} label={label} placeholder={placeholder} value={value} error={error} onChange={onValueChange} />;
}

export default InputWithLabel;
