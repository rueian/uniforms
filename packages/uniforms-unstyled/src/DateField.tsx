import React, { HTMLProps, Ref } from 'react';
import { connectField, filterDOMProps, Override } from 'uniforms';

const DateConstructor = (typeof global === 'object' ? global : window).Date;
const dateFormat = (value?: Date) => value?.toISOString().slice(0, -8);

export type DateFieldProps = Override<
  HTMLProps<HTMLDivElement>,
  {
    disabled: boolean;
    id: string;
    inputRef?: Ref<HTMLInputElement>;
    label: string;
    max?: Date;
    min?: Date;
    name: string;
    onChange(value?: Date): void;
    placeholder: string;
    value?: Date;
  }
>;

function Date({
  disabled,
  id,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  placeholder,
  value,
  ...props
}: DateFieldProps) {
  return (
    <div {...filterDOMProps(props)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        disabled={disabled}
        id={id}
        max={dateFormat(max)}
        min={dateFormat(min)}
        name={name}
        onChange={event => {
          const date = new DateConstructor(event.target.valueAsNumber);
          if (date.getFullYear() < 10000) {
            onChange(date);
          } else if (isNaN(event.target.valueAsNumber)) {
            onChange(undefined);
          }
        }}
        placeholder={placeholder}
        ref={inputRef}
        type="datetime-local"
        value={dateFormat(value) ?? ''}
      />
    </div>
  );
}

export default connectField(Date);
