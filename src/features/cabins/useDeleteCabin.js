import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins"

export function useDeleteCabin(){

    const queryClient = useQueryClient()
    
    const {isPending: isDeleting, mutate : deleteCabin} = useMutation({
      mutationFn: deleteCabinApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['cabins']
        })
        toast.success("cabin successfully deleted")
      },
      onError: (err) => toast.error(err.message)
    })

    return { isDeleting, deleteCabin }
}
