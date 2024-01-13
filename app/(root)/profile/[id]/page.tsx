import AnswersTab from "@/components/shared/answers-tab";
import ProfileLink from "@/components/shared/profile-link";
import QuestionTab from "@/components/shared/question-tab";
import Stats from "@/components/shared/stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import { CalendarCheck, Link, LocateIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
// export const metadata: Metadata = {
//   title: "User Profile | Developer Medium",
//   description:
//     "Profile page of a user. See their top posts, answers, badges and more.",
// };
export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const userInfo = await getUserInfo({ userId: id });
  return {
    title: `${userInfo?.user?.name || "User Profile"} | Developer Medium`,
    description:
      userInfo?.user.bio ||
      "Profile page of a user. See their top posts, answers, badges and more.",
    image: userInfo?.user.picture,
  };
};
const ProfilePage = async ({ params: { id }, searchParams }: URLProps) => {
  const { userId } = auth();
  const userInfo = await getUserInfo({ userId: id });
  console.log(`ProfilePage -> userInfo ${userInfo}`);

  return (
    <>
      <div className="flex  items-start justify-between sm:flex-row dark:text-light-900">
        {/* <div className="flex flex-col items-start gap-4 sm:flex-row"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-4">
          <div className="flex gap-5 items-center sm:items-start">
            <Image
              src={userInfo?.user.picture}
              width={200}
              height={200}
              alt={userInfo?.user.name || "User Profile Picture"}
              className="rounded-full object-cover"
            />
            <div className="mt-3">
              <h2 className="h2-bold text-dark100_light900">
                {userInfo?.user.name}
              </h2>
              <p className="text-sm text-muted">@{userInfo?.user.username}</p>
              <div className="mt-2.5 flex flex-wrap items-center justify-start gap-1 ">
                {userInfo?.user.location && (
                  <ProfileLink
                    icons={<LocateIcon size={14} />}
                    title={userInfo.user.location}
                  />
                )}
                {userInfo?.user.portfolioWebsite && (
                  <ProfileLink
                    icons={<Link />}
                    href={userInfo.user.portfolioWebsite}
                    title="Portfolio"
                  />
                )}
                {userInfo?.user.joinedAt && (
                  <ProfileLink
                    icons={<CalendarCheck size={14} />}
                    title={`Joined ${getJoinedDate(userInfo?.user.joinedAt)}`}
                  />
                )}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-start gap-5"></div>
              {userInfo?.user.bio && (
                <p className="paragraph-regular text-dark400_light900 mt-8">
                  {userInfo?.user.bio}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 w-full">
            <SignedIn>
              {userId === userInfo?.user.clerkId && (
                <Button className="paragraph-medium  text-dark300_light900 bg-primary-500/80 px-4 md:px-7 w-full sm:w-max">
                  Edit Profile
                </Button>
              )}
            </SignedIn>
          </div>
        </div>
      </div>
      <Stats
        reputation={userInfo?.reputation}
        totalQuestions={userInfo?.totalQuestions}
        totalAnswers={userInfo?.totalAnswers}
        badges={userInfo?.badgeCounts!}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1 text-dark200_light900">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              searchParams={searchParams}
              clerkId={userId!}
              userId={userInfo?.user.id}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab
              searchParams={searchParams}
              clerkId={userId!}
              userId={userInfo?.user.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
