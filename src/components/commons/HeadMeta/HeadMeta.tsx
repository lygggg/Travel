import Head from "next/head";
import { useRouter } from "next/router";

export interface Props {
  title?: string;
  image?: string;
  description?: string;
}

const HeadMeta: React.FC<Props> = ({ title, image, description }) => {
  const router = useRouter();
  const metaTag = {
    title: "mlog",
    description: "나만의 블로그를 작성해보세요.",
    thumbnailUrl:
      "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/mlog.png",
  };
  return (
    <Head>
      <title>{title ?? metaTag.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title ?? metaTag.title} />
      <meta
        property="og:description"
        content={description ?? metaTag.description}
      />
      <meta
        property="og:url"
        content={`https://mlog.vercel.com${router.asPath}`}
      />
      <meta property="og:image" content={image ?? metaTag.thumbnailUrl} />
      <meta property="og:type" content="website" />
      <meta
        name="google-site-verification"
        content={`${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`}
      />
    </Head>
  );
};

export default HeadMeta;
