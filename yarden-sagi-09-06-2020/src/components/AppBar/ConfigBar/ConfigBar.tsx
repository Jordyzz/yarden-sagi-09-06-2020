import React from 'react';

import styles from './ConfigBar.scss';
import { Switch } from '@material-ui/core';
import { useSelector } from '@redux/useSelector';
import { degrees } from '@src/utils/degreesSymbol';
import { themeService } from '@core/ThemeService';
import { weatherService } from '@core/WeatherService';
import Button from './Button';
import Icon from '@components/Icon';

const ConfigBar = () => {
  const { tempType, theme } = useSelector(state => state.config);

  return (
    <div className={styles.wrapper}>
      <Button onClick={() => themeService.toggleTheme()} className={styles.margin}>
        <Icon type={theme !== 'light' ? 'sun' : 'moon'} className={styles.icon} />
      </Button>
      <Button onClick={() => weatherService.toggleTemperatureType(tempType)}>
        {tempType !== 'c' ? `C${degrees}` : `F${degrees}`}
      </Button>
    </div>
  );
};

export default ConfigBar;
