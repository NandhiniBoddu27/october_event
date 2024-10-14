import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, DatePicker, Row, Col, Card, Table, ConfigProvider } from 'antd';
import { UserOutlined, AppstoreOutlined, BarChartOutlined, DashboardOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import Plotly from 'plotly.js-dist-min';
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();


    // Fetch data from APIs (mock data with more variations)
    useEffect(() => {

      fetchKPIs();
      fetchCustomerSegments();
      fetchMonthlyRevenue();
      fetchTopCustomers();
      fetchProductPerformance();
      fetchCustomerSatisfaction();
      fetchChurnRisk();
      fetchRFMSegmentation()
  
      
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

  const domain="http://localhost:800"
  const fetchKPIs = async () => {
    try {
      const response = await fetch('http://localhost:8000/kpis');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      setKpiData(data);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    }
  };

  const fetchCustomerSegments = async () => {
    try {
      const response = await fetch(domain+'/customer_segments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomerSegments(data);
    } catch (error) {
      console.error('Error fetching customer segments:', error);
    }
  };

  const fetchMonthlyRevenue = async () => {
    try {
      const response = await fetch(domain+'/monthly_revenue');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMonthlyRevenue(data);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
    }
  };

  const fetchTopCustomers = async () => {
    try {
      const response = await fetch(domain+'/top_customers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTopCustomers(data);
    } catch (error) {
      console.error('Error fetching top customers:', error);
    }
  };

  const fetchProductPerformance = async () => {
    try {
      const response = await fetch(domain+'/product_category_performance');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProductPerformance(data);
    } catch (error) {
      console.error('Error fetching product performance:', error);
    }
  };

  const fetchCustomerSatisfaction = async () => {
    try {
      const response = await fetch(domain+'/customer_satisfaction');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSatisfactionScore(data);
    } catch (error) {
      console.error('Error fetching customer satisfaction:', error);
    }
  };

  const fetchChurnRisk = async () => {
    try {
      const response = await fetch(domain+'/churn_risk');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChurnRisk(data);
    } catch (error) {
      console.error('Error fetching churn risk:', error);
    }
  };

  const fetchRFMSegmentation = async () => {
    try {
      const response = await fetch(domain+'/rfm_segmentation');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRfmSegmentation(data);
    } catch (error) {
      console.error('Error fetching RFM segmentation:', error);
    }
  };

  const createCustomerSegmentsChart = () => {
    const data = [{
      values: customerSegments[0].values,
      labels: customerSegments[0].labels,
      type: 'pie'
    }];
    const layout = { title: 'Customer Segment Distribution', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('customerSegmentsChart', data, layout);
  };

  const createMonthlyRevenueChart = () => {
    const data = [{
      x: monthlyRevenue[0].x,
      y: monthlyRevenue[0].y,
      type: 'scatter',
      mode: 'lines+markers'
    }];
    const layout = { title: 'Monthly Revenue Trend', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('monthlyRevenueChart', data, layout);
  };

  const createProductPerformanceChart = () => {
    const data = [{
      y: productPerformance.y,
      x: productPerformance.x,
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
      value: satisfactionScore[0].value,
      title: { text: 'Customer Satisfaction Score' },
      gauge:satisfactionScore[0].gauge, 
        domain: satisfactionScore[0].domain,
        hovertemplate: satisfactionScore[0].hovertemplate,
        alignmentgroup: satisfactionScore[0].alignmentgroup,
    }];
    const layout = { height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('satisfactionScoreChart', data, layout);
  };

  const createChurnRiskChart = () => {
    const data = [{
      values: churnRisk[0].values,
      labels: churnRisk[0].labels,
      type: 'pie'
    }];
    const layout = { title: 'Churn Risk Distribution', height: 300, margin: { t: 30, b: 30, l: 30, r: 30 } };
    Plotly.newPlot('churnRiskChart', data, layout);
  };

  const createRFMSegmentationChart = () => {
    const data = [{
      x: rfmSegmentation[0].x,
      y: rfmSegmentation[0].y,
      z: rfmSegmentation[0].z,
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
            <Menu.Item key="2" icon={<BarChartOutlined />} onClick={()=>{
              console.log("clicked")
              navigate('/cdp-transformation')
            }}>
              Analytics
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} onClick={()=>{
              console.log("clicked")
              navigate('/userflow')
            }}>
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