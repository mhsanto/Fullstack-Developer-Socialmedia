import { Skeleton } from "@/components/ui/skeleton";

const AskQuestionLoadingUi = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>
      <h3 className="mb-2 mt-4 paragraph-regular text-dark100_light900">Question Title</h3>
      <Skeleton className="h-14 w-full mb-8" />
      <p className="text-dark100_light900 mb-2 mt-4">
        Detailed explanation of your problem
      </p>
      <Skeleton className="h-56 w-full " />
      <p className="text-dark100_light900 mt-6 mb-4">Tags*</p>

      <Skeleton className="h-14 w-full " />
      <Skeleton className="h-12 w-36 my-4 " />
    </section>
  );
};

export default AskQuestionLoadingUi;
