import { useEffect, useState } from 'react'
import api from '../../utils/api'
import styles from './PetDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import useFlashMessages from '../../hooks/useFlashMessages'

const PetDetails = () => {
  const [pet,setPet] = useState(false)
  const [token] = useState(localStorage.getItem('token')||'')
  const {id} = useParams();
  const {setFlashMessages} = useFlashMessages()

    const schedule = async (pet) => {
        
        let msgType = 'sucess'
        const data = api.patch(`/pets/schedule/${pet._id}`,{
                headers:{
                    Authorization:`Bearer ${JSON.parse(token)}`
                }                              
                
            
        }).then((response) => {
            
            return response.data

        }).catch((err) => {
            msgType = 'error'
            
            return err.response.data
        })
        const res = await data
       
        setFlashMessages(res.message,msgType)
    }

  useEffect(() =>{
    api.get(`/pets/${id}`).then((response) => {
        setPet(response.data.pet)
       
    }).catch((err) => {
        console.log(err)
    })
  },[id])

  return (
 
    <div>
       {pet && 
        <section className={styles.pet_details_container}>
            <div className={styles.pet_details_header}>
                <h1>conhecendo o pet {pet.name}</h1>
                <p>se tiver interesse, marque uma visita para conhecê-lo</p>
            </div>
            <div className={styles.pet_images}>
                {pet.images.map((image,idx) => {
                    return <img 
                    src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
                    alt={pet.name} 
                    key={idx}/>
                })}
            </div>
            <p><span className="bold">Peso:</span>{pet.weight}Kg</p>
            <p><span className="bold">Idade:</span>{pet.age}Kg</p>
            {token? (<button onClick={() => schedule(pet)}>solicitar visita</button>) : (<p> voce precisa <Link to={'/register'}>criar uma</Link> conta</p>)}
        </section>
        }
    </div>
 
  )
}

export default PetDetails