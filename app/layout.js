import '../styles/globals.css';

export const metadata = {
  title: 'variable',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: '16x16 32x32 48x48' },
      { url: '/metadroid-fav.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/metadroid-fav.png?v=2', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: ['/favicon.ico?v=2'],
    apple: [{ url: '/metadroid-fav.png?v=2', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: '/logo01.png', color: '#331714' },
    ],
  },
  themeColor: '#331714',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
