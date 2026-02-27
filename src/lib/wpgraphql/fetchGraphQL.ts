export type GraphQLVariables = Record<string, unknown>;

interface FetchGraphQLOptions {
  query: string;
  variables?: GraphQLVariables;
  revalidate?: number;
}

const isDev = process.env.NODE_ENV !== "production";

export async function fetchGraphQL<T>({
  query,
  variables,
  revalidate = 60,
}: FetchGraphQLOptions): Promise<T> {
  const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error(
      "WORDPRESS_GRAPHQL_ENDPOINT is not set. Please define it in your environment (e.g. .env.local).",
    );
  }

  if (!endpoint.startsWith("https://")) {
    throw new Error(
      `WORDPRESS_GRAPHQL_ENDPOINT must be an HTTPS URL, received: ${endpoint}`,
    );
  }

  if (isDev) {
    console.log(`[wpgraphql] Using endpoint: ${endpoint}`);
  }

  let res: Response;

  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Important: do not mutate the URL; just send JSON payload
      body: JSON.stringify({ query, variables }),
      next: { revalidate },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown fetch error";
    throw new Error(`GraphQL request failed: ${message}`);
  }

  if (!res.ok) {
    throw new Error(
      `GraphQL request failed: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as { data?: T; errors?: unknown[] };

  if (json.errors && json.errors.length > 0) {
    console.error(json.errors);
    throw new Error("GraphQL returned errors");
  }

  if (!json.data) {
    throw new Error("GraphQL response has no data");
  }

  return json.data;
}

