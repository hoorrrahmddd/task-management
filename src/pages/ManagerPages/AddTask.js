import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import '../../style/AddTask.css';
import axios from "axios";

const AddTask = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigneeId: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    axios.get("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      const employeesOnly = res.data.filter(u => u.role === "EMPLOYEE");
      setEmployees(employeesOnly);
    }).catch(err => {
      console.error("Error fetching employees:", err);
      alert("Failed to fetch employees");
    });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const taskData = {
      title: newTask.title,
      description: newTask.description,
      assigneeId: parseInt(newTask.assigneeId),
      createdById: user?.id       // ✅ هنا بقى ID مش Email
    };

    axios.post("http://localhost:8082/api/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      alert("Task created successfully!");
      setNewTask({ title: "", description: "", assigneeId: "" });
    }).catch(err => {
      console.error("Error creating task:", err);
      alert("Error creating task");
    }).finally(() => setLoading(false));
  };

  return (
    <div className="task-form">
      <h2 style={{ color: "#2c3e50", marginBottom: "30px" }}>Add New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            value={newTask.assigneeId}
            onChange={(e) => setNewTask({ ...newTask, assigneeId: e.target.value })}
            required
          >
            <option value="">Assign to employee...</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#2c3e50" }}
          className="w-100"
        >
          {loading ? "Adding..." : "Add Task"}
        </Button>
      </Form>
    </div>
  );
};

export default AddTask;
