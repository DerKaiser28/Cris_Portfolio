import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/queries";
import RichText from "@/components/RichText";

export const revalidate = 60;

/* --- Fetch OTHER posts (exclude current), newest first --- */
const otherPostsGalleryQuery = `
*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...6]{
  "slug": slug.current,
  title,
  publishedAt,
  "coverImage": coverImage.asset->url,
  "coverAlt": coverImage.alt
}
`;

export async function generateMetadata(props) {
  const { slug } = await props.params; // handle async params
  const post = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      type: "article",
    },
  };
}

export default async function PostPage(props) {
  const { slug } = await props.params;

  const [post, gallery] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }),
    client.fetch(otherPostsGalleryQuery, { slug }),
  ]);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-2 text-zinc-400">
          The post “{slug}” doesn’t exist or isn’t published.{" "}
          <Link href="/portfolio/personal/blog" className="text-rose-300 hover:text-rose-200 transition">
            ← Back to Blog
          </Link>
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6 text-xs text-zinc-400">
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold">
        <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
          {post.title}
        </span>
      </h1>

      {post.author?.name && (
        <div className="mt-3 flex items-center gap-3 text-sm text-zinc-400">
          {post.author.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.author.image}
              alt={post.author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <span>{post.author.name}</span>
        </div>
      )}

      {post.coverImage && (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-zinc-800">
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      {post.excerpt && (
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">{post.excerpt}</p>
      )}

      <div className="prose prose-invert mt-8 max-w-none">
        <RichText value={post.body} />
      </div>

      {post.categories?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.categories.map((c) => (
            <Link
              key={c._id}
              href={`/portfolio/personal/blog/categories?slug=${c.slug}`}
              className="inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300 hover:border-rose-400/40 transition"
            >
              <span className="inline-block h-1.5 w-1.5 mr-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-300" />
              {c.title}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/portfolio/personal/blog"
          className="inline-flex items-center rounded-full border border-rose-400/40 bg-zinc-950/60 px-4 py-2 text-sm text-rose-200
                     hover:border-rose-400/70 hover:text-rose-100 hover:shadow-[0_0_20px_-8px_rgba(244,114,182,0.55)] transition"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* More posts — always render the section; show message if empty */}
      <section className="mt-12">
        <h2 className="text-xl font-medium mb-4">
          <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
            More posts
          </span>
        </h2>

        {gallery && gallery.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map(({ slug: s, title, coverImage, coverAlt, publishedAt }) => (
              <Link
                key={s}
                href={`/portfolio/personal/blog/${s}`}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 hover:border-rose-400/40 hover:shadow-[0_0_22px_-10px_rgba(244,114,182,0.45)] transition"
              >
                <div className="relative aspect-[16/9]">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={coverAlt || title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-zinc-900/40 text-zinc-500 text-xs">
                      No image
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-3">
                  <div className="line-clamp-2 text-sm font-medium text-zinc-100">
                    {title}
                  </div>
                  {publishedAt && (
                    <div className="mt-1 text-[11px] text-zinc-500">
                      {new Date(publishedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No other posts yet.</p>
        )}
      </section>
    </article>
  );
}
