import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import Navbar from './Navbar';

const { Header, Sider, Content } = Layout;

function Test() {
  return (
    <Layout style={{ minHeight: '100vh', width:'100%' }}>
      <Sider>
        <Navbar/>
      </Sider>
      <Layout style={{ marginLeft: 80 }} className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* Header content */}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Content goes here */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Test;
