import { useEffect, useState } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

const Message = () => {
    const [visible,setVisible] = useState(false)
    const [message,setMessage] = useState('')
    const [type,setType] = useState('')

    useEffect(() => {
        bus.addListener('flash',({message,type}) => {
            setVisible(true)
            setMessage(message)
            setType(type)

            const timer = setTimeout(() =>{
                setVisible(false)
            },3000)
            
        })
    },[])
  return (
    <>
    {visible  &&
    <div className={`${styles.message} ${styles[type]}`}>{message}</div>}</>
  )
}

export default Message