import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/products";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "Products",
    "Regeneratively grown products from Serrinha.",
  );
}

export default async function ProductsPage() {
  return makePage(PATH);
}

