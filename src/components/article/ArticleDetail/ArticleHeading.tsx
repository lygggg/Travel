import { Heading, Text } from "@chakra-ui/react";

type headings = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface Props {
  children: React.ReactNode;
  level: headings;
}

const CustomHeading: React.FC<Props> = ({ children, level }: Props) => {
  const headingHref = children?.toString().split(" ").join("-");

  return (
    <Heading
      css={{ "&:hover a": { display: "inline" } }}
      id={headingHref}
      as={level}
    >
      {children}{" "}
      <Text
        display="none"
        as="a"
        textDecoration="none"
        href={`#${headingHref}`}
        aria-label={headingHref}
      >
        클릭
      </Text>
    </Heading>
  );
};

export default CustomHeading;
