// @ts-check

const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { parsed: def } = dotenv.config({ path: path.join(__dirname, 'config', 'env', 'default.env') });
const { parsed: env } = dotenv.config({ path: path.join(__dirname, 'config', 'env', `${process.env.NODE_ENV}.env`) });

const nextConfig = {
  // https://nextjs.org/docs#changing-x-powered-by
  poweredByHeader: false,

  // https://nextjs.org/docs#setting-a-custom-build-directory
  distDir: path.join('..', 'tmp', 'build'),

  // https://nextjs.org/docs#configuring-extensions-looked-for-when-resolving-pages-in-pages
  pageExtensions: ['tsx'],

  /**
   * https://nextjs.org/docs#customizing-webpack-config
   * @type {(config: webpack.Configuration) => webpack.Configuration}
   */
  webpack: (config) => {
    // Environment
    config.plugins = config.plugins || [];

    // https://github.com/zeit/next.js/#exposing-configuration-to-the-server--client-side
    config.plugins = [...config.plugins, new webpack.EnvironmentPlugin({ ...(def || {}), ...(env || {}) })];

    return config;
  },
};

module.exports = nextConfig;
