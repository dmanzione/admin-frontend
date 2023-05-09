import { Card } from "react-bootstrap";
import User from "../../types/User";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <Card>
      <div className="d-flex flex-column align-items-center text-center">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt="Admin"
          className="rounded-circle"
          width="150"
        />
        <div className="mt-3">
          <h4>John Doe</h4>
          <p className="text-secondary mb-1">Full Stack Developer</p>
          <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-outline-primary">Message</button>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;
