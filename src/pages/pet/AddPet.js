import styles from './AddPet.module.css'
import api from '../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessages from '../../hooks/useFlashMessages'
import PetForm from '../../components/form/PetForm'
const AddPet = () => {
 const navigate = useNavigate()
 const{setFlashMessages} = useFlashMessages()
 const [token] = useState(localStorage.getItem('token'))

 const registerPet = async(pet) => {
    let msgType = 'sucess'
    const formData = new FormData()
    await Object.keys(pet).forEach((key) => {
        if(key === 'images'){
            for(let i = 0 ;i<pet[key].length;i++){
                formData.append('images',pet[key][i])
            }
        }
        else{
            formData.append(key,pet[key])
        }
    })

   
    const data = await api.post('/pets/create',formData,{
        headers:{
            Authorization: `Bearer ${JSON.parse(token)}`,
            "Content-Type":"multipart/form-data"
        }
    }).then((response) => {
        return response.data
    }).catch((err)=>{
        msgType = 'error'
        return  err.response.data
    })
    
    setFlashMessages(data.message,msgType)
   
    if(msgType!=='error'){
        navigate('/pets/mypets')
    }

 }
    return (
    <section className={styles.addpet_header}>
        <div>
            <h1 className='bold'>cadastre seu pet</h1>
            <p>depois ele ficara para adoção</p>
        </div>

        <PetForm
        handleSubmit={registerPet}
        btnText={'Cadastrar Pet'}/>
    </section>
  )
}

export default AddPet