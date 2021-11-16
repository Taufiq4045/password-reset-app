import {Link} from "react-router-dom"
import { Card ,Button} from "react-bootstrap"
import React from "react"
import axios from "axios"
 export default function ChangePassword()
{

    // const param=useParams()
    const id= localStorage.getItem("userId");
    const token= localStorage.getItem("token");

    let [password,setPassword] =React.useState("")
    let [password1,setPassword1] =React.useState("")
    const [err,setErr]=React.useState("")
    const [info,setInfo]=React.useState("")
   
    const handleChange=({target:{name,value}})=>{
        if(name === "password") setPassword(value)
        if(name === "password1") setPassword1(value)
    }
    
    const handleSubmit= async(event)=>{
        event.preventDefault()
        setInfo("")
        console.log(password)
         if(password.length <= 5)
         { setErr("Invalid Password")
            return false
        }
        else if (password !== password1)
        {
            setErr("Passwords donot match")
            return false
        }
        else {
        try{

            // https://passwordreset1.herokuapp.com/
        const response = await axios.post(`https://password-rest.herokuapp.com/resetPassword/${id}/${token}`,{
            password:password
        })
        console.log(response)
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        setPassword("")
        setPassword1("")
        setErr("")
        setInfo("Please log in again with the new password",response.data,)
        }
        catch(err)
        {  
             console.log(err)
            setErr(err.response.data)
        }
    }
    }
    return(
        <>
            <div className="bg-primary card-container">
                    <Card className="card " border="secondary">
                        <Card.Header className="text-center"><h4 className="text-dark">Change Password</h4></Card.Header>
                        <Card.Body>
                            <form >
                                <div className="form-group">
                                <label for="email">New Password : </label>
                                <input type="password" className="form-control" name="password"  value={password} onChange={handleChange}/>
                                </div><br />
                                <div className="form-group">
                                <label for="email">Confirm Password : </label>
                                <input type="password" className="form-control" name="password1"  value={password1} onChange={handleChange}/>
                                <p className="error" >{err}</p>
                                </div>
                                <div className="d-flex justify-content-center ">
                                    <Button  type="submit" onClick={handleSubmit} >Change </Button>
                                </div>
                            </form>
                            <Link  to="/login" className="ac link" ><h5 className="text-dark">{info}</h5></Link>
                        </Card.Body>
                        </Card>
        </div>
        </>
    )
}
