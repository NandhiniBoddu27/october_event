import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, DatePicker, Row, Col, Card, Table, ConfigProvider } from 'antd';
import { UserOutlined, AppstoreOutlined, BarChartOutlined, DashboardOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import Plotly from 'plotly.js-dist-min';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [kpiData, setKpiData] = useState({});
  const [customerSegments, setCustomerSegments] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [productPerformance, setProductPerformance] = useState([]);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [churnRisk, setChurnRisk] = useState([]);
  const [rfmSegmentation, setRfmSegmentation] = useState([]);

  useEffect(() => {
    // Fetch data from APIs (mock data with more variations)
    setKpiData({
      total_lifetime_value: 2345678,
      total_purchases: 78945,
      avg_satisfaction_score: 4.3,
    });
    setCustomerSegments([
      { name: 'Loyal', value: 30 },
      { name: 'Potential', value: 25 },
      { name: 'New', value: 20 },
      { name: 'At Risk', value: 15 },
      { name: 'Lost', value: 10 }
    ]);
    setMonthlyRevenue([
      { month: 'Jan', revenue: 150000 },
      { month: 'Feb', revenue: 180000 },
      { month: 'Mar', revenue: 220000 },
      { month: 'Apr', revenue: 190000 },
      { month: 'May', revenue: 210000 },
      { month: 'Jun', revenue: 240000 },
      { month: 'Jul', revenue: 260000 },
      { month: 'Aug', revenue: 280000 },
      { month: 'Sep', revenue: 270000 },
      { month: 'Oct', revenue: 290000 },
      { month: 'Nov', revenue: 310000 },
      { month: 'Dec', revenue: 350000 }
    ]);
    setTopCustomers([
      { key: '1', customer_id: '001', first_name: 'John', last_name: 'Doe', total_lifetime_value: 25000 },
      { key: '2', customer_id: '002', first_name: 'Jane', last_name: 'Smith', total_lifetime_value: 22000 },
      { key: '3', customer_id: '003', first_name: 'Robert', last_name: 'Johnson', total_lifetime_value: 20500 },
      { key: '4', customer_id: '004', first_name: 'Emily', last_name: 'Brown', total_lifetime_value: 19800 },
      { key: '5', customer_id: '005', first_name: 'Michael', last_name: 'Davis', total_lifetime_value: 18900 }
    ]);
    setProductPerformance([
      { category: 'Electronics', revenue: 980000 },
      { category: 'Clothing', revenue: 750000 },
      { category: 'Books', revenue: 420000 },
      { category: 'Home & Garden', revenue: 680000 },
      { category: 'Sports & Outdoors', revenue: 540000 },
      { category: 'Beauty & Personal Care', revenue: 390000 }
    ]);
    setSatisfactionScore(4.3);
    setChurnRisk([
      { risk: 'Low', value: 55 },
      { risk: 'Medium', value: 30 },
      { risk: 'High', value: 15 }
    ]);
    setRfmSegmentation(Array.from({ length: 100 }, () => ({
      recency: Math.floor(Math.random() * 100),
      frequency: Math.floor(Math.random() * 50),
      monetary: Math.floor(Math.random() * 10000)
    })));
  }, []);

  useEffect(() => {
    // Create charts after data is loaded
    if (customerSegments.length > 0) createCustomerSegmentsChart();
    if (monthlyRevenue.length > 0) createMonthlyRevenueChart();
    if (productPerformance.length > 0) createProductPerformanceChart();
    if (satisfactionScore > 0) createSatisfactionScoreChart();
    if (churnRisk.length > 0) createChurnRiskChart();
    if (rfmSegmentation.length > 0) createRFMSegmentationChart();
  }, [customerSegments, monthlyRevenue, productPerformance, satisfactionScore, churnRisk, rfmSegmentation]);

  const createCustomerSegmentsChart = () => {
    const data = [{
      values: customerSegments.map(segment => segment.value),
      labels: customerSegments.map(segment => segment.name),
      type: 'pie'
    }];
    const layout = { title: 'Customer Segment Distribution', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('customerSegmentsChart', data, layout);
  };

  const createMonthlyRevenueChart = () => {
    const data = [{
      x: monthlyRevenue.map(item => item.month),
      y: monthlyRevenue.map(item => item.revenue),
      type: 'scatter',
      mode: 'lines+markers'
    }];
    const layout = { title: 'Monthly Revenue Trend', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('monthlyRevenueChart', data, layout);
  };

  const createProductPerformanceChart = () => {
    const data = [{
      y: productPerformance.map(item => item.category),
      x: productPerformance.map(item => item.revenue),
      type: 'bar',
      orientation: 'h'
    }];
    const layout = { title: 'Product Category Performance', height: 300, margin: { t: 30, b: 30, l: 100, r: 30 } };
    Plotly.newPlot('productPerformanceChart', data, layout);
  };

  const createSatisfactionScoreChart = () => {
    const data = [{
      type: 'indicator',
      mode: 'gauge+number',
      value: satisfactionScore,
      title: { text: 'Customer Satisfaction Score' },
      gauge: {
        axis: { range: [null, 5] },
        bar: { color: 'darkblue' },
        steps: [
          { range: [0, 2], color: 'red' },
          { range: [2, 3.5], color: 'yellow' },
          { range: [3.5, 5], color: 'green' }
        ],
      }
    }];
    const layout = { height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('satisfactionScoreChart', data, layout);
  };

  const createChurnRiskChart = () => {
    const data = [{
      values: churnRisk.map(risk => risk.value),
      labels: churnRisk.map(risk => risk.risk),
      type: 'pie'
    }];
    const layout = { title: 'Churn Risk Distribution', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('churnRiskChart', data, layout);
  };

  const createRFMSegmentationChart = () => {
    const data = [{
      x: rfmSegmentation.map(point => point.recency),
      y: rfmSegmentation.map(point => point.frequency),
      z: rfmSegmentation.map(point => point.monetary),
      mode: 'markers',
      type: 'scatter3d',
      marker: { size: 5, color: rfmSegmentation.map(point => point.monetary), colorscale: 'Viridis' }
    }];
    const layout = { title: 'RFM Segmentation', height: 400, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('rfmSegmentationChart', data, layout);
  };

  const renderKPICards = () => (
    <Row gutter={[16, 16]}>
      {Object.entries(kpiData).map(([key, value]) => (
        <Col span={8} key={key}>
          <Card title={key.replace(/_/g, ' ').toUpperCase()}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderTopCustomers = () => (
    <Table
      columns={[
        { title: 'Customer ID', dataIndex: 'customer_id', key: 'customer_id' },
        { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Lifetime Value', dataIndex: 'total_lifetime_value', key: 'total_lifetime_value' },
      ]}
      dataSource={topCustomers}
      pagination={false}
    />
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EAB308',
          colorLink: '#EAB308',
          colorLinkHover: '#f7931f',
          colorBgLayout: '#ffffff',
          colorInfo: '#EAB308'
        },
        components: {
          Layout: {
            siderBg: '#ffffff',
            triggerBg: '#EAB308'
          }
        }
      }}
    >
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
            defaultSelectedKeys={['1']}
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
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<BarChartOutlined />}>
              Analytics
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              User Flow
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: '#fff' }}>
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
              <Col span={12}>
                <Title level={3} style={{ margin: '0 0 0 16px' }}>
                  CDP Dashboard
                </Title>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 16 }} />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '16px' }}>
            <Card style={{ marginBottom: '16px' }}>
              <RangePicker style={{ width: '300px' }} />
            </Card>
            <Card style={{ marginBottom: '16px' }}>
              {renderKPICards()}
            </Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Customer Segments">
                  <div id="customerSegmentsChart" style={{ width: '100%', height: 300 }}></div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Monthly Revenue">
                  <div id="monthlyRevenueChart" style={{ width: '100%', height: 300 }}></div>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Top Customers">
                  {renderTopCustomers()}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Product Performance">
                  <div id="productPerformanceChart" style={{ width: '100%', height: 300 }}></div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Customer Satisfaction">
                  <div id="satisfactionScoreChart" style={{ width: '100%', height: 300 }}></div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Churn Risk">
                  <div id="churnRiskChart" style={{ width: '100%', height: 300 }}></div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="RFM Segmentation">
                  <div id="rfmSegmentationChart" style={{ width: '100%', height: 400 }}></div>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;