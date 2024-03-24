import { PageWrapper } from "@/components/PageWrapper";

export default function GameLoading() {
  return (
    <PageWrapper>
      <div className="container mx-auto my-6 animate-pulse">
        <div className="w-2/3">
          <h1 className="h-10 bg-slate-700 my-6" />
          <div className="my-6 h-96 w-full bg-slate-700 rounded-lg" />
          <div className="my-6 flex flex-col">
            <p className="my-2 h-10 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
