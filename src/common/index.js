import { backendDomain } from "@/lib/constants"


const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : 'post'
    },


    //lucky-draws
    getDraws : {
        url : `${backendDomain}/api/get-luckydraw`,
        method : 'get'
    },
    joinDraw : {
        url : `${backendDomain}/api/join-draw`,
        method : 'post'
    }
}

export default SummaryApi