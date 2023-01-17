import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleError, handleSuccess } from "../helpers";
import { addCategory, updateCategory } from "../store/action";

export default function CategoriesForm({ btnTxt, data, done, cancel }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (btnTxt === "Create") setCategory({});
    else if (btnTxt === "Update") setCategory(data);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (btnTxt === "Create") {
      dispatch(
        addCategory(category, (error, success) => {
          setIsLoading(false);
          if (error) return handleError(error);
          handleSuccess(success);
          done();
        })
      );
    } else if (btnTxt === "Update") {
      dispatch(
        updateCategory(data.id, category, (error, success) => {
          setIsLoading(false);
          if (error) return handleError(error);
          handleSuccess(success);
          done();
        })
      );
    }
  }

  return (
    <div className="add-category">
      <form onSubmit={handleSubmit} className="shadow">
        <label>Name</label>
        <input
          onChange={(e) => {
            setCategory({ name: e.target.value });
          }}
          className="form-control"
          type="text"
          defaultValue={category.name}
        />
        <button className={`btn btn-primary ${isLoading && "btn-loading"}`}>
          {btnTxt}
        </button>
        <button className="btn btn-light" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
