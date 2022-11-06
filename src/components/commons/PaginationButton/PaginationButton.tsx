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
    <span data-testid="pagination-button" onClick={handleOnClick}>
      {dataLength < total && button}
    </span>
  );
};

export default PaginationButton;
