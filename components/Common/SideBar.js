import { sidebarOptions } from "@/utils/StaticData";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="h-full bg-background">
      <h2 className="mdXYPadding text-primary font-bold ">Al Insaf</h2>
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
