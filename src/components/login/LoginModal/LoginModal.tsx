import styled from "@emotion/styled";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Modal, Button } from "src/components/commons";
import github from "/public/github-logo.png";

interface Props {
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
            onClick={() => signIn("google")}
            variant="primary"
            rounded="default"
          >
            Google 로그인
          </LoginButton>
          <LoginButton
            onClick={() => signIn("github")}
            variant="default"
            rounded="default"
          >
            Github 로그인
          </LoginButton>
          <LoginButton
            onClick={() => signIn("kakao")}
            variant="secondary"
            rounded="default"
          >
            Kakao 로그인
          </LoginButton>
          <Exit onClick={handleClose}>취소</Exit>
        </ModalContainer>
      </Modal>
    </>
  );
};

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
  font-size: 1.2rem;
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
