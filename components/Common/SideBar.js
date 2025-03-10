import { sidebarOptions } from "@/utils/StaticData";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="h-full bg-background">
      <Image src={"/logo.jpg"} className="w-[240px] object-contain" width={640} height={640} alt="logo" />
      <ul className="lgXYPadding">
        {sidebarOptions.map((el) => (
          <li key={el?.id}>
            <Link href={el?.route}>{el?.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
