import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PostImage } from "@/types/post";

export function PostImages({ images }: { images: PostImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className={cn("grid gap-0.5", images.length > 1 && "grid-cols-2")}>
      {images.map((image) => (
        <Image
          key={image.url}
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 70vw, 100vw"
          className="h-auto w-full bg-muted object-cover"
        />
      ))}
    </div>
  );
}
