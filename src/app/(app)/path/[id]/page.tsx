import { notFound } from "next/navigation";
import { getPathNode } from "@/lib/curriculum";
import { PathNodeFlow } from "@/components/path/PathNodeFlow";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PathNodePage({ params }: PageProps) {
  const { id } = await params;
  const node = getPathNode(id);
  if (!node) notFound();
  return <PathNodeFlow node={node} />;
}
