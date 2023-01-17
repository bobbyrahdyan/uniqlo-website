import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <nav className="bg-primary text-light sticky-top">
      <NavLink to={"products"}>Products</NavLink>
      <NavLink to={"categories"}>Categories</NavLink>
      <NavLink to={"register"}>Register</NavLink>
      <a onClick={logOut}>Logout</a>
    </nav>
  );
}
