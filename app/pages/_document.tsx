import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export class DocumentPage extends Document {
  static getInitialProps = async (ctx: DocumentContext) => {
    const props = await Document.getInitialProps(ctx);
    return { ...props };
  };

  render = () => {
    return (
      <Html>
        <Head data-prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
          {/* SiteConfig */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}

export default DocumentPage;
