import React from "react";
import ReactDOM from "react-dom";

import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const HeadMock: FC<Props> = ({ children }) => {
  return <>{ReactDOM.createPortal(children, document.head)}</>;
};

jest.doMock("next/head", () => HeadMock);
