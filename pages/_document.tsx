import ReactQueryProviders from '@/hooks/useReactQuery';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <body>
        <ReactQueryProviders>
          <Main />
          <div id='_modal'></div>
          <NextScript />
        </ReactQueryProviders>
      </body>
    </Html>
  );
}
