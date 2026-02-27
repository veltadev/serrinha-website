import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/about";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "About Serrinha",
    "Learn about Serrinha, our story and the people behind the land.",
  );
}

export default async function AboutPage() {
  return makePage(PATH);
}

