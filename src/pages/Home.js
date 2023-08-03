//hooks
import { useEffect, useState } from 'react'
//react router dom
import { Link } from 'react-router-dom'
//axios
import api from '../utils/api'
//styles
import styles from './Home.module.css'

const Home = () => {
  const[petList,setPetList] = useState({})
  useEffect(() => {
    const data = api.get('/pets').then((response) => {
     
     setPetList(response.data.pets)
      return
    }).catch((err)=>{
      return err
    })
    
  },[])
  return (
    <section>
      <div className={styles.home_header}>
        <h1 className="bold" >adote um pet</h1>
        <p>veja os detalhes e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {petList.length > 0 &&
          petList.map((pet) => {
            return <div key={pet._id} className={styles.pet_card}>
                  <div 
                    style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} 
                    className={styles.pet_card_image}>                     
                    </div>
                  <h3>{pet.name}</h3>
                  <p>
                    <span className="bold">peso:</span>
                    {pet.weight}Kg
                    </p>
                    {
                    pet.available?
                      (<Link to={`/pets/details/${pet._id}`}>
                        mais detalhes
                      </Link>) :
                      (<div className={styles.adopted_text}>
                        Adotado
                      </div>)
                      
                      }
            </div>
          })
          }
        {petList.length === 0 && 
          <p>smem pets </p>}
      </div>
    </section>
  )
}

export default Home