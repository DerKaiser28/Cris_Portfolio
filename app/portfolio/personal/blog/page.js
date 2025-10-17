import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postsQuery, categoriesQuery } from "@/sanity/queries";
import PostCard from "@/components/PostCard";

export const revalidate = 60; // ISR every 60s

export const metadata = {
  title: "Blog",
  description: "Posts, notes, and travel stories.",
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery),
  ]);

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-12">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_18rem_at_50%_0%,rgba(244,114,182,0.08),transparent)]" />

      {/* Hero */}
      <header>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
            Blog
          </span>
        </h1>
        <p className="mt-3 text-zinc-300">
          Writing on travel, dev, and the little things I want to remember.
        </p>
      </header>

      {/* Categories bar */}
      {categories?.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-xs uppercase tracking-wide text-zinc-500">
            Browse:
          </span>
          {categories.map((c) => (
            <Link
              key={c._id}
              href={`/portfolio/personal/blog/categories?slug=${encodeURIComponent(c.slug)}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-200
                         hover:border-rose-400/50 hover:text-zinc-100 hover:shadow-[0_0_22px_-8px_rgba(244,114,182,0.55)]
                         transition"
            >
              {/* little dot accent */}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-300" />
              {c.title}
            </Link>
          ))}

          {/* All categories page */}
          <Link
            href="/portfolio/personal/blog/categories"
            className="ml-1 inline-flex items-center rounded-full border border-amber-400/40 bg-zinc-950/60 px-3 py-1.5 text-xs text-amber-200
                       hover:border-amber-300/70 hover:text-amber-100 hover:shadow-[0_0_22px_-8px_rgba(251,191,36,0.55)]
                       transition"
          >
            View all categories →
          </Link>
        </div>
      )}

      {/* Posts grid */}
      {(!posts || posts.length === 0) ? (
        <p className="mt-10 text-zinc-500">No posts yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
