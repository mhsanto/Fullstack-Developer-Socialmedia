import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
type LocalSearchBarProps = {
  route: string;
  iconsPosition: string;
  placeholder: string;
  otherClasses?: string;
  searchIcons: React.ReactNode;
};
const LocalSearchBar: React.FC<LocalSearchBarProps> = ({
  iconsPosition,
  placeholder,
  route,
  searchIcons,
  otherClasses,
}) => {
  return (
    <div
      className="flex items-center
    gap-2 background-light800_darkgradient px-3 min-h-max py-2 w-full rounded-lg"
    >
      {iconsPosition === "left" && searchIcons}
      <Input
        className={cn(
          "focus-visible:ring-0 bg-transparent        focus:outline-none focus:border-none placeholder focus-visible:ring-offset-0  border-0  rounded-lg text-dark-500 dark:text-white",
          otherClasses
        )}
        placeholder={placeholder}
      />
      {iconsPosition === "right" && searchIcons}
    </div>
  );
};

export default LocalSearchBar;
