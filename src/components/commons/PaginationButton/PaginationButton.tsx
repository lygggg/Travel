export interface Props {
  button: React.ReactNode;
  total: number | string;
  dataLength: number;
  event: () => void;
}

const PaginationButton = ({ button, total, dataLength, event }: Props) => {
  const handleOnClick = () => {
    event();
  };

  return <span onClick={handleOnClick}>{dataLength < total && button}</span>;
};

export default PaginationButton;
