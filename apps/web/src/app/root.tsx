import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';

import './root.css';

// ─── SEO Constants ───────────────────────────────────────────
const SITE_URL = 'https://zaujulio.github.io';
const SITE_TITLE = 'Zau Julio | Software Engineer';
const SITE_DESCRIPTION =
  'Software Engineer specializing in full-stack development, machine learning, and creative side projects. Explore my work, articles, and hobbies.';

// <a href="https://br.freepik.com/fotos-gratis/efeito-de-falha-em-fundo-preto_16018490.htm#fromView=keyword&page=1&position=1&uuid=d4f7574d-e0d6-45ea-ba27-bdb75730c7b5&query=Vhs+texture">Imagem de rawpixel.com no Freepik</a>

export const meta: Route.MetaFunction = () => [
  { title: SITE_TITLE },
  { name: 'description', content: SITE_DESCRIPTION },
  { name: 'author', content: 'Zau Julio' },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#000000' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: SITE_URL },
  { property: 'og:title', content: SITE_TITLE },
  { property: 'og:description', content: SITE_DESCRIPTION },
  { property: 'og:site_name', content: 'Zau Julio' },
  { property: 'og:locale', content: 'en_US' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: SITE_TITLE },
  { name: 'twitter:description', content: SITE_DESCRIPTION },
  { name: 'twitter:creator', content: '@zaujulio' },
  // Google Search Console verification
  { name: 'google-site-verification', content: 'qKO2zDnD0jBRfjllKQ9bog58eXzZzALYVKsB2ACU-ic' },
];

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'canonical', href: SITE_URL },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        {/* JSON-LD Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Zau Julio',
              url: SITE_URL,
              jobTitle: 'Software Engineer',
              email: 'zaujulio.dev@gmail.com',
              sameAs: [
                'https://github.com/ZauJulio',
                'https://linkedin.com/in/zaujulio',
              ],
              knowsAbout: [
                'Software Engineering',
                'Full-Stack Development',
                'Machine Learning',
                'React',
                'TypeScript',
                'Python',
              ],
            }),
          }}
        />
      </head>

      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Umami Analytics — self-hosted, privacy-focused, <1KB */}
        {import.meta.env.VITE_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={import.meta.env.VITE_UMAMI_URL || 'https://cloud.umami.is/script.js'}
            data-website-id={import.meta.env.VITE_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default function App() {
  return <Outlet />;
}
