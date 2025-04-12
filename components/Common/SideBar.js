"use client";
import { sidebarOptions } from "@/utils/StaticData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname()?.split("/")[1];
  return (
    <aside className="h-full bg-background">
      <Image
        src={"/logo.jpg"}
        className="w-[240px] object-contain"
        width={640}
        height={640}
        alt="logo"
      />
      <ul className="w-full">
        {sidebarOptions?.map((el) => (
          <Link key={el?.id} href={el?.route}>
            <li
              className={`text-[12px] lg:text-[14px] xl:text-[1rem] w-full uppercase font-semibold flex items-center gap-[6px] px-[10px] h-[40px] transition-all ${
                pathname === el?.route || (pathname === "" && el?.route === "/")
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              {el?.icon}
              <span>{el?.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
