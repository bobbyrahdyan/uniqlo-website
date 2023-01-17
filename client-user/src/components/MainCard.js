import { useNavigate } from "react-router-dom";
import { rupiahFormat } from "../helpers";
import LoadingAnimate from "./LoadingAnimate"

function MainCard({ data, loading }) {
  const navigate = useNavigate();

  return loading ? (
    <LoadingAnimate />
  ) : (
    data.map((el) => (
      <div
        onClick={() => {
          navigate("/detail/" + el.slug);
        }}
        className="card shadow-lg"
        key={el.id}
      >
        <div className="img">
          <img src={el.mainImg} alt="" />
        </div>
        <div>
          <h6 className="fw-bold">{el.name}</h6>
        </div>
        <div>
          <a>{el.Category.name}</a>
          <h5 className="fw-bold">{rupiahFormat(el.price)}</h5>
        </div>
      </div>
    ))
  );
}

export default MainCard;
