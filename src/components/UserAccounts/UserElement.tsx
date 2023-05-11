import { useNavigate } from "react-router-dom";
import User from "../../types/User";
import UserService from "../../services/UserService";

type UserElementProps = {
  user: User;
};

const UserElement = ({ user }: UserElementProps) => {
  const navigate = useNavigate();

  const navToUser = () => {
    navigate(UserService.getUserUrl(user));
  };

  return (
    <tr onClick={navToUser}>
      <td>{user.fullName()}</td>
      <td>{user.role.name}</td>
      <td>{user.id}</td>
      <td>{user.status}</td>
    </tr>
  );
};

export default UserElement;
