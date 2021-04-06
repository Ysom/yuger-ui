import React from 'react'
import classnames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  btnType?: ButtonType;
  size?: ButtonSize;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<BaseButtonProps> = props => {
  const {
    btnType,
    size,
    href,
    disabled,
    children
  } = props

  const classes = classnames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={classes}
        href={href}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false
}

export default Button