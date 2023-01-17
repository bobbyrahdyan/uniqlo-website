import { Outlet } from "react-router-dom"
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

const MainPage = () => {
    return (
      <>
        <header>
          <MainHeader />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <MainFooter />
        </footer>
      </>
    );
  };

  export default MainPage;
