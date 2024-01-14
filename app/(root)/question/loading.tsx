import { Skeleton } from "@/components/ui/skeleton";

const AskQuestionLoadingUi = () => {
  return (
    <section>
      <div className="flex gap-2 mb-5  justify-between items-center">
        <div className="flex gap-2  items-start">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="mt-2 w-20 h-4" />
        </div>
        <div className="flex gap-3">
          <Skeleton className=" w-8 h-8" />
          <Skeleton className=" w-8 h-8" />
          <Skeleton className=" w-8 h-8" />
        </div>
      </div>
      <Skeleton className="h-8 w-full mb-2 " />
      <div className="flex gap-3 mb-7">
        <Skeleton className="h-7 w-80 mb-2 rounded-sm" />
        <Skeleton className="h-7 w-56  rounded-sm" />
        <Skeleton className="h-7 w-56  rounded-sm" />
      </div>
      <Skeleton className="h-56 w-full " />
      <div className="flex mt-5 gap-3">
        <Skeleton className="h-7 w-16 rounded-2xl" />
        <Skeleton className="h-7 w-16 rounded-2xl" />
        <Skeleton className="h-7 w-16 rounded-2xl" />
      </div>
    </section>
  );
};

export default AskQuestionLoadingUi;
