export interface WpPage {
  id: string;
  slug: string;
  title: string;
  content: string | null;
}

export interface WpPost {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  date: string;
  featuredImage: { node: { sourceUrl: string | null } | null } | null;
}

export interface PageByUriResponse {
  page: WpPage | null;
}

export interface AllPostsResponse {
  posts: { nodes: WpPost[] };
}

export interface PostBySlugResponse {
  post: WpPost | null;
}

export interface AllPostSlugsResponse {
  posts: { nodes: { slug: string }[] };
}

export interface WpProduct {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  featuredImage: { node: { sourceUrl: string | null } | null } | null;
}

export interface AllProductsResponse {
  products: { nodes: WpProduct[] };
}

export interface ProductBySlugResponse {
  product: WpProduct | null;
}

export interface AllProductSlugsResponse {
  products: { nodes: { slug: string }[] };
}

