import tw from "tailwind-styled-components"
import useSession from "../hooks/useSession"
import { useNavigate } from "react-router-dom";
const Container = tw.div`
flex
flex-col
bg-zinc-800	
h-12
justify-center
`

const User = tw.div`
self-end
flex
`

const NavBar = () => {
  const navigate = useNavigate();

  const { session: { username } } = useSession()
  const onLogoutClick = () => {
    localStorage.removeItem('token')
    navigate('login')
  }
  return (
    <Container>
      <User>
        <h2 className="text-white">{username}</h2>
        <div onClick={onLogoutClick} className="mx-3 cursor-pointer	">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </div>
      </User>
    </Container>
  )
}
export default NavBar