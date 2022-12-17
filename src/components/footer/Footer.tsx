import styled from "@emotion/styled";

const Footer = () => {
  return (
    <Container>
      <FooterText>© 2022 lygggg All rights reserved.</FooterText>
    </Container>
  );
};

const Container = styled.footer`
  justify-content: center;
  font-size: 1.2rem;
  display: flex;
`;

const FooterText = styled.span``;
export default Footer;
