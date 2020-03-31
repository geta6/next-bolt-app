// @ts-check

const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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
    config.plugins = [...config.plugins, new webpack.EnvironmentPlugin(dotenv.config().parsed)];

    return config;
  },
};

module.exports = nextConfig;