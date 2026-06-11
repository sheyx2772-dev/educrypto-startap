import { LessonFlow } from "@/components/lessons/LessonFlow";
import { getLessonById } from "@/lib/lessons";
import Link from "next/link";

interface LessonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LessonDetailPage({ params }: LessonDetailPageProps) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-gray-500 mb-4">Darslik topilmadi</p>
        <Link href="/lessons" className="btn-3d-primary inline-block !text-sm">
          ← Orqaga
        </Link>
      </div>
    );
  }

  return <LessonFlow lesson={lesson} />;
}
