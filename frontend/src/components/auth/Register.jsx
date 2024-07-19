import { Link, useNavigate } from "react-router-dom";
import ButtonInput from "../form/ButtonInput";
import TextInput from "../form/TextInput";
import "./auth.css";
import { useRef, useState, useEffect } from "react";
import AxiosInstance from "../../utils/AxiosInstance";
import Confirmation from "../confirmation/Confirmation";
import { IoClose } from "react-icons/io5";

const Register = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const [loading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(()=>{
    if (showConfirmation){
      const timer = setTimeout(()=>{
        setShowConfirmation(false);
      }, 6000);

      return ()=> clearTimeout(timer);
    }
  }, [showConfirmation])

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

  const handleAuth = async (e) => {
    setIsloading(true);
    e.preventDefault();
    try {
      const response = await AxiosInstance.post("/api/register/", formData);
      if (response.status === 201) {
        clearForm();
        setStatus("Success");
        setShowConfirmation(true);
        setMessage("Registration successful. Please login to continue.");
        setIsloading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");

      clearForm();
      setIsloading(false);
      setShowConfirmation(true);
      setStatus("Error");
      setMessage("Registration failed. Please try again later.");
    }
  };
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <section className="auth">
      <form
        className="auth__form"
        ref={form}
        method="POST"
        onSubmit={handleAuth}
      >
        <h2 className="auth__form--title">Register</h2>
        <TextInput
          inputLabel={"First name"}
          inputType={"text"}
          placeholder={"John"}
          inputName={"first_name"}
          value={formData.first_name}
          onChange={handleFormChange}
        />
        <TextInput
          inputLabel={"Last Name"}
          inputType={"text"}
          placeholder={"Doe"}
          inputName={"last_name"}
          value={formData.last_name}
          onChange={handleFormChange}
        />
        <TextInput
          inputLabel={"Email Address"}
          inputType={"email"}
          placeholder={"johndoe26@gmail.com"}
          inputName={"email"}
          value={formData.email}
          onChange={handleFormChange}
        />
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
          buttonName={loading ? "Authenticating..." : "Register"}
          type={"submit"}
        />
        <p className="auth__form--redirect">
          Already have an account? <Link to="/login">Login</Link>
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

export default Register;
