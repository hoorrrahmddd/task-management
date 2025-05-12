import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="min-vh-90">
            <section className="text-center py-5 container">
            <h2 className="display-5 fw-bold mb-3">Welcome to Your Task Management Hub</h2>
            <p className="text-muted mb-4">
            Manage employee tasks efficiently, assign work, and track progress—all in one platform.
            </p>
            <Link 
                to={'/register'}
                style={{backgroundColor: '#2c3e50', width: '200px'}}
                className='btn btn-dark' 
                variant="primary" 
                type="submit"
            >
                Get Started
            </Link>
        </section>

        <section className="py-5 bg-white">
            <div className="container">
            <h3 className="text-center mb-4 fw-semibold">Features</h3>
            <div className="row g-4">
                <div className="col-md-4" style={{borderradius: '8px',boxshadow: '0 0 20px rgba(0, 0, 0, 0.1)'}}>
                <div className="card h-100 text-center p-3" >
                    <div className="card-body">
                    <h5 className="card-title">Task Assignment</h5>
                    <p className="card-text text-muted">
                        Easily assign tasks to employees with deadlines and priorities.
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="card h-100 text-center p-3">
                    <div className="card-body">
                    <h5 className="card-title">Employee Directory</h5>
                    <p className="card-text text-muted">
                        View and manage all employees in an organized directory.
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="card h-100 text-center p-3">
                    <div className="card-body">
                    <h5 className="card-title">Progress Tracking</h5>
                    <p className="card-text text-muted">
                        Monitor real-time progress and generate performance reports.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
