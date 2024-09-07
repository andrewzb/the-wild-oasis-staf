import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEditCabin } from "../../services/apiCabins"

export function useEditCabin(){
    const queryClient = useQueryClient()

    const { isLoading : isEditing, mutate: editCabin } = useMutation({
      mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success("Cabin Successfully edited")
        queryClient.invalidateQueries({queryKey: ['cabins']})
      },
      onError: (err) => toast.error(err.message)
    })

    return {isEditing, editCabin}
}