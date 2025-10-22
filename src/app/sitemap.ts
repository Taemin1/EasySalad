import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ezysalad.store";

  return [
    {
      url: baseUrl,
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/catering`,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/order`,
      priority: 0.9,
    },
  ];
}
