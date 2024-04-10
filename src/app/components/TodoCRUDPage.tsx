import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Select, DatePicker, Row, Col, Modal } from 'antd'; // Agregamos Modal desde antd

import './TodoCRUDPage.css'; // Estilos personalizados

const { Option } = Select;

const URL = "https://servertodo-production.up.railway.app/api/todos/";

const TodoCRUDPage: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<any>();
  const [editTodo, setEditTodo] = useState<any>(null); // Estado para almacenar el todo que se está editando
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const token = useSelector((state: any) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    fetchTodos();
  }, [token, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      await axios.post(URL, {
        text: newTodo,
        hashtags: selectedHashtags,
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null
      });
      setNewTodo('');
      setSelectedHashtags([]);
      setDueDate(undefined);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${URL}${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // const handleEditTodo = (todo: any) => {
  //   setEditTodo(todo); // Establecemos el todo que se va a editar
  //   setIsModalVisible(true); // Mostramos el modal de edición
  // };

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`${URL}${editTodo._id}`, editTodo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsModalVisible(false); // Ocultamos el modal
      setEditTodo(null); // Restablecemos el estado del todo que se está editando
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Enter a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            mode="tags"
            placeholder="Select hashtags"
            value={selectedHashtags}
            onChange={(values: string[]) => setSelectedHashtags(values)}
            style={{ width: '100%', marginBottom: '10px' }}
          >
            <Option key="work">Work</Option>
            <Option key="personal">Personal</Option>
            <Option key="urgent">Urgent</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <DatePicker
            placeholder="Due Date"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button type="primary" onClick={handleAddTodo}>Add Todo</Button>
        </Col>
      </Row>
      <ul className="todo-list">
        {todos.map((todo: any) => (
          <li key={todo._id}>
            <span>{todo.text}</span>
            <span>{todo.hashtags}</span>
            <span>{todo.dueDate}</span>
            {/* <Button type="primary" onClick={() => handleEditTodo(todo)}>Edit</Button> */}
            <Button type="dashed" onClick={() => handleDeleteTodo(todo._id)}>Delete</Button>
          </li>
        ))}
      </ul>
      {/* Modal para la edición del todo */}
      <Modal
        title="Edit Todo"
        open={isModalVisible}
        onOk={handleUpdateTodo}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="Enter todo text"
          value={editTodo?.text}
          onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
        />
        <DatePicker
            placeholder="Due Date"
            value={dueDate}
            onChange={(date) => setDueDate(date)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        <Select
          mode="tags"
          placeholder="Select hashtags"
          value={editTodo?.hashtags}
          onChange={(values: string[]) => setEditTodo({ ...editTodo, hashtags: values })}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </Modal>
    </div>
  );
};

export default TodoCRUDPage;
