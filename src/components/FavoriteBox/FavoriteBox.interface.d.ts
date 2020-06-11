import { Temperature } from '@components/LocationForecast/LocationForecast.interface';

export interface FavoriteBoxProps {
  id: string;
  name: string;
  description: string;
  temperature: Temperature;
  iconId?: number;
}
