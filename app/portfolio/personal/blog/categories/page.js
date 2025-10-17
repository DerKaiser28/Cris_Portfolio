// app/portfolio/personal/blog/categories/page.js
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import PostCard from "@/components/PostCard";

/* ───────────────────── GROQ ───────────────────── */

// Categories with one cover image from any post referencing that category (latest by publishedAt)
const categoriesWithImageQuery = `
*[_type == "category"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  description,
  // pick the latest post that references this category and has a cover image
  "coverImage": *[_type == "post" && references(^._id) && defined(coverImage.asset)]
                 | order(publishedAt desc)[0].coverImage.asset->url,
  "coverAlt": *[_type == "post" && references(^._id) && defined(coverImage.alt)]
                 | order(publishedAt desc)[0].coverImage.alt
}
`;

const categoryBySlugQuery = `
*[_type == "category" && slug.current == $slug][0]{
  _id, title, description, "slug": slug.current
}
`;

const postsByCategoryQuery = `
*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverAlt": coverImage.alt
}
`;

export const revalidate = 60;

/* ─────────────────── Page Component ─────────────────── */

export default async function CategoriesPage(props) {
  // await searchParams per your Next.js version
  const sp = await props.searchParams;
  const raw = sp?.slug;
  const selectedSlug = Array.isArray(raw) ? raw[0] : raw || null;

  /* ── Detail view: /categories?slug=... ── */
  if (selectedSlug) {
    const [category, posts] = await Promise.all([
      client.fetch(categoryBySlugQuery, { slug: selectedSlug }),
      client.fetch(postsByCategoryQuery, { slug: selectedSlug }),
    ]);

    if (!category) {
      return (
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/portfolio/personal/blog" className="text-rose-300 underline">
              ← Back to blog
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/portfolio/personal/blog/categories" className="text-rose-300 underline">
              All categories
            </Link>
          </div>

          <h1 className="text-2xl font-semibold">Category not found</h1>
          <p className="mt-2 text-zinc-400">
            The category “{selectedSlug}” doesn’t exist.
          </p>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Top nav */}
        <div className="mb-4 flex items-center gap-3">
          <Link href="/portfolio/personal/blog" className="text-rose-300 underline">
            ← Back to blog
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/portfolio/personal/blog/categories" className="text-rose-300 underline">
            All categories
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-300">{category.title}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold">{category.title}</h1>
        {category.description && (
          <p className="mt-2 text-zinc-400">{category.description}</p>
        )}

        {(!posts || posts.length === 0) ? (
          <p className="mt-8 text-zinc-500">No posts in this category yet.</p>
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

  /* ── Index view: /categories ── */
  const categories = await client.fetch(categoriesWithImageQuery);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Top nav */}
      <div className="mb-4">
        <Link href="/portfolio/personal/blog" className="text-rose-300 underline">
          ← Back to blog
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold">Categories</h1>

      {(!categories || categories.length === 0) ? (
        <p className="mt-6 text-zinc-500">No categories yet.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c._id}
              href={`/portfolio/personal/blog/categories?slug=${encodeURIComponent(c.slug)}`}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-rose-400/40 hover:shadow-[0_0_25px_-10px_rgba(244,114,182,0.4)] transition"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9]">
                {c.coverImage ? (
                  <Image
                    src={c.coverImage}
                    alt={c.coverAlt || `${c.title} cover`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-zinc-900/40 text-zinc-500 text-xs">
                    No image
                  </div>
                )}
                {/* subtle gradient fade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Text */}
              <div className="p-4">
                <div className="text-zinc-100 font-medium">{c.title}</div>
                {c.description && (
                  <p className="text-sm mt-1 text-zinc-400 line-clamp-2">
                    {c.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
