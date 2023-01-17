import { useNavigate } from "react-router-dom";

export default function MainHome() {
  const navigate = useNavigate();
  return (
    <div className="home-img">
      <button
        onClick={() => navigate("/products")}
        to={"/products"}
        className="btn text-light fw-bold"
      >
        Get started
      </button>
    </div>
  );
}
