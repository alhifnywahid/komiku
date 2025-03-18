import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Type = {
  title1: string;
  title2: string;
  slug: string;
};

export default function H2({ title1, title2, slug }: Type) {
  return (
    <div className="flex justify-between items-center mb-4 pb-2 border-b">
      <h3 className="text-2xl font-bold tracking-tight">{title1}</h3>
      <Link
        href={slug}
        className="font-medium text-md flex gap-2 items-center justify-center hover:text-blue-400"
      >
        {title2}
        <ArrowRight />
      </Link>
    </div>
  );
}
