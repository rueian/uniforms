import classnames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import React, { HTMLProps } from 'react';
import { filterDOMProps, joinName, Override, useField } from 'uniforms';

export type ListAddFieldProps<T> = Override<
  HTMLProps<HTMLSpanElement>,
  {
    className?: string;
    name: string;
    parent?: any;
    value?: T;
  }
>;

export default function ListAdd<T>(rawProps: ListAddFieldProps<T>) {
  const props = useField<ListAddFieldProps<T>, T>(rawProps.name, rawProps, {
    initialValue: false,
  })[0];

  const parentName = joinName(joinName(null, props.name).slice(0, -1));
  const parent = useField<{ maxCount?: number }, T[]>(parentName, {})[0];
  if (rawProps.parent) Object.assign(parent, rawProps.parent);

  const limitNotReached =
    !props.disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <i
      {...filterDOMProps(props)}
      className={classnames(
        'ui',
        rawProps.className,
        limitNotReached ? 'link' : 'disabled',
        'fitted add icon',
      )}
      onClick={() =>
        limitNotReached &&
        parent.onChange(parent.value!.concat([cloneDeep(props.value!)]))
      }
    />
  );
}
