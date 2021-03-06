import classnames from 'classnames';
import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
    children?: ReactNode;
    error?: boolean;
    errorMessage?: string;
    initialCount?: number;
    itemProps?: {};
    name: string;
    showInlineError?: boolean;
    value: T[];
  }
>;

function List<T>({
  children,
  className,
  disabled,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  required,
  showInlineError,
  value,
  ...props
}: ListFieldProps<T>) {
  const listAddFieldProps = {
    name: `${name}.$`,
    initialCount,
    className: 'right floated',
  };
  return (
    <div
      className={classnames(
        'ui',
        className,
        { disabled },
        'grouped fitted fields list',
      )}
      {...filterDOMProps(props)}
    >
      {label && (
        <div className={classnames({ error, required }, 'field item')}>
          <label className="left floated">{label}</label>

          <ListAddField {...listAddFieldProps} />
        </div>
      )}

      {label && (
        <div className="ui fitted hidden clearing horizontal divider" />
      )}

      {!!(error && showInlineError) && (
        <div className="ui red basic label">{errorMessage}</div>
      )}

      {children
        ? value.map((item, index) =>
            Children.map(children as JSX.Element, child =>
              cloneElement(child, {
                key: index,
                label: null,
                name: joinName(
                  name,
                  child.props.name && child.props.name.replace('$', index),
                ),
              }),
            ),
          )
        : value.map((item, index) => (
            <ListItemField
              key={index}
              label={undefined}
              name={joinName(name, index)}
              {...itemProps}
            />
          ))}
    </div>
  );
}

export default connectField(List, {
  includeInChain: false,
});
