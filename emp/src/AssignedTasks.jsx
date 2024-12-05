import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import AdminPage from './AdminPage';
import AssignTaskForm from './AssignTaskForm';

export default function AssignedTasks() {
    const [tasks, setTasks] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState(null);

    // Fetch task data on component mount
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/assignedtasks'); // Adjust the endpoint as needed
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch task data.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAssigned = () => {
        fetchTasks(); // Refresh the task list
    };

    return (
        <>
            <AdminPage />
            <Container style={{ maxWidth: '800px', marginTop: '2rem' }}>
                <h2 className="text-center my-4">All Assigned Tasks</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Employee ID</th>
                            <th>Task Description</th>
                            <th>Task Start Time</th>
                            <th>Task End Time</th>

                           {/*} <th>Actions</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.task_id}>
                                    <td>{task.task_id}</td>
                                    <td>{task.emp_id}</td>
                                    <td>{task.task_description}</td>
                                    <td>{new Date(task.assigned_at).toLocaleString()}</td>
                                    <td>{new Date(task.task_end_time).toLocaleString()}</td>
                                    {/*<td>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                setSelectedEmployee({
                                                    emp_id: task.emp_id,
                                                    emp_name: `Employee ${task.emp_id}`,
                                                })
                                            }
                                        >
                                            Assign Task
                                        </Button>
                                    </td>*/}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>

            {selectedEmployee && (
                <AssignTaskForm
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onTaskAssigned={handleTaskAssigned}
                />
            )}
        </>
    );
}
