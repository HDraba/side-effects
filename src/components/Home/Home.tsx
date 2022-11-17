import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

type HomeProps = {
  home?: string,
  onLogout: () => void
}

const Home = (props: HomeProps) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
