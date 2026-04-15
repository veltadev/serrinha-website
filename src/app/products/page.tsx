import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { getAllProducts } from "@/lib/wpgraphql/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description: "Regeneratively grown products from Serrinha.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Container>
      <header className="mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          From the land
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-ink">
          Our Products
        </h1>
        <p className="max-w-2xl text-sm text-muted">
          Grown and harvested at Serrinha using regenerative practices. Each
          product is available in limited quantities — order directly from us.
        </p>
      </header>

      {products.length === 0 ? (
        <p className="text-sm text-muted">No products available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const image = product.featuredImage?.node?.sourceUrl ?? null;

            return (
              <Card
                key={product.id}
                className="flex h-full flex-col overflow-hidden"
              >
                {image && (
                  <div className="-mx-6 -mt-6 mb-4 h-52 overflow-hidden">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3">
                  <h2 className="font-serif text-lg font-semibold text-ink">
                    <Link
                      href={`/products/${product.slug}`}
                      className="hover:text-olive"
                    >
                      {product.title}
                    </Link>
                  </h2>
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm font-medium text-olive underline-offset-4 hover:underline"
                    >
                      View &amp; order
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
