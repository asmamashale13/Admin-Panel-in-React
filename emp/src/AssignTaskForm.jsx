import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const AssignTaskForm = ({ employee, onClose, onTaskAssigned }) => {
    const [task, setTask] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/assign-task', {
                emp_id: employee.emp_id,
                task_description: task,
                task_end_time: taskEndTime,
            });
            alert(`Task "${task}" assigned to ${employee.emp_name} at ${taskEndTime}`);
            onTaskAssigned(response.data); // Call callback to update tasks
            onClose();
        } catch (err) {
            console.error('Error assigning task:', err);
            setError('Failed to assign task.');
        }
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Assign Task to {employee.emp_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="task">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task description"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="taskEndTime" className="mt-3">
                            <Form.Label>Task End Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={taskEndTime}
                                onChange={(e) => setTaskEndTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" onClick={onClose} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Assign Task
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default AssignTaskForm;
