import { backendDomain, ERROR_MESSAGE, getAccessToken } from "@/lib/constants"



export const getCurrentUser = async () => {
    const token = getAccessToken();

    if(!token){
        return null;
    }

    try{
        const response = await fetch(`${backendDomain}/api/user-details`,{
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if(!response.ok){
            throw new Error(ERROR_MESSAGE)
        }

        return response
    }catch(err){
        console.log(err)
    }
}