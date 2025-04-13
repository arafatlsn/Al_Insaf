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

export function DrawerDemo() {
  const pathname = usePathname()?.split("/")[1];

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="text-lightText">
          <ThreeDotsIcon />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Image src={"/logo.jpg"} width={60} height={60} alt="logo" />
          </DrawerTitle>
        </DrawerHeader>
        <ul className="flex flex-col w-full mt-[1rem]">
          {sidebarOptions?.map((el) => (
            <Link key={el?.id} href={el?.route}>
              <DrawerClose className="w-full">
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
      </DrawerContent>
    </Drawer>
  );
}
