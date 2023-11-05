import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function LevelForm() {
  const [form] = Form.useForm();

  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost:5000/add/levels', values);
      setMessage(response.data.message);
      alert(message);
      form.resetFields();
    } catch (error) {
      setMessage('Failed to add a new level.');
    }
  };

  return (
    <div>
      <h2>Add a New Level</h2>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Algorithm Name:"
          name="algorithm_name"
          rules={[{ required: true, message: 'Please enter the algorithm name.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Level Number:"
          name="level_no"
          rules={[
            { required: true, message: 'Please enter the level number.' },
            // { type: 'number', message: 'Level number must be a number.' },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <button type='sybmit'>Add Level</button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LevelForm;
