import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.vanatvam.com';

  const routes = [
    '',
    '/about',
    '/projects',
    '/investment',
    '/blog',
    '/contact',
    '/brindavana',
    '/madhuvana',
    '/anantavana',
    '/eeshavana',
    '/privacy-policy',
    '/terms',
    '/blog/redefining-farmland-ownership',
    '/blog/wellness-benefits-nature',
    '/blog/sustainable-farmland-future',
    '/blog/madhuvana-sacred-groves',
    '/blog/the-big-picture-of-vanatvam',
    '/blog/farmhouse-vs-city-lifestyle',
    '/blog/easy-way-to-own-a-farmhouse-community',
    '/blog/going-back-to-our-roots-vedic-forest-science',
    '/blog/fulfil-your-dream-of-owning-a-farmland',
    '/blog/essence-of-life-enhanced-in-nature',
    '/blog/getting-children-out-of-the-virtual-world',
    '/blog/importance-of-educating-newer-generation-about-farmlands',
    '/blog/is-farmland-a-wise-investment',
    '/blog/benefits-of-living-amidst-nature'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
