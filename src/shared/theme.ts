import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { Overrides } from '@material-ui/core/styles/overrides';
import { createMuiTheme } from "@material-ui/core/styles";

/**
 * PAJ - Palette for Buttons, Input Fields, Components & Typography color
 * Simple function which returns a Palette Object
 * Use - https://in-your-saas.github.io/material-ui-theme-editor/
 */
export const getPalette = ():PaletteOptions => {
  return {
    "common": {
      "black": "#000",
      "white": "#fff"
    },
    "background": {
      "paper": "#fff",
      "default": "#fafafa"
    },
    "primary": {
      "light": "#53759B",
      "main": "rgba(34, 54, 96, 1)",
      "dark": "#131947",
      "contrastText": "#fff"
    },
    "secondary": {
      "light": "#ff4081",
      "main": "#f50057",
      "dark": "#c51162",
      "contrastText": "#fff"
    },
    "error": {
      "light": "#e57373",
      "main": "#A01E50",
      "dark": "#d32f2f",
      "contrastText": "#fff"
    },
    "text": {
      "primary": "#131947",
      "secondary": "rgba(34, 54, 96, 1)",
      "disabled": "rgba(0, 0, 0, 0.38)",
      "hint": "rgba(0, 0, 0, 0.38)"
    }
  }
};

/**
 * PAJ - Typography fontsFamily ^ FontStyling
 * NOTE - Color for the typography is part of the palette, refer the function above
 */
export const getTypographyStyling  = (): TypographyOptions => {
  return  {
    fontFamily: [ 'Interstate', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif' ].join(','),
    fontSize: 16,
    subtitle1: {
      fontSize: 20,
      lineHeight: '30px',
      fontWeight: 300
    },
    h1: {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600
    },
    body1: {
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 300
    },
    body2: {
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 600
    }
  }
};

export const getOverrideStyles =  (): Overrides => {
  return {
    MuiButton: {
      contained: {
        backgroundColor: "#53759B",
        textTransform: "none",
        boxShadow: "none",
        color: "#ffffff",
        fontWeight: 600,
        '&:hover': {
          backgroundColor: "#131947",
          color: "#ffffff",
          boxShadow: "none",
        },
        '&:active': {
          backgroundColor: "#131947",
          color: "#63AEDB",
          boxShadow: "none",
        },
        '&:visited': {
          backgroundColor: "#131947",
          color: "#ffffff",
          boxShadow: "none",
        },
        '&[disabled]': {
          backgroundColor: "#53759B",
          color: "#CAD7E0",
          boxShadow: "none",
        }
      },
    }
  }
};

export const themeObject = createMuiTheme({
  typography: getTypographyStyling(),
  palette: getPalette(),
  overrides: getOverrideStyles()
});
