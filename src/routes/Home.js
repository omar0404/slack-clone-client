import tw from "tailwind-styled-components"
import NavBar from "../components/Navbar"
import Teams from '../components/Teams'

const Container = tw.div`
flex
flex-1
flex-col
`
const Body = tw.div`
flex
flex-1
`

const Channels = tw.div`
bg-zinc-800	
w-40
`
const Messages = tw.div`
bg-zinc-900
flex-1
p-3	
`
const Home = () => {
  return (
    <Container>
      <NavBar />
      <Body className="flex">
        <Teams />
        <Channels />
        <Messages />
      </Body>
    </Container>
  )
}

export default Home