import React from 'react';

import styles from './FavoritesPage.scss';
import { useSelector } from '@src/redux/useSelector';
import FavoriteBox from '@components/FavoriteBox';

function FavoritesPage() {
  const favorites = useSelector(state => state.favorites);
  return (
    <div className={styles.wrapper}>
      {favorites ? (
        <div className={styles.favoritesList}>
          {favorites.map(location => (
            <FavoriteBox key={location.id} {...location} />
          ))}
        </div>
      ) : (
        <div className={styles.noFavorites}>No favorites yet...</div>
      )}
    </div>
  );
}

export default FavoritesPage;
