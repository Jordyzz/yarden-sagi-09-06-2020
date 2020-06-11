import React from 'react';

import Spinner from '@components/Spinner';
import { useSelector } from '@redux/useSelector';
import styles from './GlobalBusyIndicator.scss';

const hiddenS = { display: 'none' };

const GlobalBusyIndicator = () => {
  const busyCounter = useSelector(state => state.config.busyCounter);

  return (
    <div className={styles.wrapper} style={busyCounter > 0 ? undefined : hiddenS}>
      <div className={styles.mask} />
      <Spinner />
    </div>
  );
};

export default React.memo(GlobalBusyIndicator);
