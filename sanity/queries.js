import { groq } from "next-sanity";

export const postsQuery = groq`
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  "coverImage": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  },
  "author": author->{
    _id, name, "image": image.asset->url
  }
}
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  "coverImage": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  "categories": categories[]->{
    _id, title, "slug": slug.current
  },
  "author": author->{
    _id, name, "image": image.asset->url, bio
  }
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const categoriesQuery = groq`
*[_type == "category"] | order(title asc){
  _id, title, "slug": slug.current, description
}
`;

export const postsByCategoryQuery = groq`
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
