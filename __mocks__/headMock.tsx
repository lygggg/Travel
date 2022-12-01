import React from "react";
import ReactDOM from "react-dom";

import type { FC } from "react";

interface HeadMockProps {
  children: React.ReactNode;
}

const HeadMock: FC<HeadMockProps> = ({ children }) => {
  return <>{ReactDOM.createPortal(children, document.head)}</>;
};

jest.doMock("next/head", () => HeadMock);
