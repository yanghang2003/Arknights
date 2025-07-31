import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import { store } from '@/store/store';
import { useSelector } from 'react-redux';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>   
      <WrappedComponent Component={Component} pageProps={pageProps} router={router} />
    </Provider>
  );
}
function WrappedComponent({ Component, pageProps, router }: any) {
  const directionValue = useSelector((state: any) => state.direction.value); 
  return (
    <>
      {router.pathname === '/404' ? (
        <Component {...pageProps} />
      ) : (
        <div className="overflow-hidden h-screen relative">
          <AnimatePresence mode="sync" custom={router.asPath}>
            <Component key={router.asPath} {...pageProps} transitionDirection={directionValue} />
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
