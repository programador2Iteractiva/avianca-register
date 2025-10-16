import logos from "../assets/logos.png";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

function Navbar() {
  return (
    <nav className="relative">
      <img src={logos} alt="Logos de Avianca y colaboradores" className="w-[16rem] md:w-[25rem]" />
      <div className="text-white absolute right-5 cursor-pointer">
        <IoMenu className="w-10 h-10" />
        {/* <IoCloseSharp className="w-10 h-10" /> */}
      </div>
    </nav>
  );
}

export default Navbar;
