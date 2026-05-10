import advancedBlogs from "@/data/advancedBlogs";

const siteUrl = "https://arbazmurme.vercel.app";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/portfolio", "/work", "/contact", "/blog"];

  const routes = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = advancedBlogs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}

