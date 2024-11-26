"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export function Error({ title = "Not Found", desc = "Sorry, we couldn&apos;t find the item you&apos;re looking for." }: { title?: string; desc?: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col text-white items-center justify-center min-h-[400px] text-center px-4">
      <FileQuestion className="w-16 h-16  mb-4" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
      <p className="text-xl  mb-8">{desc}</p>
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  );
}
