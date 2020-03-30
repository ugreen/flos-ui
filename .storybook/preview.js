import React from "react";
import { addDecorator } from "@storybook/react";
import { withA11y } from '@storybook/addon-a11y';
import { muiTheme } from 'storybook-addon-material-ui';

import { themeObject } from '../src/shared/theme';



import '../src/assets/styles.css';

addDecorator(withA11y);
addDecorator(muiTheme([themeObject]));
