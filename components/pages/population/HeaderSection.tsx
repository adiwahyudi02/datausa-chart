interface HeaderSectionProps {
  sourceName?: string;
  sourceDescription?: string;
}

export const HeaderSection = ({
  sourceName,
  sourceDescription,
}: HeaderSectionProps) => {
  return (
    <div className="mt-5 mb-7 p-7 rounded-xl bg-gray-100">
      <h1 className="text-xl font-bold">{sourceName}</h1>
      <p>{sourceDescription}</p>
    </div>
  );
};
