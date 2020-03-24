const path = require('path');

module.exports = {
    stories: [
        '../src/stories/welcome.stories.tsx',
        '../src/**/*.stories.(ts|tsx|js|jsx|mdx)'
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/preset-create-react-app',
        '@storybook/addon-storysource/register',
        '@storybook/addon-knobs/register',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true
            }
        }
    ]
};