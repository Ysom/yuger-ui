import React, { InputHTMLAttributes, ReactElement, FC } from "react";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';

// 使用 Omit 忽略与 InputHTMLAttributes 已有、冲突的 size 属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepand?: string | ReactElement;
  append?: string | ReactElement;
};

export const Input: FC<InputProps> = (props) => {};
