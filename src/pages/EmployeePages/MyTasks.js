import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import '../../style/MyTasks.css';

export const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const userId = user?.id; // تأكد أن اليوزر فيه id بعد اللوجن

  useEffect(() => {
    if (!userId || !token) return;

    axios.get(`http://localhost:8082/api/tasks/assignee/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      const formattedTasks = res.data.map(task => ({
        ...task,
        status: mapStatusToDisplay(task.status),
        deadline: task.deadline || "--"
      }));
      setTasks(formattedTasks);
    }).catch(err => {
      console.error("Error fetching tasks:", err);
    });
  }, [userId, token]);

  const mapStatusToDisplay = (status) => {
    switch (status) {
      case "TODO": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "DONE": return "Completed";
      default: return status;
    }
  };

  const mapStatusToBackend = (status) => {
    switch (status) {
      case "Pending": return "TODO";
      case "In Progress": return "IN_PROGRESS";
      case "Completed": return "DONE";
      default: return status;
    }
  };

  const updateStatus = (id, newStatus) => {
    const backendStatus = mapStatusToBackend(newStatus);

    axios.put(`http://localhost:8082/api/tasks/${id}/status`, {
      status: backendStatus
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    }).catch(err => {
      console.error("Error updating status:", err);
    });
  };

  return (
    <div className='tasks-container'>
      <h1 style={{ marginBottom: '20px' }} className="text-2xl font-bold mb-10">My Tasks</h1>
      <div className="overflow-x-auto">
        <Table striped bordered hover>
          <thead className="bg-gray-100">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t">
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.deadline}</td>
                <td>
                  {task.status !== "Completed" && (
                    <select
                      style={{ backgroundColor: '#2c3e50', color: 'white' }}
                      value={task.status}
                      onChange={e => updateStatus(task.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
