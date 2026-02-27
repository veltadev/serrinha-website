import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/gallery";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "Gallery",
    "A look at life, land and seasons at Serrinha.",
  );
}

export default async function GalleryPage() {
  return makePage(PATH);
}

