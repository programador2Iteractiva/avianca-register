import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../views/Header";
import Agenda from "../views/Agenda";

function Home() {
  return (
    <div className="page ">
      <Navbar />
      <main>
        <Header />
        <Agenda />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
