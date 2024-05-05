import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Spinner } from "react-bootstrap";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { Auth  } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        
        !Auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(Auth?.accessToken)}`)
    // }, [isLoading])

    return (
        <>
            {
            isLoading
                    ? <div className="d-flex justify-content-center align-items-center " style={{height:"100vh"}}>
                        <Spinner animation="border"  variant="info" style={{}}/>
                    </div>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin