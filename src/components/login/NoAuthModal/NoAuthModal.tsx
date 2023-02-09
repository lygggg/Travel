import styled from "@emotion/styled";
import { Button } from "src/components/commons";
import { ModalProps } from "src/contexts/modalContext";
import useKeyClick from "src/hooks/useKeyClick";
import useOutsideClick from "src/hooks/useOutsideClick";
import { useRef } from "react";
import { useRouter } from "next/router";

const NoAuthModal = ({ onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const goHome = () => {
    if (onClose) onClose();
    router.push({ pathname: "/" });
  };

  useOutsideClick(modalRef, goHome);

  useKeyClick({
    events: [
      {
        key: "Escape",
        keyEvent: () => goHome?.(),
      },
    ],
  });

  return (
    <>
      <ModalContainer ref={modalRef}>
        <Title>관리자의 승인이 필요한 페이지입니다.</Title>
        <ExitButton
          onClick={goHome}
          variant="secondary"
          aria-label="카카오 로그인하기"
        >
          닫기
        </ExitButton>
      </ModalContainer>
    </>
  );
};

const Title = styled.h1`
  color: ${(props) => props.theme.white};
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 15px;
`;

const ExitButton = styled(Button)`
  height: 55px;
  width: 200px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const ModalContainer = styled.div`
  display: flex;
  gap: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 250px;
  background-color: ${(props) => props.theme.gray[700]};
  border-radius: 5px;
`;

export default NoAuthModal;
