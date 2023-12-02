"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";
import { useTheme } from "@/context/theme-provider";
import Image from "next/image";

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="bg-transparent shadow-none relative border-0 outline-none">
      <MenubarMenu>
        <MenubarTrigger >
          {mode === "light" ? (
            <Image
              src="/assets/icons/lightmode.svg"
              alt="lightmode"
              height={30}
              width={30}
              // className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/darkmode.svg"
              alt="DarkMode"
              height={30}
              width={30}
              // className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent>
          {themes.map((theme) => (
            <MenubarItem
              key={theme.id}
              onClick={() => {
                setMode(theme.value);
                if (theme.value !== "system") {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Image
                src={theme.icon}
                alt={theme.label}
                height={20}
                width={20}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === theme.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeSwitcher;
