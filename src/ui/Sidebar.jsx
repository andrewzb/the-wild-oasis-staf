import Logo  from "@ui/Logo"
import MainNav  from "@ui/MainNav"
import Uploader from "../data/Uploader"

import styled from "styled-components"

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    pad: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
`

function Sidebar () {
  return (
    <StyledSidebar>
        <Logo />
        <MainNav/>

        <Uploader />
    </StyledSidebar>
  )
}

export default Sidebar
