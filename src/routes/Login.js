import { gql, useMutation } from "@apollo/client"
import { useRef } from "react";
import { Button, Input, Container, Header } from 'semantic-ui-react';

const loginMutation = gql`
  mutation($email:String!,$password:String!){
    login(email:$email,password:$password){
      ok
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
  const formState = useRef({}).current
  const onSubmit = async () => {
    console.log(...Object.values(formState))
    const { data: { login: { token } } } = await login({ variables: formState })
    localStorage.setItem('token', JSON.stringify(token))
  }
  console.log('data', data)
  console.log('error',)
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