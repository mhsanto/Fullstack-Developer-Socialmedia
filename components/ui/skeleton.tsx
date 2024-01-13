import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md  background-light700_dark400", className)}
      {...props}
    />
  )
}

export { Skeleton }
