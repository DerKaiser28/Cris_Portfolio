import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-rose-400/40 hover:shadow-[0_0_28px_-10px_rgba(244,114,182,0.4)] transition">
      {post.coverImage && (
        <Link href={`/portfolio/personal/blog/${post.slug}`}>
          <div className="relative aspect-[16/9]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>
      )}
      <div className="p-4">
        <div className="text-xs text-zinc-400">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h3 className="mt-1 text-lg font-medium">
          <Link href={`/portfolio/personal/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-3">
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}
