import Head from "next/head";

interface Props {
  title: string;
  url: string;
  image: string;
}

const HeadMeta = ({ title, url, image }: Props) => {
  return (
    <Head>
      <title>{title || "Mylog"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "Mylog"} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || "https://my-blog-lygggg-mlog.vercel.app"}
      />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="Mylog" />
    </Head>
  );
};

export default HeadMeta;
