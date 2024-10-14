import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, ConfigProvider, Card } from 'antd';
import { HomeOutlined, BarChartOutlined, UserOutlined, AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import mermaid from 'mermaid';
import { useNavigate } from 'react-router-dom';


const { Header, Content, Sider } = Layout;
const { Title } = Typography;


const customTheme = {
  token: {
    colorPrimary: '#EAB308',
    colorLink: '#EAB308',
    colorLinkHover: '#f7931f',
    colorBgLayout: '#ffffff',
    colorInfo: '#EAB308'
  },
  components: {
    Layout: {
      siderBg: 'rgb(245,245,245)',
      triggerBg: 'rgb(241,241,241)'
    }
  }
};

const MermaidDiagram = ({ mermaidCode }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="mermaid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} dangerouslySetInnerHTML={{ __html: mermaidCode }} />
  );
};

const WebsiteFlow = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const mermaidCode = `
    graph TD
    A[User Visits Site] --> B{Authenticated?}
    B -->|No| C[Display SSO Login]
    C --> D[Google SSO Process]
    D --> E[Redirect to Dashboard]
    B -->|Yes| E
    E --> F[Initialize Dashboard]
    F --> G[Load KPIs]
    F --> H[Load Charts]
    F --> I[Load Tables]
    G --> J[Dashboard Ready]
    H --> J
    I --> J
    J --> K[User Interacts with Dashboard]
    K --> L[Update Components]
    L --> K
  `;

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            backgroundColor: '#ffffff',
            boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)'
          }}
          theme="light"
          width="20%"
        >
          <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
            <AppstoreOutlined style={{ fontSize: '32px', color: '#EAB308' }} />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={['3']}
            mode="inline"
            style={{
              '& .ant-menu-item': {
                margin: '4px 0',
                borderRadius: '4px',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }
              }
            }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={()=>{
              console.log("clicked")
              navigate('/dashboard');
            }}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<BarChartOutlined />} onClick={()=>{
              console.log("clicked")
              navigate('/cdp-transformation');
            }}>
              Analytics
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              User Flow
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggleCollapsed,
              style: { fontSize: '18px', padding: '0 24px', cursor: 'pointer' }
            })}
            <Title level={3} style={{ margin: '16px 0 16px 24px' }}>CDP - Website Flow</Title>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <Card style={{ minHeight: 360 }}>
              <Title level={4} style={{ textAlign: 'center' }}>User Flow Diagram</Title>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 40px)' }}>
                <MermaidDiagram mermaidCode={mermaidCode} />
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default WebsiteFlow;