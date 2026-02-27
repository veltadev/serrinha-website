import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { getAllPostSlugs, getPostBySlug } from "@/lib/wpgraphql/api";
import { buildMetadataFromContent } from "@/lib/seo";

export const revalidate = 60;

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: BlogPostPageProps,
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  return buildMetadataFromContent({
    title: post.title,
    description: post.excerpt ?? undefined,
    html: post.content ?? undefined,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const date =
    post.date &&
    new Date(post.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <Container>
      <article className="space-y-6">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-forest/60">
            {date}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
        </header>
        <Prose html={post.content} />
      </article>
    </Container>
  );
}

