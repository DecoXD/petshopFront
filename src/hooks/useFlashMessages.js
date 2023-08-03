import bus from "../utils/bus";

import React from 'react'

const useFlashMessages = () => {
 function setFlashMessages(msg,type){
    bus.emit('flash',{
        message:msg,
        type
    })
 }
return {setFlashMessages}
}

export default useFlashMessages