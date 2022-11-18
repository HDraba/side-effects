import React, { useEffect, useReducer, useState, Reducer, useCallback, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

type EmailState = {
  value: string;
  isValid: boolean | null;
};

type EmailAction = {
  type: 'USER_INPUT' | 'INPUT_BLUR';
  val?: string;
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

type PasswordState = {
  value: string;
  isValid: boolean | null;
};

type PasswordAction = {
  type: 'USER_INPUT' | 'INPUT_BLUR';
  val?: string;
};

const passwordReducer = (state: PasswordState, action: PasswordAction) => {
  const { type, val } = action;
  const { value, isValid } = state;

  if (type === 'USER_INPUT') {
    return { value: val!, isValid: val!.trim().length > 6 };
  }
  if (type === 'INPUT_BLUR') {
    return { value: value, isValid: value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const initialState: EmailState = {
    value: '',
    isValid: null,
  };
  const [emailState, dispatchEmail] = useReducer<
    Reducer<EmailState, EmailAction>
  >(emailReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer<
    Reducer<PasswordState, PasswordAction>
  >(passwordReducer, initialState);

  const ctx = useContext(AuthContext)

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailState.isValid! && passwordState.isValid!);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.currentTarget.value });

    // setFormIsValid(
      // event.currentTarget.value.includes('@') && passwordState.isValid!
    // );
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.currentTarget.value });
    setFormIsValid(
      emailState.isValid! && event.currentTarget.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    ctx!.onLogin(emailState.value, passwordState.value);
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
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
