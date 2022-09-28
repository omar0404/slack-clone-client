import { gql, useMutation } from "@apollo/client"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Container, Header } from 'semantic-ui-react';
import useSession from "../hooks/useSession";

const loginMutation = gql`
  mutation($email:String!,$password:String!){
    login(email:$email,password:$password){
      ok
      user {
        id
        username
        email
      }
      token
      refreshToken
      errors {
        key
        message
      }
    }
  }
`;
const Login = () => {
  const [login, { data, loading, error }] = useMutation(loginMutation)
  const navigate = useNavigate()
  const { setSession } = useSession()
  const formState = useRef({}).current
  const onSubmit = async () => {
    const { data } = await login({ variables: formState })
    localStorage.setItem('token', JSON.stringify(data?.login?.token))
    localStorage.setItem('refreshToken', JSON.stringify(data?.login?.refreshToken))
    setSession(data?.login?.user)
    navigate('/')
  }
  if (loading)
    return <h2>LOADING</h2>
  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Input
        error={data?.login?.errors?.filter(e => e.key == 'email').length}
        name="email"
        onChange={val => formState["email"] = val.target.value}
        placeholder="Email"
        fluid />
      <Input
        name="password"
        onChange={val => formState["password"] = val.target.value}
        type="password"
        placeholder="Password"
        fluid
      />
      {error && <div>{JSON.parse(JSON.stringify(error)).message}</div>}
      {data?.login?.errors && <div>{JSON.parse(JSON.stringify(data?.login?.errors))?.[0]?.message}</div>}
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  )
}

export default Login