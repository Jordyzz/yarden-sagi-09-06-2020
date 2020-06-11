import React from 'react';
import classNames from 'classnames';

import styles from './Button.scss';
import { ButtonProps } from './Button.interface';

const Button = (props: ButtonProps) => {
  const { children, onClick, className } = props;
  return (
    <div className={classNames(styles.wrapper, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
