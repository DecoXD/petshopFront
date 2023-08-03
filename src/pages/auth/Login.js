//hooks
import { useContext, useState } from 'react'
//css
import styles from '../../components/form/Form.module.css'
//components
import InputField from '../../components/form/InputField'
//react router
import { Link } from 'react-router-dom'
import { Context } from '../../context/useContext'
const Login = () => {
  const {login} = useContext(Context)
  const [user,setUser] = useState('')
  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
    console.log(user)
   
  }
  return (
    <section className={styles.form_container }>
      <h1 className="bold">Login</h1>
     <form onSubmit={handleSubmit}>
      <InputField
        text={'Email'}
        type={'email'}
        name={'email'}
        placeholder={'digite seu email'}
        handleOnChange={handleChange}/>
      

        <InputField
        text={'password'}
        type={'password'}
        name={'password'}
        placeholder={'digite sua senha'}
        handleOnChange={handleChange}
        />
        <input type="submit" value="Entrar" />
     </form>
     <p>não possui uma conta? <Link to ='/register' > clique aqui</Link></p>
    </section>
  )
}

export default Login