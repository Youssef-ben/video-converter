const LightColor = '#d0d0c0';
const DarkColor = '#323232';

const ButtonColor = '#375e8d';
const InputBorderColor = '#737373';
const ErrorColor = '#d74946';
const ErrorBackground = '#f5bbbb';

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
    Error: ErrorColor,
    ErrorBackground: ErrorBackground,

    buttonTextColor: LightColor,
    buttonBackground: ButtonColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: '#d9d9cc',
  },

  dark: {
    color: LightColor,
    backgroundColor: DarkColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: LightColor,
    shadowColor: LightColor,
    Error: ErrorColor,
    ErrorBackground: ErrorBackground,

    buttonTextColor: LightColor,
    buttonBackground: ButtonColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: '#464646',
  },
};
