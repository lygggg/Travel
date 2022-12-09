import { useEffect } from "react";
import { RecoilState, useRecoilValue } from "recoil";

interface Props<T> {
  node: RecoilState<T>;
  onChange: jest.Mock<any, any>;
}

const RecoilObserver = <T>({ node, onChange }: Props<T>) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

export default RecoilObserver;
