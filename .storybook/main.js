module.exports = {
    stories: [
        '../src/components/intro.stories.mdx',
        '../src/stories/welcome.stories.tsx',
        '../src/**/*.stories.(ts|tsx|js|jsx|mdx)'
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/preset-create-react-app',
        '@storybook/addon-storysource/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-a11y/register',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true
            }
        }
    ],
    webpackFinal: async (config, configType) => {
        config.mode = 'development';
        return config;
    }
};