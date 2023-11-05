import React, { useState } from 'react';
import { Form, Input, Button, message, Layout, Radio } from 'antd';
import { PlusOutlined, MinusSquareOutlined } from '@ant-design/icons';

const { Content } = Layout;

function AddQuestion({ onClose, onFetch }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const newOptions = form.getFieldValue('options');
      var trueVars = 0;
      // console.log(newOptions);
      newOptions.forEach((option) => {
        if (option.isCorrect === true) {
          trueVars = trueVars + 1;
        }
      });
      if (trueVars > 0) {
        const formData = {
          question: values.question,
          options: values.options,
          algorithm: values.algorithm,
        };
        const token = localStorage.getItem('token');

        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await fetch('http://localhost:5000/quiz/questions/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('New question:', data);
          if (data.success) {
            form.resetFields();
            onClose();
            onFetch();
          } else {
            onFetch();
          }
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      }
      else {
        alert('Please select an option that is the answer to the question')
      }
    } catch (error) {
      console.error(error);
    }
  };

  // This function initializes new form items with default values
  const initializeNewOption = () => ({
    isCorrect: false,
    value: null,
  });

  // Function to handle radio button change
  const handleRadioChange = (e, fieldName) => {
    const newOptions = form.getFieldValue('options');
    var trueVars = 0;
    // console.log(newOptions);
    newOptions.forEach((option) => {
      if (option.isCorrect === true) {
        trueVars = trueVars + 1;
      }
    });
    if (trueVars > 1) {
      newOptions.map((option, index) => {
        if (index !== fieldName) {
          option.isCorrect = false;
        }
      });
      form.setFieldsValue({ options: newOptions });
    }
    console.log(newOptions);
  };

  return (
    <Layout style={{ marginTop: '20px' }}>
      <Content style={{ padding: '1%' }}>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Question:"
            name="question"
            rules={[{ required: true, message: 'Please enter the question.' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Algorithm Name:"
            name="algorithm"
            rules={[{ required: true, message: 'Please enter the algorithm name.' }]}
          >
            <Input />
          </Form.Item>
          <h3>Options:</h3>
          <Content style={{ height: '380px', overflowY: 'auto' }}>
            <Form.List
              name="options"
              initialValue={[initializeNewOption(), initializeNewOption()]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      {fields.length > 2 ? <MinusSquareOutlined className="dynamic-delete-button" onClick={() => { remove(field.name) }} /> : null}
                      <Form.Item
                        label={`Option ${index + 1}`}
                        name={[field.name, 'value']}
                        rules={[{ required: true, message: 'Please enter an option.' }]}
                      >
                        <Input placeholder={`Option ${index + 1}`} />
                      </Form.Item>
                      <Form.Item
                        label="Is Correct:"
                        name={[field.name, 'isCorrect']}
                      >
                        {/* {console.log(field)} */}
                        <Radio.Group onChange={(e) => handleRadioChange(e, field.name)}>
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add(initializeNewOption()); // Initialize new option with default values
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Content>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}

export default AddQuestion;
