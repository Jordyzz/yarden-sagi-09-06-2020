import React, { useState, useEffect, useCallback } from 'react';

import styles from './MainPage.scss';
import { weatherService } from '@core/WeatherService';
import LocationForecast from '@components/LocationForecast';
import { useSelector } from '@redux/useSelector';

function MainPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [options, setOptions] = useState([]);
  const currentLocation = useSelector(state => state.currentLocation);

  useEffect(() => {
    selectedLocation &&
      weatherService.getLocationForcast({
        key: selectedLocation.value.id,
        name: selectedLocation.value.name
      });
  }, [selectedLocation]);

  useEffect(() => {
    !currentLocation && weatherService.getUserGeoLocation();
  }, []);

  useEffect(() => {
    currentLocation &&
      !currentLocation.forecast &&
      weatherService.getLocationForcast({
        key: currentLocation.id,
        name: currentLocation.name
      });
  }, [currentLocation]);

  const onInputChanged = useCallback(
    input => {
      weatherService.getLocationSuggestions(input).then(
        res =>
          res &&
          setOptions(
            res.map(o => ({
              label: o.LocalizedName,
              value: { id: o.Key, name: o.LocalizedName }
            }))
          )
      );
    },
    [weatherService, setOptions]
  );

  return (
    <div className={styles.wrapper}>
      {currentLocation && currentLocation.forecast && (
        <LocationForecast
          {...currentLocation}
          selectOnInputChanged={onInputChanged}
          selectValue={selectedLocation}
          selectOnChange={setSelectedLocation}
          selectOptions={options}
        />
      )}
    </div>
  );
}

export default MainPage;
