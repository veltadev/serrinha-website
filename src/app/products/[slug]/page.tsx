import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { ProductOrderForm } from "@/components/ProductOrderForm";
import { getAllProductSlugs, getProductBySlug } from "@/lib/wpgraphql/api";
import { buildMetadataFromContent } from "@/lib/seo";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  return buildMetadataFromContent({
    title: product.title,
    html: product.content ?? undefined,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const image = product.featuredImage?.node?.sourceUrl ?? null;

  return (
    <Container>
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/products"
          className="text-sm text-muted underline-offset-4 hover:text-olive hover:underline"
        >
          ← All products
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column — image + description */}
        <div className="space-y-6">
          {image && (
            <div className="aspect-square w-full overflow-hidden rounded-2xl">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          )}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted">
              Serrinha product
            </p>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {product.title}
            </h1>
          </div>
          {product.content && (
            <Prose html={product.content} />
          )}
        </div>

        {/* Right column — order form */}
        <div>
          <div className="sticky top-8 rounded-2xl border border-olive/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-1 font-serif text-xl font-semibold text-ink">
              Place an order
            </h2>
            <p className="mb-6 text-sm text-muted">
              Fill in the form and we&apos;ll get back to you to confirm
              availability and arrange delivery.
            </p>
            <ProductOrderForm productTitle={product.title} />
          </div>
        </div>
      </div>
    </Container>
  );
}
