"use client";
import * as React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import Link from "next/link";
import { sidebarOptions } from "@/utils/StaticData";
import { usePathname } from "next/navigation";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon";
import { signOut, useSession } from "next-auth/react";

export function DrawerDemo() {
  const pathname = usePathname()?.split("/")[1];
  const session = useSession();
  const user = session?.data?.user;
  return (
    <Drawer direction="right">
      <DrawerTrigger className="bg-background" asChild>
        <button className="text-lightText">
          <ThreeDotsIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col bg-background">
        <DrawerHeader>
          <DrawerTitle>
            <Image src={"/logo.jpg"} width={60} height={60} alt="logo" />
          </DrawerTitle>
        </DrawerHeader>
        <ul className="grow flex flex-col w-full mt-[1rem]">
          {sidebarOptions?.map((el) => (
            <Link key={el?.id} href={el?.route}>
              <DrawerClose className="w-full bg-background">
                <li
                  className={` text-[12px] lg:text-[14px] xl:text-[1rem] w-full uppercase font-semibold flex items-center gap-[6px] px-[10px] h-[40px] transition-all ${
                    pathname === el?.route ||
                    (pathname === "" && el?.route === "/")
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {el?.icon}
                  <span>{el?.title}</span>
                </li>
              </DrawerClose>
            </Link>
          ))}
        </ul>
        {session?.status === "authenticated" && (
          <div className="w-full flex items-center gap-[.5rem] px-[.5rem] mb-[3rem]">
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
      </DrawerContent>
    </Drawer>
  );
}
