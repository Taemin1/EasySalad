import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/order/", "/menu/"],
      disallow: [
        "/thisisforadmin/",
        "/checkout/",
        "/order-complete/",
        "/payment/",
        "/api/",
      ],
    },
    sitemap: ["https://ezysalad.store/sitemap.xml", "https://ezy-salad.store/sitemap.xml"],
  };
}
