import axios from "../Api/axios";
import useAuth from "./useAuth";
import useFaculty from "./useFaculty";

const useLogout = () => {
    const { Auth,setAuth } = useAuth();
    const {setGlobalFaculty} = useFaculty()
    const logout = async () => {
        setAuth({});
        setGlobalFaculty({})
        try {
            await axios.post('api/Auth/Logout', {
                withCredentials: true,
                    headers : {
                        Authoriztion : `Bearer ${Auth?.accessToken}`,
                    }
            });
            setAuth(prev=>{
                return {...prev, accessToken: null}
            })
        } catch (err) {
            console.error(err);
            
        }

        try {
             await axios.post('api/Auth/revokeToken', {
                withCredentials: true,
                    headers : {
                        Authoriztion : `Bearer ${Auth?.accessToken}`,
                    }
            });
        } catch (err) {
            console.error(err);
        }
       
    }

    return logout;
}

export default useLogout