import { ReactNode } from "react";
import { RecoilRoot, MutableSnapshot } from "recoil";

interface Props {
  initializeState?: (mutableSnapshot: MutableSnapshot) => void;
  children: ReactNode;
}

const RecoilRootWrapper = ({ initializeState, children }: Props) => {
  return <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
