import styled from "@emotion/styled";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Modal, Button } from "src/components/commons";
import googleIcon from "/public/icons-google.png"; // TODO image sprite로 바꿀예정
import kakaoIcon from "/public/icons-kakao.png";
import githubIcon from "/public/icons-github.png";

export interface Props {
  isActive: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<Props> = ({ isActive, handleClose }) => {
  return (
    <>
      <Modal isActive={isActive}>
        <ModalContainer>
          <Title>소셜 계정으로 로그인</Title>
          <LoginButton
            data-testid="google-login-button"
            onClick={() => signIn("google")}
            variant="primary"
          >
            <Image src={googleIcon} alt="google" width={25} height={25} />
            <LoginText>Google 로그인</LoginText>
          </LoginButton>
          <LoginButton
            data-testid="github-login-button"
            onClick={() => signIn("github")}
            variant="default"
          >
            <Image src={githubIcon} alt="google" width={25} height={25} />
            <LoginText>Github 로그인</LoginText>
          </LoginButton>
          <LoginButton
            data-testid="kakao-login-button"
            onClick={() => signIn("kakao")}
            variant="secondary"
          >
            <Image src={kakaoIcon} alt="google" width={25} height={25} />
            <LoginText>Kakao 로그인</LoginText>
          </LoginButton>
          <Exit data-testid="login-close" onClick={handleClose}>
            취소
          </Exit>
        </ModalContainer>
      </Modal>
    </>
  );
};

const LoginText = styled.p`
  width: 100%;
`;
const Title = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1.3rem;
`;

const Exit = styled.div`
  color: ${(props) => props.theme.gray[400]};
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.8rem;
  cursor: pointer;
`;

const LoginButton = styled(Button)`
  height: 3.5rem;
  width: 18rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.4rem;
`;

const ModalContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 320px;
  background-color: ${(props) => props.theme.gray[700]};
  padding: 1.5rem;
  border-radius: 0.3rem;
`;

export default LoginModal;
