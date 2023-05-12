import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import User from "../../../types/User";
import UserElement from "./UserElement";
import UserService from "../../../services/UserService";
import UserSearch from "./UserSearch";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const nav = useNavigate();

  const handleCreate = () => {
    nav("new");
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <UserSearch searchCallback={() => {}} />
        </Col>
        <Col xs={3}>
          <div className="d-grid gap-2">
            <Button onClick={handleCreate}>Create New</Button>
          </div>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UserElement key={user.id} user={user} />;
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UserList;
