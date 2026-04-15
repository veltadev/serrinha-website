export const PAGE_BY_URI = /* GraphQL */ `
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      title
      slug
      content
    }
  }
`;

export const ALL_POSTS = /* GraphQL */ `
  query AllPosts {
    posts(
      first: 20
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const POST_BY_SLUG = /* GraphQL */ `
  query PostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      slug
      title
      content
      date
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const ALL_POST_SLUGS = /* GraphQL */ `
  query AllPostSlugs {
    posts(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

export const ALL_PRODUCTS = /* GraphQL */ `
  query AllProducts {
    products(first: 20, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_SLUG = /* GraphQL */ `
  query ProductBySlug($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export const ALL_PRODUCT_SLUGS = /* GraphQL */ `
  query AllProductSlugs {
    products(first: 100, where: { status: PUBLISH }) {
      nodes {
        slug
      }
    }
  }
`;

