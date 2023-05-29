import { useNavigate } from "react-router-dom";
import User from "../../../types/User";
import UserService from "../../../services/UserServiceJames";

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
      <td>{user.dateCreated.toLocaleString()}</td>
      <td>{user.status}</td>
      <td>{user.id}</td>
    </tr>
  );
};

export default UserElement;
