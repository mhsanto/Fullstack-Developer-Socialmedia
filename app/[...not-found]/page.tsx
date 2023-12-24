import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
type NotFoundPageProps = {
  href: string;
  title: string;
  body?: string;
  linkText: string;
};
const NotFoundPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen  gap-4 dark:bg-dark-100 dark:text-light-900">
      <h1 className="h1-bold dark:text-white ">404</h1>
      <h3 className="h3-bold dark:text-white ">Page Not Found</h3>
      <div className="overflow-hidden rounded">
        <Image
          src="/assets/icons/404.gif"
          width={700}
          height={400}
          alt="404 page"
          className="object-cover aspect-video"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className=" paragraph text-dark500_light700 max-w-md text-center">
          Something Went Wrong Please Try Again Later
        </p>
        <Link href="/" className="bg-primary-500/80 rounded-md text-light-900 ">
          <Button>Go To Home Page</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
