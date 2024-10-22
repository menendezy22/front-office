/* eslint-disable import/no-unresolved */
import { ChakraProvider } from '@chakra-ui/react';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';
import localFont from '@next/font/local';
// eslint-disable-next-line import/no-unresolved
import Login from '@src/components/Login/login';
import { Layout } from '@src/components/templates/layout';
// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/theme';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
// eslint-disable-next-line import/order
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-unresolved

const spaceGrotesk = localFont({
  src: [
    // Font files
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './utils/fonts/space-grotesk-v13-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { pathname } = router;

  console.log(pathname, 'ezzzz');

  return (
    <div>
      <ContentfulLivePreviewProvider
        locale={router.locale || 'en-US'}
        enableInspectorMode={pageProps.previewActive}
        enableLiveUpdates={pageProps.previewActive}>
        <ChakraProvider
          theme={{
            ...theme,
            fonts: {
              heading: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.heading}`,
              body: `${spaceGrotesk.style.fontFamily}, ${theme.fonts.body}`,
            },
          }}>
          {pathname === '/404' ? (
            <Login />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ChakraProvider>
      </ContentfulLivePreviewProvider>
    </div>
  );
};

export default appWithTranslation(App);
