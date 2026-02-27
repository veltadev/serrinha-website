import type { Metadata } from "next";
import { Prose } from "@/components/Prose";
import { HeroSection } from "@/components/HeroSection";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { getAllPosts, getPageByPath } from "@/lib/wpgraphql/api";
import { buildMetadataFromContent } from "@/lib/seo";

const PATH = "/";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByPath(PATH);

  if (!page) {
    return buildMetadataFromContent({
      title: "Serrinha",
      description:
        "Serrinha is a regenerative farm and nature retreat, cultivating biodiversity, food, and community.",
    });
  }

  return buildMetadataFromContent({
    title: page.title || "Home",
    description:
      "Serrinha is a regenerative farm and nature retreat, cultivating biodiversity, food, and community.",
    html: page.content ?? undefined,
  });
}

export default async function HomePage() {
  const [page, posts] = await Promise.all([
    getPageByPath(PATH),
    getAllPosts(),
  ]);

  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <HeroSection
        title="Regenerating Land. Restoring Balance."
        subtitle="Serrinha is a regenerative farm and nature retreat, tending soil, water and community with care."
        primaryCtaLabel="Visit the farm"
        primaryCtaHref="/visit"
        secondaryCtaLabel="Our regenerative practices"
        secondaryCtaHref="/regenerative"
      />

      <Section eyebrow="What guides us" title="Rooted in living systems">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Soil
            </h3>
            <p className="text-sm text-muted">
              Building living soils through cover crops, compost, and gentle
              disturbance so fertility can regenerate year after year.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Biodiversity
            </h3>
            <p className="text-sm text-muted">
              Planting diverse species and habitat corridors that invite
              pollinators, birds, and wild allies back to the landscape.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-ink">
              Community
            </h3>
            <p className="text-sm text-muted">
              Hosting gatherings, learning, and slow stays where people can
              reconnect with land, food, and each other.
            </p>
          </div>
        </div>
      </Section>

      {page && (
        <Section>
          <Prose html={page.content} />
        </Section>
      )}

      <Section eyebrow="From the farm" title="Latest stories">
        {latestPosts.length === 0 ? (
          <p className="text-sm text-muted">No stories published yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => {
              const date =
                post.date &&
                new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

              const image = post.featuredImage?.node?.sourceUrl ?? null;

              const excerptText =
                typeof post.excerpt === "string"
                  ? post.excerpt.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
                  : "";

              const truncatedExcerpt =
                excerptText.length > 140
                  ? `${excerptText.slice(0, 140)}…`
                  : excerptText;

              return (
                <Card key={post.id} className="overflow-hidden">
                  <article className="flex h-full flex-col gap-3">
                    {image && (
                      <div className="-mx-6 -mt-6 mb-4 h-40 overflow-hidden">
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </div>
                    )}
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      {date}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {post.title}
                    </h3>
                    {truncatedExcerpt && (
                      <p className="text-sm text-muted">{truncatedExcerpt}</p>
                    )}
                    <div className="mt-auto pt-2">
                      <Button href={`/blog/${post.slug}`} variant="ghost">
                        Read story
                      </Button>
                    </div>
                  </article>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}

