import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UniqloLogo from "../components/UniqloLogo";
import { register } from "../store/action";
import { handleError, handleSuccess } from "../helpers";

export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerData, setRegister] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function handleRegister(e) {
        e.preventDefault();
        setIsLoading(true);
        dispatch(
            register(registerData, (error, success) => {
                setIsLoading(false);
                if (error) return handleError(error);
                handleSuccess(success);
                navigate("/");
            })
        )
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setRegister({ ...registerData, [name]: value });
    }

    return (
      <section className="register-page">
        <form onSubmit={handleRegister} className="shadow">
            <UniqloLogo />
            <label>Username</label>
            <input
                onChange={handleInput}
                className="form-control"
                type="text"
                name="username"
            />
            <label>Email</label>
            <input
                onChange={handleInput}
                className="form-control"
                type="email"
                name="email"
            />
            <label>Password</label>
            <input
                onChange={handleInput}
                className="form-control"
                type="password"
                name="password"
            />
            <label>Phone Number</label>
            <input
                onChange={handleInput}
                className="form-control"
                type="text"
                name="phoneNumber"
            />
            <label>Address</label>
            <input
                onChange={handleInput}
                className="form-control"
                type="text"
                name="address"
            />
            <button
                type="submit"
                className={`btn btn-primary ${isLoading && "btn-loading"}`}
            >
            register
            </button>
            <button
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}
            className={`btn btn-light`}
            >
            cancel
            </button>
        </form>
      </section>
    )
}
