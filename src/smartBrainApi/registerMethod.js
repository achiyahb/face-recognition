import axios from 'axios'



const  setRegister =  (password, email,name, onRouteChange)=>{
    try {
        axios({
            url: 'http://localhost:3000/register',
            method: 'post',
            data: {
                "password": password,
                "email": email,
                "name": name
            }
        } )
            .then(response=>{
                console.log(response)
                onRouteChange()
            })
    } catch (e){
        console.log(e)
    }

}




export default setRegister