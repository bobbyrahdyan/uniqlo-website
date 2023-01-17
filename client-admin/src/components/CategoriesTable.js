import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategory, deleteCategory } from "../store/action";
import CategoriesForm from "./CategoriesForm";
import LoadingAnimate from "./LoadingAnimate";
import { dateFormat, handleError, handleSuccess } from "../helpers";

export default function CategoriesTable() {
  const [showForm, setShowForm] = useState(false);
  const [btnTxt, setbtnTxt] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { categoryReducer } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    if (categoryReducer) setIsLoading(false);
  }, [categoryReducer]);

  const handleDelete = (id) => () => {
    dispatch(
      deleteCategory(id, (error, success) => {
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
          setbtnTxt("Create");
        }}
      >
        Add Categories
      </button>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryReducer.map((el, idx) => {
              return (
                <tr key={el.id}>
                  <td className="fw-bold">{idx + 1}.</td>
                  <td>{el.name}</td>
                  <td>{dateFormat(el.createdAt)}</td>
                  <td>{dateFormat(el.updatedAt)}</td>
                  <td>
                    <button
                      onClick={() => {
                        setShowForm(true);
                        setbtnTxt("Update");
                        setData(
                          categoryReducer.filter((ele) => ele.id === el.id)[0]
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
              );
            })}
          </tbody>
        </table>
      )}
    </>
  ) : (
    <CategoriesForm
      btnTxt={btnTxt}
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
