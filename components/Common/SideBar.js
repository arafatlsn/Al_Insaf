"use client";
import { sidebarOptions } from "@/utils/StaticData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname()?.split("/")[1];
  const session = useSession();
  if (pathname === "auth") {
    return <></>;
  }
  const user = session?.data?.user;
  return (
    <aside className="hidden md:flex flex-col md:min-w-[180px] md:max-w-[180px] xl:min-w-[220px] xl:max-w-[220px] h-screen border-r-[1px] border sticky top-0 bg-background">
      <div className="max-w-[220px] max-h-[220px] min-w-[220px] min-h-[220px] cShadow">
        <Image
          src={"/logo.jpg"}
          className="w-full h-full object-contain "
          width={640}
          height={640}
          alt="logo"
        />
      </div>
      <ul className="w-full grow">
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
      {session?.status === "authenticated" && (
        <div className="w-full flex items-center gap-[.5rem] px-[.5rem] md:pb-[1rem] xl:pb-[2rem]">
          <div className="max-w-[40px] min-w-[40px] max-h-[40px] min-h-[40px] rounded-[50%]">
            <Image
              title={user?.name}
              width={40}
              height={40}
              src={user?.image}
              alt={`${user?.name}'s profile`}
              className="w-full h-full rounded-[50%]"
            />
          </div>
          <div className="w-full overflow-hidden">
            <h5
              title={user?.name}
              className="w-full text-[14px] uppercase font-semibold leading-[2ex] truncate"
            >
              {user?.name}
            </h5>
            <button
              onClick={() => signOut()}
              className="text-[12px] bg-failed px-[.5rem] uppercase font-semibold text-white rounded-[3px]"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
