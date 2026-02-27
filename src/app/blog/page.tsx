import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { getAllPosts } from "@/lib/wpgraphql/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories and reflections from Serrinha.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <Container>
      <header className="mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          From the farm
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-ink">
          Stories from Serrinha
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          Field notes, seasonal shifts, and reflections on working with
          regenerative systems.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">No posts published yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const date =
              post.date &&
              new Date(post.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

            const image = post.featuredImage?.node?.sourceUrl ?? null;
            const excerptHtml = typeof post.excerpt === "string" ? post.excerpt : "";
            const excerptText = excerptHtml
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            const truncatedExcerpt =
              excerptText.length > 160
                ? `${excerptText.slice(0, 160)}…`
                : excerptText;

            return (
              <Card key={post.id} className="flex h-full flex-col overflow-hidden">
                {image && (
                  <div className="-mx-6 -mt-6 mb-4 h-40 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {date}
                  </p>
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-olive"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {truncatedExcerpt && (
                    <p className="text-sm text-muted">{truncatedExcerpt}</p>
                  )}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-olive underline-offset-4 hover:underline"
                    >
                      Read story
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}

