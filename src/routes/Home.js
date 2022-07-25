import tw from "tailwind-styled-components"
import Teams from '../components/Teams'
import { useMutation, gql } from '@apollo/client';
const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) 
  }
`;
const Container = tw.div`
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
    <Container className="flex">
      <Teams />
      <Channels />
      <Messages />
    </Container>
  )
}

export default Home