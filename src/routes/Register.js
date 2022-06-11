import { gql, useMutation } from "@apollo/client"
import { useRef } from "react";
import { Button, Input, Container, Header } from 'semantic-ui-react';

const registerMutation = gql`
  mutation($username:String!,$email:String!,$password:String!){
    register(username:$username,email:$email,password:$password){
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
const Register = () => {
  const [register, { data, loading, error }] = useMutation(registerMutation)
  const formState = useRef({}).current
  const onSubmit = async () => {
    console.log(...Object.values(formState))
    const { data: { register: { token } } } = await register({ variables: formState })
    localStorage.setItem('token', JSON.stringify(token))
  }
  console.log('data', data)
  console.log('error',)
  if (loading)
    return <h2>LOADING</h2>
  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        error={data?.register?.errors?.filter(e => e.key == 'username').length}
        name="username"
        onChange={val => formState["username"] = val.target.value}
        placeholder="Username"
        fluid
      />
      <Input
        error={data?.register?.errors?.filter(e => e.key == 'email').length}
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
      {error && <div>{JSON.parse(JSON.stringify(error))?.message}</div>}
      <Button onClick={onSubmit}>Submit</Button>
    </Container>
  )
}

export default Register