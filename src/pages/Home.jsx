import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../views/Header";
import Agenda from "../views/Agenda";
import Experiencias from "../views/Experiencias";
import Conexion from "../views/Conexion";
import Mapa from "../views/Mapa";
import EventPopUp from "../views/eventPopUp";
import ConfirmPopUP from "../views/ConfirmPopUP";
import ExitModal from "../views/ExitModal";

function Home() {
  return (
    <div className="page ">
      <Navbar />
      <main>
        <Header />
        <Agenda />
        <Experiencias />
        <Conexion />
        <Mapa />
        {/* <EventPopUp /> */}
        {/* <ConfirmPopUP /> */}
        <ExitModal />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
