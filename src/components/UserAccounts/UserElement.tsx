import { useNavigate } from "react-router-dom";
import User from "../../types/User";

type UserElementProps = {
  user: User;
};

const UserElement = ({ user }: UserElementProps) => {
  const navigate = useNavigate();

  const navToUser = () => {
    navigate(`/users/${user.role.name.toLowerCase()}s/${user.id}`);
  };

  return (
    <tr onClick={navToUser}>
      <td>{user.fullName()}</td>
      <td>{user.role.name}</td>
      <td>{user.id}</td>
    </tr>
  );
};

export default UserElement;
