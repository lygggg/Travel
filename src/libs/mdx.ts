import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export const mdxToHtml = async (source: string) => {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
  });

  return {
    html: mdxSource,
  };
};
