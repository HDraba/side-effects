import React, { useEffect, useReducer, useState, Reducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

enum TypeEnum {
  USER_INPUT = 'USER_INPUT',
  INPUT_BLUR = 'INPUT_BLUR',
}

type EmailAction = {
  type: 'USER_INPUT' | 'INPUT_BLUR';
  val?: string;
};

type EmailState = {
  value: string;
  isValid: boolean | null;
};

type LoginProps = {
  onLogin: (enteredEmail: string, enteredPassword: string) => void;
};

const emailReducer = (state: EmailState, action: EmailAction): EmailState => {
  const { type, val } = action;
  const { value, isValid } = state;

  if (type === 'USER_INPUT') {
    return { value: val!, isValid: val!.includes('@') };
  }
  if (type === 'INPUT_BLUR') {
    return { value: value, isValid: value.includes('@') };
  }

  return { value: '', isValid: false };
};

const Login = (props: LoginProps) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState<boolean>();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
  const [formIsValid, setFormIsValid] = useState(false);

  const initialState: EmailState = {
    value: '',
    isValid: null,
  };
  const [emailState, dispatchEmail] = useReducer<
    Reducer<EmailState, EmailAction>
  >(emailReducer, initialState);

  // useEffect(() => {
  //   const timeoutIdentifier = setTimeout(() => {
  //     console.log('validity');
  //     setFormIsValid(
  // enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log('cleanup');
  //     clearTimeout(timeoutIdentifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.currentTarget.value });

    setFormIsValid(
      event.currentTarget.value.includes('@') &&
        enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setEnteredPassword(event.currentTarget.value);
    setFormIsValid(
      emailState.isValid! && event.currentTarget.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
