const LightColor = '#d0d0c0';
const LightHeaderColor = '#d9d9cc';
const DarkColor = '#323232';
const DarkHeaderColor = '#464646';

const InputBorderColor = '#737373';
const ErrorColor = '#d74946';
const ErrorBackground = '#f5bbbb';

export const appFontName = 'Nunito';
export const TransparentColor = 'transparent';

export const AppThemeStyle = {
  light: {
    color: DarkColor,
    backgroundColor: LightColor,
    headerBackgroundColor: LightHeaderColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: DarkColor,
    shadowColor: DarkColor,
    Error: ErrorColor,
    ErrorBackground: ErrorBackground,

    buttonTextColor: LightColor,
    buttonBackground: DarkColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: LightHeaderColor,
  },

  dark: {
    color: LightColor,
    backgroundColor: DarkColor,
    headerBackgroundColor: DarkHeaderColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: LightColor,
    shadowColor: LightColor,
    Error: ErrorColor,
    ErrorBackground: ErrorBackground,

    buttonTextColor: DarkColor,
    buttonBackground: LightColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: '#464646',
  },
};
