import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, deleteProduct } from "../store/action";
import ProductForm from "./ProductForm";
import LoadingAnimate from "./LoadingAnimate";
import { handleError, handleSuccess, rupiahFormat } from "../helpers";

export default function ProductsTable() {
  const dispatch = useDispatch();
  const { productReducer } = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState({});
  const [btnText, setbtnText] = useState("");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (productReducer) setIsLoading(false);
  }, [productReducer]);

  const handleDelete = (id) => () => {
    dispatch(
      deleteProduct(id, (error, success) => {
        if (error) return handleError(error);
        handleSuccess(success);
      })
    );
  };

  return !showForm ? (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowForm(true);
          setbtnText("Create");
        }}
      >
        Add Product
      </button>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Main Image</th>
              <th>Category</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productReducer.map((el, idx) => (
              <tr key={el.id}>
                <td className="fw-bold">{idx + 1}.</td>
                <td>{el.name}</td>
                <td className="description">{el.description}</td>
                <td>{rupiahFormat(el.price)}</td>
                <td>
                  <img src={el.mainImg} alt="" />
                </td>
                <td>{el.Category.name}</td>
                <td>{el.User.username}</td>
                <td>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setbtnText("Update");
                      setData(
                        productReducer.filter((ele) => ele.id === el.id)[0]
                      );
                    }}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete(el.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  ) : (
    <ProductForm
      btnText={btnText}
      data={data}
      done={() => {
        setShowForm(false);
      }}
      cancel={(e) => {
        e.preventDefault();
        setShowForm(false);
      }}
    />
  );
}
