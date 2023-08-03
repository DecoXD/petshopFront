//api
import api from '../utils/api'
//REACT ROUTER
import { useNavigate } from 'react-router-dom'
//HOOKS
import { useEffect, useState } from 'react'
import useFlashMessages from './useFlashMessages'


const useAuth = () => {

const navigate = useNavigate()

const[authenticated,setAuthenticated] = useState(false)

const {setFlashMessages} = useFlashMessages()

useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        setAuthenticated(true)
        
    }
},[])
let msgText = ''
let msgType = 'sucess'

 async function register(user) {

    try {
        const data = await api.post('/users/register',user).then((response) => {
            return response.data
        })
        authUser(data)
        msgText = 'Cadastro realizado com sucesso'
    } catch (error) {
        msgText = error.response.data.message
        msgType = 'error'
    }
    setFlashMessages(msgText,msgType)
 }

 async function login(user) {
    let msgText = 'login efetuado com sucesso'
    let msgType = 'sucess'
    try {
        const data = await api.post('/users/login',user).then((response) => {
            return response.data
        })
        console.log(data)
        authUser(data)
    } catch (error) {
        msgText = error.response.data.message
        msgType = 'error'
    }
    setFlashMessages(msgText,msgType)
    return
 }

 async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token',JSON.stringify(data.token))
    navigate('/')
 }

async function logout(){
    let msgText = 'Logout Realizado com sucesso'
    let msgType = 'sucess'
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')
    setFlashMessages(msgText,msgType)

}

 return {register,authenticated,logout,login}
}

export default useAuth