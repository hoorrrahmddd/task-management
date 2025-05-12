import React, { useEffect, useState } from "react";
import { FaHourglassStart, FaSpinner, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const EmployeeDashboard = () => {
  const [taskStats, setTaskStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const userId = user?.id; // تأكد إن اليوزر جاي من اللوجن فيه id

  const mapStatusToDisplay = (status) => {
    switch (status) {
      case "TODO": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "DONE": return "Completed";
      default: return status;
    }
  };

  useEffect(() => {
    if (!userId || !token) return;

    axios.get(`http://localhost:8082/api/tasks/assignee/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      const stats = { pending: 0, inProgress: 0, completed: 0 };
      res.data.forEach(task => {
        const status = mapStatusToDisplay(task.status);
        if (status === "Pending") stats.pending++;
        else if (status === "In Progress") stats.inProgress++;
        else if (status === "Completed") stats.completed++;
      });
      setTaskStats(stats);
    }).catch(err => {
      console.error("Error fetching task stats:", err);
    });
  }, [userId, token]);

  const cards = [
    {
      title: "Pending Tasks",
      count: taskStats.pending,
      icon: <FaHourglassStart size={28} />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "In Progress",
      count: taskStats.inProgress,
      icon: <FaSpinner size={28} />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Completed",
      count: taskStats.completed,
      icon: <FaCheckCircle size={28} />,
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <div style={{ margin: '80px', maxHeight: '200px' }} className="p-6 bg-gray-100 min-h-screen">
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }} className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            style={{ display: 'flex', backgroundColor: 'white', margin: '10px', borderRadius: '20px', maxWidth: '500px', height: '150px' }}
            key={index}
            className={`flex items-center gap-4 p-5 rounded-lg shadow-md ${card.color}`}
          >
            <div style={{ color: '#2c3e50' }}>{card.icon}</div>
            <div>
              <h3 style={{ color: '#2c3e50' }} className="text-lg font-medium">{card.title}</h3>
              <p style={{ color: '#2c3e50' }} className="text-xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
