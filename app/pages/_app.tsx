import React from 'react';
import App, { AppContext } from 'next/app';

export default class AppPage extends App {
  static getInitialProps = (ctx: AppContext) => {
    const props = App.getInitialProps(ctx);
    return { ...props };
  };

  render = () => {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  };
}
