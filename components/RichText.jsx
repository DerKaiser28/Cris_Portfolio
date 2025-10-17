"use client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const components = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref ? null : value?.asset?.url;
      if (!value?.asset?.url) return null;
      return (
        <div className="my-6 overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src={value.asset.url}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
            priority={false}
          />
          {value.caption && (
            <div className="px-3 py-2 text-xs text-zinc-400">{value.caption}</div>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="mt-8 text-3xl font-semibold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="my-4 leading-relaxed text-zinc-300">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-rose-400/40 pl-4 text-zinc-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="my-4 list-decimal pl-6 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-rose-300 underline decoration-rose-400/40 hover:text-rose-200"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-[85%]">{children}</code>
    ),
  },
};

export default function RichText({ value }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
