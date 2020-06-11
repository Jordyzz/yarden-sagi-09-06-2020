import React from 'react';
import classNames from 'classnames';

import styles from './LocationForecast.scss';
import { LocationForcastProps } from './LocationForecast.interface';
import { useSelector } from '@redux/useSelector';
import { degrees } from '@src/utils/degreesSymbol';
import ForecastBox from '@components/LocationForecast/ForecastBox';
import { weatherService } from '@core/WeatherService';
import Icon from '@components/Icon';
import Select from '@components/Select';
import { daysOfWeek } from '@src/utils/daysOfWeek';

const LocationForecast = (props: LocationForcastProps) => {
  const {
    id,
    name,
    forecast,
    selectOnChange,
    selectOnInputChanged,
    selectOptions,
    selectValue
  } = props;
  const tempType = useSelector(state => state.config.tempType);
  const favorites = useSelector(state => state.favorites);

  const todaysForecast = forecast[0];
  const iconId = todaysForecast.iconId < 10 ? `0${todaysForecast.iconId}` : todaysForecast.iconId;

  const todaysDate = () => {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sideSection}>
        <div className={styles.searchInput}>
          <Select
            onInputChanged={selectOnInputChanged}
            value={selectValue}
            onChange={selectOnChange}
            options={selectOptions}
            placeholder={
              <>
                <Icon type="search" />
                <div style={{ marginLeft: 10 }}>Search a location...</div>
              </>
            }
          />
        </div>
        <div className={classNames(styles.todaysWeather, 'ellipsis-overflow')}>
          <div className={styles.topSection}>
            <div className={styles.locationName}>{name}</div>
            <Icon
              type="favorite"
              className={
                favorites.map(f => f.id).includes(id)
                  ? styles.favoriteIconActive
                  : styles.favoriteIcon
              }
              onClick={() =>
                weatherService.toggleFavorites({
                  id,
                  name,
                  description: forecast[0].description,
                  temperature: forecast[0].temperature,
                  iconId: forecast[0].iconId
                })
              }
            />
          </div>
          <div
            className={styles.weatherIcon}
            style={{
              backgroundImage: `url(https://developer.accuweather.com/sites/default/files/${iconId}-s.png)`
            }}
          />
          <div className={styles.temperature}>
            {`${todaysForecast.temperature[tempType]}${degrees} ${tempType}`}
          </div>
          <div className={styles.date}>
            <div className={styles.day}>{`${daysOfWeek[new Date().getDay()]}, `}</div>
            <div className={styles.time}>{todaysDate()}</div>
          </div>
          <div className={styles.todaysDescription}>{todaysForecast.description}</div>
        </div>
      </div>
      <div className={styles.forcast}>
        {forecast.slice(1).map(day => (
          <ForecastBox key={day.date} forecast={day} />
        ))}
      </div>
    </div>
  );
};

export default LocationForecast;
