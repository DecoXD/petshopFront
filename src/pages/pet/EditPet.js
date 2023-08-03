import React, { useEffect, useState } from 'react'
import api from '../../utils/api'

import styles from './AddPet.module.css'
import PetForm from '../../components/form/PetForm'
import useFlashMessages from '../../hooks/useFlashMessages'
import { useParams } from 'react-router-dom'

const EditPet = () => {
    const {setFlashMessages} = useFlashMessages()
    const [pet,setPet] = useState({})
    const [token] = useState(localStorage.getItem('token'|| ''))
    const {id} = useParams()

    const updatePet = async (pet) => {
        let msgType = 'sucess'
        const formData = new FormData()
        await Object.keys(pet).forEach((key) =>{
          if(key ==='images'){
            for(let idx in pet[key]){
              formData.append('images',pet[key][idx])
            }
          }
          else{
            formData.append(key,pet[key])
          }
        })
        const data = await api.patch(`/pets/${pet._id}`,formData,{
          headers:{
            Authorization:`Bearer ${JSON.parse(token)}`,
            "Content-Type":'multipart/form-data'
          }
        }).then((response) => {
          return response.data
        }).catch((err) =>{
          msgType = 'error'
          return err.response.data
        })
        setFlashMessages(data.message,msgType)
    }
    useEffect(() => {
      api.get(`/pets/${id}`,{
        headers:{
          Authorization:`Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setPet(response.data.pet)
      })
     
    },[token,id])
  return (
    <section>
       <div className={styles.addpet_header}>
        <h1>Editando o pet {pet.name}</h1>
        <p>depois da edição os dados serão salvos no sistema</p>
       </div>
       {pet.name && 
        <PetForm
        petData = {pet}
        handleSubmit={updatePet}
        btnText={'update'}
        />}
    </section>
  )
}

export default EditPet