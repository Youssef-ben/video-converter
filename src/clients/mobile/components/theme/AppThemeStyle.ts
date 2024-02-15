const LightColor = '#d0d0c0';
export const LightHeaderColor = '#d9d9cc';
const DarkColor = '#323232';
export const DarkHeaderColor = '#464646';

const InputBorderColor = '#737373';
const ErrorColor = '#9f3a38';
const ErrorBackground = '#ffe0e0';

export const appFontName = 'Nunito';
export const TransparentColor = 'transparent';

export const AppThemeStyle = {
  light: {
    color: DarkColor,
    backgroundColor: LightColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: DarkColor,
    shadowColor: DarkColor,
  },

  dark: {
    color: LightColor,
    backgroundColor: DarkColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: LightColor,
    shadowColor: LightColor,
  },
  extraStyles: {
    error: ErrorColor,
    errorBackground: ErrorBackground,
    inputBorderColor: InputBorderColor,
    inputPlaceholderColor: InputBorderColor,

    buttonTextColor: (isDarkTheme: boolean) => (isDarkTheme ? DarkColor : LightColor),
    buttonBackground: (isDarkTheme: boolean) => (isDarkTheme ? LightColor : DarkColor),
    InputBackgroundColor: (isDarkTheme: boolean) => (isDarkTheme ? '#464646' : LightHeaderColor),
    headerBackgroundColor: (isDarkTheme: boolean) => (isDarkTheme ? DarkHeaderColor : LightHeaderColor),
  },
};
