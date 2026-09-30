import type { Metadata } from "next";

import { SearchPage } from "@/components/studio/search-page";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Mono Studio components and documentation.",
};

export default function SearchRoutePage() {
  return <SearchPage />;
}
