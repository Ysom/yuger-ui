import React, { InputHTMLAttributes, ReactElement, FC } from "react";
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm';

// 使用 Omit 忽略与 InputHTMLAttributes 已有、冲突的 size 属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
};

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;

  const cnames = classNames('yuger-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  });

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="yuger-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="yuger-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="yuger-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
