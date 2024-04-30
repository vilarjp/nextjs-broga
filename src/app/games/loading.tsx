import { PageWrapper } from "@/components/PageWrapper";
import { generateArray } from "@/utils/generateArrays";

export default function GamesLoading() {
  return (
    <PageWrapper>
      <div className="container mx-auto my-6">
        <h1 className="text-3xl my-6">Games</h1>

        <div className="grid grid-cols-4 gap-x-4 gap-y-12">
          {generateArray(12).map((_, index) => (
            <div
              key={index}
              className="flex-center flex-col relative overflow-hidden animate-pulse"
            >
              <div className="h-full w-full bg-slate-600">
                <div className="h-72" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
