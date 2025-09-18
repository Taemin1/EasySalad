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
    sitemap: "https://easysalad.co.kr/sitemap.xml",
  };
}
