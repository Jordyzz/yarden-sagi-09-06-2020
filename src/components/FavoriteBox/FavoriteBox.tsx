import React from 'react';
import classNames from 'classnames';

import styles from './FavoriteBox.scss';
import { FavoriteBoxProps } from './FavoriteBox.interface';
import { useSelector } from '@src/redux/useSelector';
import { degrees } from '@src/utils/degreesSymbol';
import { weatherService } from '@core/WeatherService';
import history from '@core/history';

const FavoriteBox = (props: FavoriteBoxProps) => {
  const { id, name, description, temperature, iconId } = props;
  const tempType = useSelector(state => state.config.tempType);

  const iconIdString = iconId < 10 ? `0${iconId}` : iconId;

  const getForecastForFavorite = () => {
    weatherService.getLocationForcast({ key: id, name });
    history.push('/home');
  };

  return (
    <div className={styles.wrapper} onClick={() => getForecastForFavorite()}>
      <div
        className={classNames(styles.city, 'ellipsis-overflow')}
        title={`${name}, ${description}`}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.temp}>{`${temperature[tempType]}${degrees} ${tempType}`}</div>
      </div>
      <div className={styles.iconContainer}>
        <div
          className={styles.weatherIcon}
          style={{
            backgroundImage: `url(https://developer.accuweather.com/sites/default/files/${iconIdString}-s.png)`
          }}
        />
      </div>
    </div>
  );
};

export default FavoriteBox;
