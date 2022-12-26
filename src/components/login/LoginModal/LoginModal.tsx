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
            onClick={() => signIn("google")}
            variant="primary"
            aria-label="구글 로그인하기"
          >
            <Image
              src={googleIcon}
              alt="google 로그인"
              width={25}
              height={25}
            />
            <LoginText>Google 로그인</LoginText>
          </LoginButton>
          <LoginButton
            onClick={() => signIn("github")}
            variant="default"
            aria-label="깃허브 로그인하기"
          >
            <Image
              src={githubIcon}
              alt="깃허브 로그인"
              width={25}
              height={25}
            />
            <LoginText>Github 로그인</LoginText>
          </LoginButton>
          <LoginButton
            onClick={() => signIn("kakao")}
            variant="secondary"
            aria-label="카카오 로그인하기"
          >
            <Image src={kakaoIcon} alt="카카오 로그인" width={25} height={25} />
            <LoginText>Kakao 로그인</LoginText>
          </LoginButton>
          <Exit aria-label="취소" href="#" role="button" onClick={handleClose}>
            취소
          </Exit>
        </ModalContainer>
      </Modal>
    </>
  );
};

const LoginText = styled.h2`
  width: 100%;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Exit = styled.a`
  color: ${(props) => props.theme.gray[400]};
  font-size: 1rem;
  font-weight: 500;
  margin-top: 12px;
  cursor: pointer;
`;

const LoginButton = styled(Button)`
  height: 55px;
  width: 340px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const ModalContainer = styled.div`
  display: flex;
  gap: 11px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 320px;
  background-color: ${(props) => props.theme.gray[700]};
  border-radius: 5px;
`;

export default LoginModal;
