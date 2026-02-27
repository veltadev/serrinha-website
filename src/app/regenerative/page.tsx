import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/regenerative";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "Regenerative Practices",
    "How Serrinha works with regenerative agriculture and ecology.",
  );
}

export default async function RegenerativePage() {
  return makePage(PATH);
}

