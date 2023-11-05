import React from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import './LoginForm.css';

const { Content } = Layout;

const contentStyle = {
  background: '#fff',
  borderRadius: '1rem 1rem 1rem 1rem', // Apply curved border to top only
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional shadow
  paddingLeft: '5%', 
  paddingRight: '5%', 
  paddingTop: '3%',
};

function ProfileUpdate() {
  const [form] = Form.useForm();
  const token = localStorage.getItem('token')

  const handleProfileUpdate = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Profile updated successfully.');
      } else {
        message.error('Profile update failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while updating the profile.');
    }
  };

  return (
    <Layout style={{ height: '75vh', borderRadius: '1rem 1rem 1rem 1rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'}}>
      <Content style={contentStyle}>
        <h2>Profile Update</h2>
        <Form
          form={form}
          onFinish={handleProfileUpdate}
          layout="vertical"
        >
          <Form.Item
            name="firstname"
            label="Change First Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Change Last Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Change Email"
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Previous Password"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default ProfileUpdate;
