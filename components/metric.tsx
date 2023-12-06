import { cn } from "@/lib/utils";
import Link from "next/link";
type MetricProps = {
  icon: React.ReactNode;
  value: string | number;
  title: string;
  textStyles: string;
  alt?: string;
  href?: string;
  isAuthor?: boolean;
};

const Metric: React.FC<MetricProps> = ({
  icon,
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
        {icon}
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
