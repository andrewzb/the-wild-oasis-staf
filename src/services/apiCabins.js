import supabase, { supabaseUrl } from "./supabase"

async function getCabins(){
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error){
        console.error(error.message)
        throw new Error("cabinst cound be loaded")
    }
    return data;
}

async function deleteCabins(id) {
    const { error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error){
        console.error(error.message)
        throw new Error("cabin cound be deleted")
    }
}

async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/','')
    const imagePath = hasImagePath
    ? newCabin.image
    :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query = supabase.from('cabins')
    if (!id) query = query.insert([{...newCabin, image: imagePath}])
    if (id) query = query.update([{...newCabin, image: imagePath}]).eq('id', id)

    const { data, error } = await query.select().single()

    if (error){
        console.error(error.message)
        throw new Error("cabin cound be created")
    }

    if (hasImagePath) return data

    const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

    if(storageError) {
        await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id)
        console.error(storageError)
        throw new Error("cabin image could not be uploaded and cabin was not created")
    }
    return data
}

export { getCabins, deleteCabins, createEditCabin }
