export const LightColor = '#d0d0c0';
export const DarkColor = '#323232';

export const ButtonColor = '#375e8d';
export const InputBorderColor = '#737373';
export const LightInputBackgroundColor = '#d9d9cc';
export const DarkInputBackgroundColor = '#464646';
export const TransparentColor = 'transparent';

export const appFontName = 'Nunito';

export const AppThemeStyle = {
  light: {
    color: DarkColor,
    backgroundColor: LightColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: DarkColor,
    shadowColor: DarkColor,

    buttonTextColor: LightColor,
    buttonBackground: ButtonColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: LightInputBackgroundColor,
  },

  dark: {
    color: LightColor,
    backgroundColor: DarkColor,
    fontFamily: appFontName,
    borderRadius: 3,
    borderColor: LightColor,
    shadowColor: LightColor,

    buttonTextColor: LightColor,
    buttonBackground: ButtonColor,

    InputBorderColor: InputBorderColor,
    InputPlaceholderColor: InputBorderColor,
    InputBackgroundColor: DarkInputBackgroundColor,
  },
};
