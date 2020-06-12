import React from 'react';
import classNames from 'classnames';

import styles from './AppBar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { menuItems } from './menuItems';
import ConfigBar from './ConfigBar';

const AppBar = () => {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Herolo Weather App</div>
      <div className={styles.navigation}>
        <ConfigBar />
        {menuItems.map(item => (
          <NavLink
            key={item.label}
            to={item.route}
            className={classNames(
              styles.navLink,
              location.pathname.includes(item.route) && styles.activeLink
            )}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AppBar;
