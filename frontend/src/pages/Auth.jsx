import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Layout, Form, Input, Button, Typography, Space, ConfigProvider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;
const { Title, Text } = Typography;

const theme = {
  token: {
    colorPrimary: '#ffb800',
    colorLink: '#ffb800',
    colorLinkHover: '#f7931f',
    colorBgLayout: '#ffffff',
    colorInfo: '#ffb800'
  },
  components: {
    Layout: {
      siderBg: 'rgb(245,245,245)',
      triggerBg: 'rgb(241,241,241)'
    }
  }
};

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onFinish = (values) => {
    setLoading(true);
    // Implement your login logic here
    console.log('Received values of form: ', values);
    setTimeout(() => {
      setLoading(false);
      message.success('Login successful!');
    }, 2000);
    navigate('/dashboard');

  };

  const onGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/dashboard');
    message.success('Google Sign-In successful!');
    // Implement your Google Sign-In logic here
  };

  const onGoogleLoginError = () => {
    message.error('Google Sign-In failed. Please try again.');
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <img src='/path-to-your-logo.png' alt='CustomerCompass 360 Logo' style={{ width: '150px', marginBottom: '16px' }} />
              <Title level={2} style={{ margin: 0, color: '#ffb800' }}>CustomerCompass 360</Title>
              <Text type='secondary'>Navigating Customer Insights with Precision</Text>
            </div>
            <Form
              name='normal_login'
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }} loading={loading}>
                  Log in
                </Button>
              </Form.Item>
              <Form.Item>
                <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
                  <GoogleLogin
                    onSuccess={onGoogleLoginSuccess}
                    onError={onGoogleLoginError}
                    useOneTap
                    render={(renderProps) => (
                      <Button 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        icon={<GoogleOutlined />} 
                        style={{ width: '100%' }}
                      >
                        Sign in with Google
                      </Button>
                    )}
                  />
                </GoogleOAuthProvider>
              </Form.Item>
              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <a href='/forgot-password' style={{ fontSize: '14px' }}>Forgot password?</a>
                  <Text type='secondary' style={{ fontSize: '14px' }}>
                    New user? <a href='/signup'>Sign up</a>
                  </Text>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LoginPage;

