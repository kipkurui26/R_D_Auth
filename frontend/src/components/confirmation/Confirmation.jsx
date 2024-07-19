import "./confirmation.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

const Confirmation = ({status, message}) => {
  return (
    <>
      <div className={`confirmation__top ${status==='Error'? 'error': null}`}>
        {status==='Error'? <MdErrorOutline  className="confirmation__top--icon error"/>:<FaRegCheckCircle className="confirmation__top--icon" />}
        <span className="confirmation__title">{status}</span>
      </div>
      <div className="confirmation__body">
        <p className="confirmation__content">
          {message}
        </p>
      </div>
    </>
  );
};

export default Confirmation;
