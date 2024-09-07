import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { login as loginApi } from "../../services/apiAuth"

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate: login, isPending } = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user)
            navigate('/dashboard', { replace: true })
        },
        onError: (error) => {
            toast.error('provided mail ore password are incorect')

        }
    })
    return { login, isPending }
}