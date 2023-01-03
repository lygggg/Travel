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

  return (
    <div onKeyDown={handleOnClick} onClick={handleOnClick} role="presentation">
      {dataLength < total && button}
    </div>
  );
};

export default PaginationButton;
