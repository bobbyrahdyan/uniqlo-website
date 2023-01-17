import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from "../helpers";
import { getCategory, addProduct, updateProduct } from "../store/action";

export default function ProductForm({ btnText, data, done, cancel }) {
  const dispatch = useDispatch();
  const { categoryReducer } = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState(["", "", ""]);

  useEffect(() => {
    if (btnText === "Create") {
      setProduct({});
      setImages(["", "", ""]);
    } else if (btnText === "Update") {
      setProduct(data);
      setImages(data.Images.map((el) => ({ id: el.id, imgUrl: el.imgUrl })));
    }
  }, []);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  function handleProduct(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleImages = (idx, id) => (e) => {
    images[idx] = { id, imgUrl: e.target.value };
    setImages(images);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (btnText === "Create") {
      dispatch(
        addProduct({ product, images }, (error, success) => {
          setIsLoading(false);
          if (error) return handleError(error);
          handleSuccess(success);
          done();
        })
      );
    } else if (btnText === "Update") {
      dispatch(
        updateProduct(data.id, { product, images }, (error, success) => {
          setIsLoading(false);
          if (error) return handleError(error);
          handleSuccess(success);
          done();
        })
      );
    }
  }

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit} className="shadow">
        <label>Name</label>
        <input
          onChange={handleProduct}
          className="form-control"
          type="text"
          name="name"
          defaultValue={product.name}
        />
        <label>Description</label>
        <textarea
          onChange={handleProduct}
          className="form-control"
          name="description"
          defaultValue={product.description}
        ></textarea>
        <label>Price</label>
        <input
          onChange={handleProduct}
          className="form-control"
          type="number"
          name="price"
          defaultValue={product.price}
        />
        <label>Category</label>
        <select
          onChange={handleProduct}
          className="form-select"
          name="categoryId"
          defaultValue={"default"}
          value={product.categoryId}
        >
          <option value="default" disabled hidden>
            --Select--
          </option>
          {categoryReducer &&
            categoryReducer.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
        </select>
        <label>Main Images</label>
        <input
          onChange={handleProduct}
          className="form-control"
          type="text"
          name="mainImg"
          defaultValue={product.mainImg}
        />
        <label>Other Images</label>
        {images.map((el, idx) => (
          <input
            key={idx}
            onChange={handleImages(idx, el.id)}
            className="form-control"
            type="text"
            defaultValue={images[idx].imgUrl}
          />
        ))}
        <button
          type="submit"
          className={`btn btn-primary ${isLoading && "btn-loading"}`}
        >
          {btnText}
        </button>
        <button className="btn btn-light" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
