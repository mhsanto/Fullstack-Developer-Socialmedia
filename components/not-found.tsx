import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
type NotFoundPageProps = {
  href: string;
  title: string;
  body: string;
  linkText: string;
};
const NotFoundPage = ({ href, title, body,linkText }: NotFoundPageProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full mt-7 gap-4">
      <div className="overflow-hidden rounded">
        <Image
          src="/assets/icons/404.gif"
          width={300}
          height={100}
          alt="404 page"
          className="object-cover"
        />
      </div>{" "}
      <h3 className="h3-bold dark:text-white ">{title}</h3>
      <p className=" paragraph text-dark500_light700 max-w-md text-center">
        {body}
      </p>
      <Link href={href} className="bg-primary-400 rounded-md dark:text-white ">
        <Button>{linkText}</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
