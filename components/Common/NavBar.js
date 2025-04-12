import Image from "next/image";
import { DrawerDemo } from "./DrawerComponent";

const NavBar = () => {
  return (
    <nav className="block md:hidden sticky top-0 bg-background py-[.3rem] px-[1rem] border-b-[1px] z-[1]">
      <div className="w-full flex items-center justify-between">
        <div>
          <Image src={"/logo.jpg"} alt="logo" width={50} height={50} />
        </div>
        <div>
          <DrawerDemo />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
