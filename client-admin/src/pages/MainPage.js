import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import NavBar from "../components/NavBar";

export default function MainPage() {
  return (
    <section className="main-page">
      <MainHeader />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </section>
  );
}
