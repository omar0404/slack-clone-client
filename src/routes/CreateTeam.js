import { useRef } from 'react';
import { Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) 
  }
`;
const CreateTeam = ({ history }) => {
  const [createTeam] = useMutation(createTeamMutation)
  const name = useRef('')

  const onSubmit = async () => {
    try {
      const response = await createTeam({
        variables: { name: name.current },
      });
      console.log(response);

      const { ok } = response.data.createTeam;

      if (ok) {
        history.push('/');
      }
    } catch (error) {
      console.log(error)
    }



  };

  const onChange = (e) => {
    const { value } = e.target;
    name.current = value
  };


  return (
    <Container text>
      <Header as="h2">Create a team</Header>
      <Form>
        <Form.Field >
          <Input name="name" onChange={onChange} placeholder="Name" fluid />
        </Form.Field>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
      {/* {errorList.length ? (
        <Message error header="There was some errors with your submission" list={errorList} />
      ) : null} */}
    </Container>
  );
}



export default CreateTeam