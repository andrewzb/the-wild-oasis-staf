import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"

import styled from "styled-components"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRout ({ children }) {
    const navigate = useNavigate()
    const { isPending, isAuthenticated} = useUser()

    useEffect(function() {
        if(!isAuthenticated && !isPending) navigate('/login')

    }, [isAuthenticated, isPending, navigate])
    
    if(isPending) return ( <FullPage> <Spinner /> </FullPage>)


    if (isAuthenticated) return children

    return null
}

export default ProtectedRout

