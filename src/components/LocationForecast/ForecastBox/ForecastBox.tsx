import React from 'react';

import { ForecastBoxProps } from './ForecastBox.interface';
import styles from './ForecastBox.scss';
import { useSelector } from '@redux/useSelector';
import { degrees } from '@src/utils/degreesSymbol';
import { daysOfWeek } from '@src/utils/daysOfWeek';

const ForecastBox = (props: ForecastBoxProps) => {
  const { forecast } = props;
  const tempType = useSelector(state => state.config.tempType);

  const iconId = forecast.iconId < 10 ? `0${forecast.iconId}` : forecast.iconId;

  return (
    <div className={styles.wrapper}>
      {forecast.date && (
        <p className={styles.day}>{daysOfWeek[new Date(forecast.date).getDay()]}</p>
      )}
      <div
        className={styles.weatherIcon}
        style={{
          backgroundImage: `url(https://developer.accuweather.com/sites/default/files/${iconId}-s.png)`
        }}
      />
      <p className={styles.temp}>{`${forecast.temperature[tempType]}${degrees} ${tempType}`}</p>
      <p className={styles.description}>{forecast.description}</p>
    </div>
  );
};

export default ForecastBox;
