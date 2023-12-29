import QuestionCard from "@/components/card/question-card";
import NotFoundPage from "@/components/shared/not-found";
import LocalSearchBar from "@/components/search/local-searchbar";
import { IQuestion } from "@/databases/question.modal";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { SearchCode } from "lucide-react";
import { URLProps } from "@/types";


const SingleTags: React.FC<URLProps> = async ({ params, searchParams }) => {
    const result = await getQuestionByTagId({
        tagId: params.id,
        page: 1, searchQuery: searchParams.q

    })
    return (<>
        <div className="dark:text-white w-full flex justify-between flex-col-reverse sm:flex-row sm:items-center">
            <h2 className="h2-bold">{result?.tagTitle}</h2>
        </div>
        <div className="mt-10 w-full">
            <LocalSearchBar
                route="/"
                iconsPosition="left"
                searchIcons={<SearchCode className="dark:invert" />}
                placeholder="Search for tag related questions"
                otherClasses=""
            />
        </div>
        <div className="w-full mt-8">
            {result?.questions?.length ? (
                result.questions?.map((question: any) => (
                    <QuestionCard
                        key={question._id}
                        _id={question._id}
                        title={question.title}
                        content={question.content}
                        tags={question.tags}
                        upvotes={question.upvotes}
                        answers={question.answers.length}
                        views={question.views}
                        author={question.author}
                        createdAt={question.createdAt}
                    />
                ))
            ) : (
                <NotFoundPage
                    href="/ask-question"
                    title="No tag related questions to show"
                    body="Be the first one to create a question.Break the silence with your presence."
                    linkText="Ask a question"
                />
            )}
        </div>
        {/* filters by user selection */}
    </>);
}

export default SingleTags;