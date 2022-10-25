import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  url?: string;
  image?: string;
  introduction?: string;
}

const HeadMeta: React.FC<Props> = ({ title, image, introduction }) => {
  const router = useRouter();
  const metaTag = {
    title: "mlog",
    introduction: "나만의 블로그를 작성해보세요.",
    thumbnailUrl:
      "https://mlog-lygggg.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/mlog.png",
  };
  return (
    <Head>
      <title>{title || metaTag.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || metaTag.title} />
      <meta
        property="og:description"
        content={introduction || metaTag.introduction}
      />
      <meta
        property="og:url"
        content={`https://mlog.vercel.com${router.asPath}`}
      />
      <meta property="og:image" content={image || metaTag.thumbnailUrl} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default HeadMeta;
