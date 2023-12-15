import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type MetricProps = {
  icon?: React.ReactNode;
  imgUrl?: string;
  value: string | number;
  title: string;
  textStyles: string;
  alt?: string;
  href?: string;
  isAuthor?: boolean;
};

const Metric: React.FC<MetricProps> = ({
  icon,
  imgUrl,
  value,
  title,
  textStyles,
  alt,
  href,
  isAuthor,
}) => {
  const metricContent = (
    <>
      <div className="flex gap-0.5">
        {imgUrl ? (
          <Image
            src={imgUrl || "/assets/icons/user.svg"}
            width={20}
            height={20}
            alt={alt || "User Avatar"}
            className={`object-contain ${href ? "rounded-full" : ""}`}
          />
        ) : (
          <>{icon}</>
        )}
        <p className={cn("text-xs flex items-center gap-1", textStyles)}>
          {value}
          <span className={`small-regular line-clamp-1 `}>{title}</span>
        </p>
      </div>
    </>
  );
  if (href) {
    return <Link href={href}>{metricContent}</Link>;
  }
  return <div className="">{metricContent}</div>;
};

export default Metric;
