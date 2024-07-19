import ButtonInput from "../form/ButtonInput";
import TextInput from "../form/TextInput";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useEffect, useRef, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/Constants";
import Confirmation from "../confirmation/Confirmation";
import { IoClose } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = async (e) => {
    setIsloading(true);
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/api/token/", formData);
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

      const userDetails = await AxiosInstance.get("/api/user/");
      localStorage.setItem("user", JSON.stringify(userDetails.data));
      setIsloading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsloading(false);
      setStatus("Error");
      setShowConfirmation(true);

      if (error.response && error.response.status === 401) {
        setMessage("Invalid credentials. Please try again.");
      } else {
        setMessage("An error occured! Please try again.");
      }
    }
  };
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [showConfirmation]);

  const clearForm = () => {
    setFormData({
      ...formData,
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
    });
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <section className="auth">
      <form
        className="auth__form"
        method="POST"
        ref={form}
        onSubmit={handleAuth}
      >
        <h2 className="auth__form--title">Login</h2>
        <TextInput
          inputLabel={"Username"}
          inputType={"text"}
          placeholder={"johndoe26"}
          inputName={"username"}
          value={formData.username}
          onChange={handleFormChange}
        />
        <TextInput
          inputLabel={"Password"}
          inputType={"password"}
          placeholder={"********"}
          inputName={"password"}
          value={formData.password}
          onChange={handleFormChange}
        />
        <ButtonInput
          type={"submit"}
          buttonName={loading ? "Authenticating..." : "Login"}
        />
        <p className="auth__form--redirect">
          Don&apos; t have an account yet? <Link to="/register">Register</Link>
        </p>
      </form>
      {showConfirmation && (
        <div className="confirmation">
          <div
            className="confirmation__close"
            onClick={handleCloseConfirmation}
          >
            <IoClose />
          </div>
          <Confirmation status={status} message={message} />
        </div>
      )}
    </section>
  );
};

export default Login;
