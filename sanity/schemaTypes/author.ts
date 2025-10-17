import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", type: "text", rows: 3 }),
  ],
});
