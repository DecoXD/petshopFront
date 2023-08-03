import styles from './Select.module.css'

const Select = ({text,name,options,handleOnChange,value}) => {
  return (
    <div className={styles.form_control}>
        <label >
            <span>{text}</span>
            <select name={name} onChange={handleOnChange} value={value || ''}>
                <option >selecione uma opção</option>
                {options.map((opt) => {
                    return <option value = {opt} key={opt}> 
                            {opt}</option>
                })}
            </select>
        </label>
    </div>
  )
}

export default Select