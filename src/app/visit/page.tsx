import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/visit";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "Visit Serrinha",
    "Plan your visit or retreat at Serrinha.",
  );
}

export default async function VisitPage() {
  return makePage(PATH);
}

