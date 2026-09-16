import advancedBlogs from "@/data/advancedBlogs.json";

const siteUrl = "https://arbazmurme.vercel.app";

export default function sitemap() {
  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "daily" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  ];

  const routes = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes = advancedBlogs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt).toISOString()
      : new Date(post.createdAt || Date.now()).toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}


