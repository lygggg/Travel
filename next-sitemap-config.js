module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_URL}`,
  generateRobotsTxt: true,
  exclude: ["/sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`, // <==== Add here
    ],
  },
};
