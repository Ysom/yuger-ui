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
  prepend?: string | ReactElement;
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

  // 处理值为undefined或null时 受控与非受控切换的警告提示
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }
  // 处理同时存在默认值与传入值时 受控与非受控切换的警告提示
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="yuger-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
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
