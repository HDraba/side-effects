import React, { PropsWithChildren } from 'react';

import classes from './Button.module.css';

type ButtonProps = PropsWithChildren<{
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}>;

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
