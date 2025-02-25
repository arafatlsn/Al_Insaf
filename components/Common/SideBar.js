import { sidebarOptions } from "@/utils/StaticData";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="h-full bg-foreground">
      <h2 className="mdXYPadding text-primary font-bold ">Al Insaf</h2>
      <ul className="lgXYPadding">
        {sidebarOptions.map((el) => (
          <li key={el?.id}>
            <Link href={el?.route}>
              <p>{el?.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
