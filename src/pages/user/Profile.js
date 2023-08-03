import { useEffect, useState } from 'react'
import styles from '../../components/form/Form.module.css'
import InputField from '../../components/form/InputField'
import api from '../../utils/api'
import useFlashMessages from '../../hooks/useFlashMessages'
import RoundedImage from '../../components/Layout/RoundedImage'

const Profile = () => {
  const [user,setUser] = useState({})
  const [preview,setPreview] = useState('')
  const [token] = useState(localStorage.getItem('token'))
  const {setFlashMessages} = useFlashMessages()
  useEffect(() => {
    if(token){
      try {
        api.get('/users/checkuser',{
          headers:{
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        }).then((response) => {
          setUser(response.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },[token])
 

  const onFileChange = (e) => {
    setPreview(e.target.files[0])
    setUser({...user,[e.target.name]:e.target.files[0]})

  }

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }

  const handleSubmit= async (e) => {
    e.preventDefault()

    console.log('token',token)
    let msgType = 'sucess'
    const formData = new FormData()
    //loop para adcionar ao formData
    
    const userFormData = await Object.keys(user).forEach((key) => formData.append(key,user[key]))
    console.log(formData)
    const data = await api.patch(`/users/edit/${user._id}`,formData,{
      headers:{
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type':'multipart/form-data'
      }
    }).then((response) => {
        return response.data
    }).catch((err) => {
      
      msgType = 'error'
      
      return err.response.data
    })
    
   setFlashMessages(data.message,msgType)
  }
  return (
    <section>
      <div className='t-center'>
        <h1>perfil</h1>
        {(user.image || preview) && (
          <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
        )}
      </div>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <InputField
          text={'imagem'}
          type={'file'}
          name={'image'}
          handleOnChange={onFileChange}/>

        <InputField
          text={'email'}
          type={'email'}
          name={'email'}
          placeholder={'digite seu email'}
          handleOnChange={handleChange}
          value = {user.email || ''}
        />

        <InputField
          text={'nome'}
          type={'name'}
          name={'name'}
          placeholder={'digite seu nome'}
          handleOnChange={handleChange}
          value = {user.name || ''}
          />

        <InputField
        text={'telefone'}
        type={'phone'}
        name={'phone'}
        placeholder={'digite seu telefone'}
        handleOnChange={handleChange}
        value = {user.phone || ''}
        />
        <InputField
        text={'password'}
        type={'password'}
        name={'password'}
        placeholder={'digite sua senha'}
        handleOnChange={handleChange}
        value = {''}
        />
        <InputField
        text={'senha'}
        type={'confirmPassword'}
        name={'confirmPassword'}
        placeholder={'confirme senha'}
        handleOnChange={handleChange}
        value = {''}
        />

        <input type="submit" value="update" />
      
      </form>
    </section>
  )
}

export default Profile