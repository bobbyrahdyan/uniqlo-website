import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../helpers";
import { getAllProduct } from "../store/actions";
import MainCard from "./MainCard";

const MainCards = () => {
  const dispatch = useDispatch();
  const { productReducer } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getAllProduct((error) => {
        setLoading(false);
        if (error) return handleError(error);
      })
    );
  }, []);

  return (
    <div className="cards">
      <MainCard data={productReducer} loading={loading} />
    </div>
  );
};

export default MainCards;
