import { Skeleton } from "@/components/ui/skeleton";

const HomeLoading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Hot Topics</h1>
      <div className="mt-10  mb-6 flex flex-wrap gap-5 ">
        <Skeleton className="h-12 flex-1   " />
      </div>
      <div className="flex mb-10 gap-4">
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
        <Skeleton className=" h-10 w-36 " />
      </div>
      <div className="flex flex-col gap-4">
        {Array(6)
          .fill(1)
          .map((_, i) => (
            <Skeleton key={i} className="h-48  w-full rounded-2xl" />
          ))}
      </div>
    </section>
  );
};

export default HomeLoading;
