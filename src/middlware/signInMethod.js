import axios from 'axios'



const  signInCheck =  (password, email, onRouteChange)=>{
    try {
        axios({
            url: 'http://localhost:3000/signin',
            method: 'post',
            data: {
                "password": password,
                "email": email
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




export default signInCheck

