import { Spinner } from "@/components/commons/Spinner";

interface HeaderSectionProps {
  sourceName?: string;
  sourceDescription?: string;
  isLoading: boolean;
}

export const HeaderSection = ({
  sourceName,
  sourceDescription,
  isLoading,
}: HeaderSectionProps) => {
  return (
    <div className="mt-5 mb-7 p-7 rounded-xl bg-gray-100 min-h-36 relative">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-xl font-bold">{sourceName}</h1>
          <p>{sourceDescription}</p>
        </>
      )}
    </div>
  );
};
