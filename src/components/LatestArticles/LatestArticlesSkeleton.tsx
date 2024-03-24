import { generateIntArray } from "@/utils/generateIntArray";

export const LatestArticlesSkeleton = async () => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl my-6 underline">Latest Articles</h2>

      <div className="grid grid-cols-4 gap-4 h-[42vh]">
        {generateIntArray(4).map((_, index) => (
          <div
            key={index}
            className="flex-center relative overflow-hidden animate-pulse"
          >
            <div className="h-full w-full bg-slate-600">
              <div className="h-96" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
