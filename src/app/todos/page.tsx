"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FloatButton, InputNumber, Input, Button, Select, DatePicker, Row, Col, Modal, Table, Tag, Space, notification, InputNumberProps } from 'antd';
import './todos.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styless from './todos.module.css';


const { Option } = Select;

//const URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/todos';
const URL = "https://servertodo-production.up.railway.app/api/todos/";

const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<any>();
  const [editTodo, setEditTodo] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState<number>(0);


  const fetchTodos = async () => {
    try {
      const response = await axios.get(URL);
      setTodos(response.data);
      setLoading(true);
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
      notification.success({ message: 'Todo added successfully' });
    } catch (error) {
      console.error('Error adding todo:', error);
      notification.error({ message: 'Failed to add todo' });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`${URL}${id}`);
      fetchTodos();
      notification.success({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      notification.error({ message: 'Failed to delete todo' });
    }
  };

  const handleEditTodo = (todo: any) => {
    setEditTodo(todo);
    setIsModalVisible(true);
  };

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`${URL}${editTodo._id}`, {
        text: newTodo,
        hashtags: selectedHashtags,
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null
      });
      setIsModalVisible(false);
      setNewTodo('');
      setSelectedHashtags([]);
      setDueDate(undefined);
      fetchTodos();
      notification.success({ message: 'Todo updated successfully' });
    } catch (error) {
      console.error('Error updating todo:', error);
      notification.error({ message: 'Failed to update todo' });
    }
  };

  useEffect(() => {
    Aos.init();
    fetchTodos();
  }, []);

  return (
    <>
      {!loading ? (
        <div style={{display:"flex", flexDirection: "row", justifyContent: "center", marginTop: "20%"}}>
        <div className={styless.loading}></div>
        </div> ) : (
        <div>
          <div className="todo-container bg-white text-black m-2 p-2 " style={{ boxShadow: "10px 0 10px black", borderRadius: "5px", opacity: "0.9" }}>
            <h1 data-aos="fade-left" style={{
              justifyContent: "center",
              textAlign: "center",
              color: "rgb(11, 1, 1)",
              margin: "5%",
              padding: "2%"
            }}>
              ToDo List</h1>
            <Row gutter={16} className="mb-4">
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
                  style={{ width: '100%', margin: 'auto' }}
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Button type="primary" onClick={editTodo ? handleUpdateTodo : handleAddTodo}>{editTodo ? 'Update Todo' : 'Add Todo'}</Button>
              </Col>
            </Row>

            <Modal
              title={editTodo ? "Edit Todo" : "Add Todo"}
              visible={isModalVisible}
              onOk={editTodo ? handleUpdateTodo : handleAddTodo}
              onCancel={() => setIsModalVisible(false)}
            >
              <Row gutter={16} className="mb-4">
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
                    style={{ width: '100%', margin: 'auto' }}
                  />
                </Col>
                <Col xs={24} sm={12} md={4}>

</Col>
  {/* <InputNumber
    placeholder="Priority"
    value={priority}
    onChange={(value: number | null) => {
      if (value !== null) {
        setPriority(value);
      }
    }}
    

  /> */}
              </Row>
            </Modal>
          </div>
          <Table
            dataSource={todos}
            columns={[
              {
                title: 'Text',
                dataIndex: 'text',
                key: 'text',
                render: (text: string) => <span>{text}</span>,
              },
              {
                title: 'Hashtags',
                dataIndex: 'hashtags',
                key: 'hashtags',
                render: (hashtags: string[]) => (
                  <>
                    {hashtags.map((tag: string) => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </>
                ),
              },
              {
                title: 'Due Date',
                dataIndex: 'dueDate',
                key: 'dueDate',
                render: (dueDate: string) => <span>{dueDate}</span>,
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (text: any, record: any) => (
                  <Space size="small">
                    <Button type="dashed" onClick={() => handleDeleteTodo(record._id)}>Delete</Button>
                    <Button type="primary" onClick={() => handleEditTodo(record)}>Edit</Button>
                  </Space>
                ),
              },
            ]}
          />
        </div>
      )}
    </>
  );
}

export default TodosPage;

