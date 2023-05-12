import { Form } from "react-bootstrap";

interface UserSearchProps {
  searchCallback: Function;
}

export default function UserSearch({ searchCallback }: UserSearchProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Sorry, this isn't implemented just yet");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control placeholder="ID Search" />
      </Form.Group>
    </Form>
  );
}
