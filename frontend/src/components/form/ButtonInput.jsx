import './form.css'

const ButtonInput = ({buttonName, type}) => {
  return (
    <div className="form__element">
        <button className='form__element--button' type={type}>{buttonName}</button>
    </div>
  )
}

export default ButtonInput