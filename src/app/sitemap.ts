import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ezysalad.co.kr";

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
    },
    {
      url: `${baseUrl}/catering`,
    },
    {
      url: `${baseUrl}/contact`,
    },
    {
      url: `${baseUrl}/terms`,
    },
    {
      url: `${baseUrl}/order`,
    },
  ];
}
