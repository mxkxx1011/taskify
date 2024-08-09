import ToastList from '@/components/Toast/ToastList';
import ReactQueryProviders from '@/hooks/useReactQuery';
import '@/styles/reset.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProviders>
      <ToastList />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={true} />
    </ReactQueryProviders>
  );
}
