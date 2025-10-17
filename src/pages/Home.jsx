import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../views/Header";
import EventCarousel from "../components/EventCarousel";

function Home() {
  return (
    <div className="page ">
      <Navbar />
      <main>
        <Header />
        <EventCarousel />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
