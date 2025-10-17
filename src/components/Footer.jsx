import logosMobile from "../assets/logosMobile.png";
import logos from "../assets/logos.png";
import starAlliance from "../assets/starAlliance.png";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

function Footer() {
  return (
    <footer>
      <div className="w-full h-16 hidden md:block"></div>
      <div className="w-full h-0.5 my-5 bg-white hidden md:block"></div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="w-1/5 hidden md:block">
          <img src={logos} alt="Logos de Avianca y colaboradores" />
        </div>

        <div>
          <img
            src={starAlliance}
            alt="Logo de Star Alliance"
            className="w-32 md:w-52"
          />
        </div>
        <div className="w-full h-0.5 my-5 bg-white md:hidden block "></div>
        <div className="md:hidden block w-1/2 mt-5">
          <img src={logosMobile} alt="Logos de Avianca y colaboradores" />
        </div>
        <div className="flex flex-col md:flex-row gap-5 text-white items-center">
          <div>Siguenos</div>
          <div className="social-icons flex gap-5 items-center">
            <div className="social-icon">
              <FaInstagram className="w-6 h-6" />
            </div>
            <div className="social-icon">
              <TfiYoutube className="w-6 h-6" />
            </div>
            <div className="social-icon">
              <FaTwitter className="w-6 h-6" />
            </div>
            <div className="social-icon">
              <FaFacebookF className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
