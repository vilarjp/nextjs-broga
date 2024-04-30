export const Error = ({ errorMessage }: { errorMessage?: string }) => {
  if (!errorMessage) return null;

  return (
    <div className="my-2">
      <small className="text-sm text-red-500">{errorMessage}</small>
    </div>
  );
};
