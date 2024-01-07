"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalSearchFilters from "./global-search-filter";
import { globalSearch } from "@/lib/actions/global.action";

const ShowGlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([
    {
      type: "Helo",
      id: "you",
      title: "hey",
    },
  ]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  useEffect(() => {
    const fetchResult = async () => {
      const res = await globalSearch({ query: global, type });
      setResult(JSON.parse(res!));
      setIsLoading(true);
      try {
      } catch (error) {
        console.error(`show-global-result.tsx: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };
  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-900 py-5 shadow-sm dark:bg-dark-400  dark:text-light-900">
      <p className="text-dark400_light900 paragraph-semibold px-5">
        <GlobalSearchFilters />
      </p>
      <div className="my-5 h-1 bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <Loader2 size={40} className="animate-spin" />
            <p className="text-dark400_light900 paragraph-semibold px-5 py-2">
              Fetching Data From Database
            </p>
          </div>
        ) : (
          <div>
            {result.length > 0 ? (
              result.map((item, index) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-3 hover:bg-light-800/50 dark:hover:bg-dark-500/50 rounded-xl"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    width={20}
                    height={20}
                    alt="Tag"
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_dark500 small-medium mt-1 capitalize small-medium font-bold">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center  flex-col px-5">
                <p className="text-dark400_light900 paragraph-semibold px-5">
                  No Result Found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowGlobalResult;
