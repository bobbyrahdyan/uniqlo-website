import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UniqloLogo from "../components/UniqloLogo";
import { login } from "../store/action";
import { handleError } from "../helpers";

export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true)
        dispatch(
          login({ email, password }, (error) => {
            setIsLoading(false)
            if (!error) return navigate("/");
            handleError(error);
          })
        );
      }

    return (
      <section className="login-page">
        <form onSubmit={handleLogin} className="shadow">
            <UniqloLogo />
            <label>Email</label>
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                type="email"
                name="email"
            />
            <label>Password</label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                type="password"
                name="password"
            />
            <button
                className={`btn btn-primary ${isLoading && "btn-loading"}`}
                type="submit"
            >
            Login
            </button>
        </form>
      </section>
    )
}
