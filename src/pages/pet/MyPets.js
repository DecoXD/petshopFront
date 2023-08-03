import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFlashMessages from '../../hooks/useFlashMessages'
import RoundedImage from '../../components/Layout/RoundedImage'
import api from '../../utils/api'

import styles from './Dashboard.module.css'
const MyPets = () => {
  const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessages} = useFlashMessages()
    const [pets,setPets] = useState('')
    
    useEffect(() => {
    
      api.get('/pets/mypets',{
        headers:{
          Authorization:`Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
       const {userPets} = response.data
       setPets(userPets)
      
      }).catch((err) => {
        console.log(err)
        return
      })
     
    
    },[token])

    async function removePet (id) {
      console.log(id)
      let msgType = 'sucess'

      let data = await api.delete(`/pets/${id}`,{
        headers :{
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id)
        setPets(updatedPets)
        return response.data
      }).catch((err) => {
        msgType = 'error'
        return err.response.data
      })

      setFlashMessages(data.message,msgType)

     
      
    }

    async function concludeAdoption (id) {
      let msgType = 'sucess'

      const data = await  api.patch(`/pets/conclude/${id}`,{
        headers:{
          Authorization:`Bearer ${JSON.parse(token)}`
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
    <div >
        <div className={styles.petlist_header}>
            <h1 className="bold" >mypets</h1>
            <Link to = '/pets/add'>Cadastrat Pet</Link>
        </div>
        <div>
            {pets.length > 0 && pets.map((pet)=>{
              return <div key={pet._id} className={styles.petlist_row}>
                <RoundedImage
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                  alt={pet.name}
                  width={"px75"}
                />
                <span className="bold">{pet.name}</span>
                <div className={styles.actions}>
                  {pet.available ?
                     (<>
                      {pet.adopter && (
                          <button className={styles.conclude} onClick={() => {
                            concludeAdoption(pet._id)
                          }}> Concluir Adoção</button>
                      )}
                      <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                      <button onClick={() => removePet(pet._id)}>Excluir</button>
                         </>) : 
                    ( <p>Pet ja adotado</p>)}
                </div>
              </div>
            })}
            {pets.length === 0 && <p>nao há pets cadastrados</p>}
        
        </div>
        
    </div>
  )
}

export default MyPets