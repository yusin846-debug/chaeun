import { HomePage } from "@/components/home/HomePage";

export default async function Home({ searchParams }: { searchParams: Promise<{ concern?: string | string[] }> }) {
  const { concern } = await searchParams;
  return <HomePage initialConcern={typeof concern === "string" ? concern : undefined} />;
}
