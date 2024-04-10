"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Select, DatePicker, Row, Col, Modal } from 'antd';
import './todos.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const { Option } = Select;
const URL = "https://servertodo-production.up.railway.app/api/todos/";
const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<any>();
  const [editTodo, setEditTodo] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);


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

  useEffect(() => {
Aos.init();
    fetchTodos();
  }, []);

  return (
    <>
      {loading ? (
        <div className="todo-container">
          <h1 data-aos="fade-left" style={{ justifyContent: "center", textAlign: "center", color: "rgb(227, 156, 162)" }}>ToDo List</h1>
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
              <Button type="primary" onClick={handleAddTodo}>Add Todo</Button>
            </Col>
          </Row>
              <table
      data-aos="fade-left"
      style={{
  backgroundColor: "rgba(255, 0, 0, 0.2)",
  borderRadius: "5px",
  width: "100%",
  borderCollapse: "collapse",
}}>
  <thead>
    <tr style={{ backgroundColor: "rgba(232, 240, 232, 0.5)" }}>
      <th style={{ padding: "10px", border: "1px solid red" }}>Text</th>
      <th style={{ padding: "10px", border: "1px solid red" }}>Hashtags</th>
      <th style={{ padding: "10px", border: "1px solid red" }}>Due Date</th>
      <th style={{ padding: "10px", border: "1px solid red" }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {todos.map((todo: any) => (
      <tr key={todo._id}>
        <td style={{ backgroundColor: "rgba(255, 0, 0, 0.2)", padding: "10px", border: "1px solid red" }}>{todo.text}</td>
        <td style={{ backgroundColor: "rgba(227, 98, 193, 0.2)", padding: "10px", border: "1px solid red" }}>{todo.hashtags}</td>
        <td style={{ backgroundColor: "rgba(5, 245, 49, 0.2)", padding: "10px", border: "1px solid red" }}>{todo.dueDate}</td>
        <td style={{ padding: "10px", border: "1px solid red" }}>
          <Button type="dashed" onClick={() => handleDeleteTodo(todo._id)}>Delete</Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
     
          {/* Modal para editar */}
          <Modal
            title="Edit Todo"
            visible={isModalVisible}
            onOk={handleAddTodo}
            onCancel={() => setIsModalVisible(false)}
          >
            {/* Contenido del modal */}
          </Modal>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
  export default TodosPage;
   

//       <Modal
//         title="Edit Todo"
//         visible={isModalVisible}
//         onOk={handleAddTodo}
//         onCancel={() => setIsModalVisible(false)}
//       >
//         <Input
//           placeholder="Enter todo text"
//           value={editTodo?.text}
//           onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
//         />
//         <DatePicker
//           placeholder="Due Date"
//           value={dueDate}
//           onChange={(date) => setDueDate(date)}
//           style={{ width: '100%', marginBottom: '10px' }}
//         />
//         <Select
//           mode="tags"
//           placeholder="Select hashtags"
//           value={editTodo?.hashtags}
//           onChange={(values: string[]) => setEditTodo({ ...editTodo, hashtags: values })}
//           style={{ width: '100%', marginBottom: '10px' }}
//         />
//       </Modal>
    
//     </div>)}

//   );
// };

// export default TodosPage;
