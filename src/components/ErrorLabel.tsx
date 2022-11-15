export const ErrorLabel = ({ error }: { error: string | undefined }) => {
  return <span style={{ color: "red" }}>{error}</span>;
};
