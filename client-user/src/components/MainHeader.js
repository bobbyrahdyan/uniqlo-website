import { NavLink } from "react-router-dom";
import UniqloLogo from "./UniqloLogo"

const MainHeader = () => {
  return (
    <>
      <div>
        <UniqloLogo />
      </div>
      <div>
        <NavLink
          to={"home"}
        >Home</NavLink>
        <NavLink
          to={"products"}
        >Product</NavLink>
      </div>
    </>
  );
};

export default MainHeader;
