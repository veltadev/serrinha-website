import { fetchGraphQL } from "./fetchGraphQL";
import { PAGE_BY_URI, ALL_POSTS, POST_BY_SLUG, ALL_POST_SLUGS, ALL_PRODUCTS, PRODUCT_BY_SLUG, ALL_PRODUCT_SLUGS } from "./queries";
import type {
  PageByUriResponse,
  AllPostsResponse,
  PostBySlugResponse,
  AllPostSlugsResponse,
  WpPage,
  WpPost,
  WpProduct,
  AllProductsResponse,
  ProductBySlugResponse,
  AllProductSlugsResponse,
} from "./types";

const DEFAULT_REVALIDATE = 60;

export async function getPageByPath(path: string): Promise<WpPage | null> {
  const uri = path === "/" ? "/" : `${path.replace(/^\//, "")}/`;

  const data = await fetchGraphQL<PageByUriResponse>({
    query: PAGE_BY_URI,
    variables: { uri },
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.page ?? null;
}

export async function getAllPosts(): Promise<WpPost[]> {
  const data = await fetchGraphQL<AllPostsResponse>({
    query: ALL_POSTS,
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.posts?.nodes ?? [];
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  const data = await fetchGraphQL<PostBySlugResponse>({
    query: POST_BY_SLUG,
    variables: { id: slug },
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.post ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<AllPostSlugsResponse>({
    query: ALL_POST_SLUGS,
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.posts?.nodes?.map((n) => n.slug) ?? [];
}

export async function getAllProducts(): Promise<WpProduct[]> {
  const data = await fetchGraphQL<AllProductsResponse>({
    query: ALL_PRODUCTS,
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.products?.nodes ?? [];
}

export async function getProductBySlug(slug: string): Promise<WpProduct | null> {
  const data = await fetchGraphQL<ProductBySlugResponse>({
    query: PRODUCT_BY_SLUG,
    variables: { id: slug },
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.product ?? null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<AllProductSlugsResponse>({
    query: ALL_PRODUCT_SLUGS,
    revalidate: DEFAULT_REVALIDATE,
  });

  return data.products?.nodes?.map((n) => n.slug) ?? [];
}

