

import styles from './InputField.module.css'

const  InputField = ({
    type,
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple}) => {
  return (
    <div className={styles.form_control}>
        <label  >
            <span>{text}</span>
            <input type={type} name={name} 
            placeholder={placeholder} 
            onChange={handleOnChange} 
            value={value}
            multiple ={ multiple? true : false}
            />
        </label>
    </div>
  )
}

export default  InputField
