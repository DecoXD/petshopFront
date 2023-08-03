//CSS
import styles from '../../components/form/Form.module.css'
//react router
import { Link } from 'react-router-dom'
//components
import InputField from '../../components/form/InputField'
//hooks
import { useState,useContext } from 'react'
import { Context } from '../../context/useContext'




const Register = () => {

  const[user,setUser] = useState('')

  const {register} = useContext(Context)


  const handleChange= (e) => {
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})   
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(user)
    //send user to DataBase
  }

  return (
    <section className={styles.form_container}>
      <h1 className='bold'>registrar</h1>
      <form onSubmit={handleSubmit}>
        <InputField 
          text={'nome'} 
          type={'text'}
          name={'name'}
          placeholder={'digite seu nome'}
          handleOnChange={handleChange}/>
        <InputField 
          text={'Telefone'} 
          type={'text'}
          name={'phone'}
          placeholder={'digite seu Telefone'}
          handleOnChange={handleChange}/>
        <InputField 
          text={'Email'} 
          type={'email'}
          name={'email'}
          placeholder={'digite seu email'}
          handleOnChange={handleChange}/>
        <InputField 
          text={'Senha'} 
          type={'password'}
          name={'password'}
          placeholder={'digite sua senha'}
          handleOnChange={handleChange}/>
        <InputField 
          text={'Confirm Password'} 
          type={'password'}
          name={'confirmPassword'}
          placeholder={'confirme sua senha'}
          handleOnChange={handleChange}/>
        
        <input type="submit" value="cadastrar" />
      </form>
      <p>ja tem conta? <Link to = {`/login`}>entrar</Link></p>
    </section>
  )
}

export default Register