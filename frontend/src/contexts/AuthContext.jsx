import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

export const AuthContext = createContext({});
const client = axios.create({
    baseURL:"http://localhost:8000/api/v1/users"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const [userData,setuserData] = useState(authContext);

    const router = useNavigate();
    
    const handleRegister =  async(name,username,password) => {
        try{
            let request = await client.post("/register",{
                name: name,
                username: username,
                password: password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }
        }catch(err){
            throw err;

        }
    }

    const handleLogin = async (username, password) => {
        try {
            let response = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(response.data)

            if (response.status === httpStatus.OK) {
                console.log("token",response.data.token);

                localStorage.setItem("token", response.data.token);
                
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try{
            let request = await client.get("/get_all_activity",{
                params:{
                    token: localStorage.getItem("token")
                }
            })
            return request.data;
        }catch(err){
            throw err;
        }


    }

    const addToUserHistory = async(meetingCode) => {
        try{
            let request = await client.post("/add_to_activity",{
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request.data;
        }catch (e){
            throw e;

        }
    }
    
    const data = {
        userData,setuserData,handleRegister,handleLogin,getHistoryOfUser,addToUserHistory
    }

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )


}