import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import styles from './Spinner.scss';

const useStyles = makeStyles(() => ({
  root: {
    color: 'var(--fontColor)'
  }
}));

const Spinner = props => {
  const classes = useStyles(props);

  return (
    <div className={styles.wrapper}>
      <CircularProgress disableShrink className={classes.root} />
    </div>
  );
};

export default React.memo(Spinner);
