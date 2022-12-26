import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ArticleHeading from "./ArticleHeading";
import styled from "@emotion/styled";

interface Props {
  content: MDXRemoteSerializeResult;
}

// TODO any type
const MDXComponent = {
  h1: (props: any) => (
    <ArticleHeading level="h1">{props.children}</ArticleHeading>
  ),
  h2: (props: any) => (
    <ArticleHeading level="h2">{props.children}</ArticleHeading>
  ),
  h3: (props: any) => (
    <ArticleHeading level="h3">{props.children}</ArticleHeading>
  ),
  h4: (props: any) => (
    <ArticleHeading level="h4">{props.children}</ArticleHeading>
  ),
  h5: (props: any) => (
    <ArticleHeading level="h5">{props.children}</ArticleHeading>
  ),
  h6: (props: any) => (
    <ArticleHeading level="h6">{props.children}</ArticleHeading>
  ),
  pre: ({ children }: any) => {
    const { className, ...rest } = children.props;
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="pre"
        {...rest}
      >
        {String(children.props.children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code>{rest}</code>
    );
  },
  img: (props: any) => {
    return <img src={props.src} alt={props.alt} />;
  },
  a: (props: any) => (
    <Tooltip hasArrow label={props.href}>
      <a href={props.href}>{props.children}</a>
    </Tooltip>
  ),
};

const ArticleDetail: React.FC<Props> = ({ content }) => {
  return (
    <>
      <Content>
        <MDXRemote {...content} components={MDXComponent} />
      </Content>
    </>
  );
};

export default ArticleDetail;

const Content = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 100px;
  white-space: pre-line;
  h1,
  h2,
  h3,
  h4 {
    margin-bottom: 5px;
  }
  h1 {
    font-size: 30px;
    font-weight: 900;
    margin-top: 30px;
  }
  h2 {
    font-size: 26px;
    font-weight: 800;
    margin-top: 25px;
  }
  h3 {
    font-size: 23px;
    font-weight: 800;
    margin-top: 20px;
  }
  h4 {
    font-size: 21px;
    font-weight: 800;
    margin-top: 15px;
  }
  h5 {
    font-size: 19px;
    font-weight: 800;
    margin-top: 15px;
  }
  h6 {
    font-size: 17px;
    font-weight: 800;
    margin-top: 15px;
  }
  strong {
    color: ${(props) => props.theme.blue[500]};
    font-weight: bold;
  }
  p {
    font-size: 1.1rem;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: -0.4px;
    img {
      width: 100%;
      margin-bottom: auto 10px;
      pointer-events: none;
    }
    em {
      display: block;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      opacity: 0.6;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    code {
      font-family: "Noto Sans KR, sans-serif";
      font-weight: 700;
      border-width: 1px 1px 3px;
      background-color: ${(props) => props.theme.gray[500]};
      border-radius: 0.5rem;
      padding: 0.05rem;
    }
  }
  blockquote {
    background-color: ${(props) => props.theme.orange[100]};
    color: ${(props) => props.theme.black[500]};
    border-radius: 5px;
    padding: 0px 20px;
    line-height: 1.8;
    ul,
    ol {
      padding: 0px 20px;
    }
    li {
      list-style-position: inside;
      margin-bottom: 6px;
    }
  }
  a {
    color: #0a91ff;
    :hover {
      color: #0a91ffa6;
    }
  }
  ul,
  ol {
    position: relative;
    left: 10px;
    white-space: normal;
  }
  li {
    list-style-position: inside;
    margin-bottom: 6px;
    code {
      font-family: "Noto Sans KR, sans-serif";
      font-weight: 700;
      background: ${(props) => props.theme.gray[500]};
      border-width: 1px 1px 3px;
      padding: 2px;
    }
  }
  pre {
    code {
      font-family: "Noto Sans KR, sans-serif";
      font-weight: 200;
      border-width: 1px 1px 3px;
      background-color: ${(props) => props.theme.gray[500]};
      font-size: 1.3rem;
      border-radius: 0.5rem;
      padding: 0.05rem;
    }
  }
`;
