import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, message, Spin, Card, Divider } from 'antd';
import { UserOutlined, LockOutlined, AppstoreOutlined } from '@ant-design/icons';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const handleSubmit = (values) => {
    if (!values.email || !values.password) {
      message.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Successfully logged in!');
      navigate('/dashboard');
    }, 2000);
  };

  const onGoogleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    message.success('Successfully logged in with Google!');
  };

  const onGoogleError = () => {
    message.error('Google Sign-In failed. Please try again.');
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EAB308',
          colorLink: '#EAB308',
          colorLinkHover: '#EAB308',
          colorBgLayout: '#EAB308',
          colorInfo: '#EAB308'
        },
        components: {
          Layout: {
            siderBg: '#EAB308',
            triggerBg: '#EAB308'
          }
        }
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5'
      }}>
        <Card
          style={{
            width: 400,
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            borderRadius: '8px'
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <AppstoreOutlined style={{ fontSize: '48px', color: '#EAB308', marginBottom: '16px' }} />
              <Title level={2}>Unified Customer Insights Platform</Title>
              <Text type="secondary">Empowering data-driven decisions through comprehensive customer understanding.</Text>
            </div>
            <Form
              form={form}
              name="login"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  {loading ? <Spin /> : 'Log in'}
                </Button>
              </Form.Item>
            </Form>
            <Divider style={{ margin: '8px 0' }}>Or sign in with</Divider>
            <div style={{ textAlign: 'center' }}>
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text>
                Don't have an account? <a href="#">Sign up</a>
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;