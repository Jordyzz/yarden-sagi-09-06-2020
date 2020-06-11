import { getState, dispatch } from '@redux/store';
import { setTheme } from '@src/redux/config';

class ThemeService {
  private themes = {
    light: {
      backgroundColor: '#f6f6f8',
      backgroundSecondaryColor: '#fff',
      fontColor: '#000',
      fontSecondaryColor: '#d3d3d3',
      selectedFontColor: '#ffc53d',
      buttonColor: '#000',
      borderColor: '#000'
    },
    dark: {
      backgroundColor: '#1c1c21',
      backgroundSecondaryColor: '#000',
      fontColor: '#fff',
      fontSecondaryColor: '#d3d3d3',
      selectedFontColor: '#ffc53d',
      buttonColor: '#fff',
      borderColor: '#fff'
    }
  };
  private vars = {
    backgroundColor: undefined,
    backgroundSecondaryColor: undefined,
    fontColor: undefined,
    selectedFontColor: undefined,
    borderColor: undefined
  };

  init(type?: string) {
    Object.assign(this.vars, type ? this.themes[type] : this.themes.light);
    for (let key in this.vars) {
      this.setVariable(key, this.vars[key]);
    }
  }

  toggleTheme() {
    const activeTheme = getState().config.theme;
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    this.init(newTheme);
    dispatch(setTheme(newTheme));
  }

  private setVariable(key: string, value: string) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export const themeService = new ThemeService();
