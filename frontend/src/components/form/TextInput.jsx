import './form.css'

const TextInput = ({inputLabel, inputName, inputType, placeholder, onChange, value}) => {
  return (
    <div className="form__element">
        <label className='form__element--label'>{inputLabel}</label>
        <input className='form__label--input' type={inputType} name={inputName} placeholder={placeholder} onChange={onChange} value={value} required/>
    </div>
  )
}

export default TextInput