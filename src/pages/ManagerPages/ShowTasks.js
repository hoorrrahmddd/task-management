import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import axios from "axios";
import '../../style/AddTask.css';

const ShowTasks = () => {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const managerId = user?.id;

  const mapStatusToDisplay = (status) => {
    switch (status) {
      case "TODO": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "DONE": return "Completed";
      default: return status;
    }
  };

  useEffect(() => {
    if (!token || !managerId) return;

    axios.get(`http://localhost:8082/api/tasks/creator/${managerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setTasks(res.data);
      })
      .catch(err => {
        console.error("Error fetching tasks for manager:", err);
      });
  }, [token, managerId]);

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => mapStatusToDisplay(task.status) === filter);

  return (
    <div style={{ margin: "80px" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "30px" }}>All Tasks</h2>

      <Form.Group style={{ maxWidth: "300px", marginBottom: "20px" }}>
        <Form.Label style={{ fontWeight: "bold" }}>Filter by Status:</Form.Label>
        <Form.Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.assigneeName || `User ${task.assigneeId}`}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-sm fw-bold ${
                    mapStatusToDisplay(task.status) === "Pending"
                      ? "bg-warning text-dark"
                      : mapStatusToDisplay(task.status) === "In Progress"
                      ? "bg-info text-dark"
                      : "bg-success text-white"
                  }`}
                >
                  {mapStatusToDisplay(task.status)}
                </span>
              </td>
              <td>{task.createdAt?.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowTasks;
