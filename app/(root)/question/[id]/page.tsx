type QuestionPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    id: string;
  };
};
const QuestionPage: React.FC<QuestionPageProps> = ({
  params,
  searchParams,
}) => {
  return <div>{params.id}</div>;
};

export default QuestionPage;
