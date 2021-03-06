import React, { Children, HTMLProps, ReactNode, cloneElement } from 'react';
import classnames from 'classnames';
import { connectField, filterDOMProps, joinName, Override } from 'uniforms';

import ListItemField from './ListItemField';
import ListAddField from './ListAddField';

export type ListFieldProps<T> = Override<
  HTMLProps<HTMLDivElement>,
  {
    addIcon?: any;
    children?: ReactNode;
    error?: boolean;
    errorMessage?: string;
    initialCount?: number;
    itemProps?: {};
    name: string;
    removeIcon?: any;
    showInlineError?: boolean;
    value: T[];
  }
>;

function List<T>({
  addIcon,
  children,
  className,
  error,
  errorMessage,
  initialCount,
  itemProps,
  label,
  name,
  removeIcon,
  showInlineError,
  value,
  ...props
}: ListFieldProps<T>) {
  const listAddProps = {
    name: `${name}.$`,
    initialCount,
    addIcon,
  };
  return (
    <div
      className={classnames('card mb-3', className)}
      {...filterDOMProps(props)}
    >
      <div className="card-body">
        {label && (
          <div className="card-title">
            <label className="col-form-label">{label}&nbsp;</label>

            <ListAddField {...listAddProps} />

            {!!(error && showInlineError) && (
              <span className="text-danger">{errorMessage}</span>
            )}
          </div>
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
                  removeIcon,
                }),
              ),
            )
          : value.map((item, index) => (
              <ListItemField
                key={index}
                label={undefined}
                name={joinName(name, index)}
                removeIcon={removeIcon}
                {...itemProps}
              />
            ))}
      </div>
    </div>
  );
}

export default connectField(List, {
  includeInChain: false,
});
