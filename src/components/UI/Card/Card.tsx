import React, { PropsWithChildren } from 'react';

import classes from './Card.module.css';

type CardProps = PropsWithChildren<{
  className: string
}>

const Card = (props: CardProps) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;
