import { useState } from 'react'
import styles from './Form.module.css'
import InputField from './InputField'
import Select from './Select'

const PetForm = ({handleSubmit,petData,btnText}) => {
    const[pet,setPet] = useState(petData || {})
    const[preview,setPreview] = useState([])
    const colors = ['Branco',"Preto",'Caramelo',"Cinza","Mesclado"]

    const onFileChange = (e) => {
      let imgs = Array.from(e.target.files)
      
      setPet({...pet,images:imgs})
      setPreview(imgs)
      return
    }

    const handleChange = (e) => {
      setPet({...pet,[e.target.name]:e.target.value})
    }

    const handleColor = (e) => {
      setPet({...pet,color:e.target.options[e.target.selectedIndex].text})
    }

    const submit = (e) => {
      e.preventDefault()
      console.log(pet.images)
      handleSubmit(pet)
    }

  return (
   <form className={styles.form_container} onSubmit={submit}>
    <div className={styles.preview_pet_images}>
      {preview.length > 0? (preview.map((image,idx) => {
          return <img src={URL.createObjectURL(image)} 
          alt={pet.name}
          key={pet.name + idx} />
      })) : 
      (pet.images && pet.images.map((image,idx) => {
        console.log(image)
        return <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
        alt={pet.name}
        key={pet.name + idx} />
      }
      ))}
    </div>
    <InputField
    text= {'imagens do pet'}
    type= {'file'}
    name= {'images'}
    handleOnChange={onFileChange}
    multiple={true}/>

    <InputField
    text= {'nome do pet'}
    type= {'text'}
    name= {'name'}
    handleOnChange={handleChange}
    placeholder={'digite o nome'}
    value={pet.name || ''}
   />
   
    <InputField
    text= {'idade'}
    type= {'number'}
    name= {'age'}
    handleOnChange={handleChange}
    placeholder={'digite a idade'}
    value={pet.age || ''}
    />

    <InputField
    text= {'peso'}
    type= {'number'}
    name= {'weight'}
    handleOnChange={handleChange}
    placeholder={'digite o peso'}
    value={pet.weight || ''}
   />

   <Select
    name = 'color'
    text={'selecione a cor'}
    options={colors}
    handleOnChange={handleColor}
    value={pet.color || ''}
   />
    <input type="submit" value={btnText} />
   </form>
  )
}

export default PetForm