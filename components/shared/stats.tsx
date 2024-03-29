import { formatAndDivideNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";

type StatsProps = {
  totalQuestions: number | undefined;
  totalAnswers: number | undefined;
  badges: BadgeCounts;
  reputation: number;
};
const StateCard = ({
  imgUrl,
  title,
  value,
}: {
  imgUrl: string;
  title: string;
  value: number;
}) => {
  console.log("value", value);

  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-3 rounded-md border p-6 shadow-light-200 dark:shadow-dark-200 ">
      <Image src={imgUrl} width={40} height={40} alt={title} />
      <p className="paragraph-semibold text-dark200_light900">{value}</p>
      <p className="text-dark200_light900">{title}</p>
    </div>
  );
};

const Stats: React.FC<StatsProps> = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputation,
}) => {
  console.log("na", badges);
  
  return (
    <div className="mt-10">
      <h3 className="h3-semibold text-dark200_light900 ">
        Stats - {reputation}
      </h3>
      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-200 dark:shadow-dark-200 ">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalQuestions ? totalQuestions : 0)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalAnswers ? totalAnswers : 0)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <StateCard
          imgUrl="/assets/icons/prime_badge.svg"
          value={badges?.GOLD}
          title="Master Badge"
        />
        <StateCard
          imgUrl="/assets/icons/silver_badge.svg"
          value={badges?.SILVER}
          title="Silver Badge"
        />
        <StateCard
          imgUrl="/assets/icons/bronze_badge.svg"
          value={badges?.BRONZE}
          title="Bronze Badge"
        />
      </div>
    </div>
  );
};

export default Stats;
