import styled from "@emotion/styled";
import { getTextFragment } from "src/utils/getTextFragment";

export interface Props {
  children: string;
}

export const CustomHeadingOne: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);

  return (
    <H1 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H1>
  );
};

export const CustomHeadingTwo: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);

  return (
    <H2 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H2>
  );
};

export const CustomHeadingThree: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);

  return (
    <H3 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H3>
  );
};

export const CustomHeadingFour: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);

  return (
    <H4 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H4>
  );
};

export const CustomHeadingFive: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);
  return (
    <H5 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H5>
  );
};

export const CustomHeadingSix: React.FC<Props> = ({ children }: Props) => {
  const headingHref = getTextFragment(children);

  return (
    <H6 id={headingHref}>
      <a href={`#${headingHref}`}>{children}</a>
    </H6>
  );
};

const H1 = styled.h1`
  & a {
    color: white;
    text-decoration: none;
  }
`;

const H2 = styled.h2`
  & a {
    color: white;
    text-decoration: none;
  }
`;

const H3 = styled.h3`
  & a {
    color: white;
    text-decoration: none;
  }
`;

const H4 = styled.h4`
  & a {
    color: white;
    text-decoration: none;
  }
`;

const H5 = styled.h5`
  & a {
    color: white;
    text-decoration: none;
  }
`;

const H6 = styled.h6`
  & a {
    color: white;
    text-decoration: none;
  }
`;
