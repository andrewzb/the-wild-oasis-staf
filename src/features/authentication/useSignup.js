import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { signup as signupApi } from "../../services/apiAuth"


export function useSignup(){
 
    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast.success('Account successfuly created! Please verufy the new account from user\'s email address.')
        }
    })

    return { signup, isPending }
}