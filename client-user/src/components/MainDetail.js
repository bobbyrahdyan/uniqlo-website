import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { handleError, rupiahFormat } from "../helpers";
import { getDetailroduct } from "../store/actions";
import LoadingAnimate from "./LoadingAnimate";

const MainDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productReducer: detail } = useSelector((state) => state);
  const [isloading, setisLoading] = useState(true);
  const [mainImg, setMainImg] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    dispatch(
      getDetailroduct(slug, (error) => {
        setisLoading(false);
        if (error === "Not found") navigate(-1);
        if (error) return handleError(error);
      })
    );
  }, []);

  useEffect(() => {
    if (detail.mainImg) setMainImg(detail.mainImg);
  }, [detail]);

  const changeImg = (e) => {
    setMainImg(e.target.src);
  };

  return isloading ? (
    <LoadingAnimate />
  ) : (
    <div className="detail">
      <div className="container shadow-lg">
        <div>
          <div className="main-img">
            <img src={mainImg} alt="" />
          </div>
          <div className="other-img">
            <img onClick={changeImg} src={detail.mainImg} alt="" />
            {detail.Images.map((el) => (
              <img key={el.id} onClick={changeImg} src={el.imgUrl} alt="" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="fw-bold">{detail.name}</h3>
          <p>{detail.description}</p>
          <a>{detail.Category.name}</a>
          <span>{detail.User.username}</span>
          <h5 className="fw-bold">{rupiahFormat(detail.price)}</h5>
          <div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
