export interface LocationForcastProps {
  id: string;
  name: string;
  forecast: Array<Forecast>;
  selectOnInputChanged: (input) => void;
  selectOnChange: (value) => void;
  selectValue: any;
  selectOptions: any;
}

export interface Forecast {
  date?: string;
  description: string;
  temperature: Temperature;
  iconId?: number;
}

export interface Temperature {
  f: number;
  c: number;
}
