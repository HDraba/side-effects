import { LegacyRef, useEffect, useRef } from 'react';
import classes from './Input.module.css';

type InputProps = {
  id: string;
  label: string;
  type: string;
  isValid: boolean | null;
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current!.focus();
  }, []);
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
