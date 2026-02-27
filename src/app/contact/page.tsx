import type { Metadata } from "next";
import { makeMetadata, makePage } from "../(site)/PageWrapper";

const PATH = "/contact";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return makeMetadata(
    PATH,
    "Contact",
    "Get in touch with the team at Serrinha.",
  );
}

export default async function ContactPage() {
  return makePage(PATH);
}

