import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Table, ConfigProvider } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, ShoppingOutlined, BarChartOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import Plot from 'react-plotly.js';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [customerSegments, setCustomerSegments] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [topCustomers, setTopCustomers] = useState(null);
  const [productPerformance, setProductPerformance] = useState(null);
  const [customerSatisfaction, setCustomerSatisfaction] = useState(null);
  const [churnRisk, setChurnRisk] = useState(null);
  const [rfmSegmentation, setRfmSegmentation] = useState(null);

  useEffect(() => {
    fetchKPIs();
    fetchCustomerSegments();
    fetchMonthlyRevenue();
    fetchTopCustomers();
    fetchProductPerformance();
    fetchCustomerSatisfaction();
    fetchChurnRisk();
    fetchRFMSegmentation();
  }, []);

  const fetchKPIs = async () => {
    try {
      const response = await fetch('/kpis');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setKpis(data);
    } catch (error) {
      console.error('Error fetching KPIs:', error);
    }
  };

  const fetchCustomerSegments = async () => {
    try {
      const response = await fetch('/customer_segments');
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
      const response = await fetch('/monthly_revenue');
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
      const response = await fetch('/top_customers');
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
      const response = await fetch('/product_category_performance');
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
      const response = await fetch('/customer_satisfaction');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomerSatisfaction(data);
    } catch (error) {
      console.error('Error fetching customer satisfaction:', error);
    }
  };

  const fetchChurnRisk = async () => {
    try {
      const response = await fetch('/churn_risk');
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
      const response = await fetch('/rfm_segmentation');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRfmSegmentation(data);
    } catch (error) {
      console.error('Error fetching RFM segmentation:', error);
    }
  };

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

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, height: '10vh' }}>
          {/* Add header content here */}
        </Header>
        <Layout>
          <Sider width='20%' theme='light' breakpoint='lg' collapsedWidth='0'>
            <Menu mode='inline' defaultSelectedKeys={['1']}>
              <Menu.Item key='1' icon={<DashboardOutlined />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key='2' icon={<UserOutlined />}>
                Customers
              </Menu.Item>
              <Menu.Item key='3' icon={<ShoppingOutlined />}>
                Products
              </Menu.Item>
              <Menu.Item key='4' icon={<BarChartOutlined />}>
                Analytics
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              {/* KPIs */}
              <Card title='Key Performance Indicators' style={{ marginBottom: '20px' }}>
                {kpis && (
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
                      <h3>Total Lifetime Value</h3>
                      <p>{kpis.total_lifetime_value}</p>
                    </Card.Grid>
                    <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
                      <h3>Total Purchases</h3>
                      <p>{kpis.total_purchases}</p>
                    </Card.Grid>
                    <Card.Grid style={{ width: '33%', textAlign: 'center' }}>
                      <h3>Avg Satisfaction Score</h3>
                      <p>{kpis.avg_satisfaction_score}</p>
                    </Card.Grid>
                  </div>
                )}
              </Card>

              {/* Customer Segments */}
              <Card title='Customer Segment Distribution' style={{ marginBottom: '20px' }}>
                {customerSegments && (
                  <Plot
                    data={[
                      {
                        values: customerSegments.map(segment => segment.value),
                        labels: customerSegments.map(segment => segment.name),
                        type: 'pie'
                      }
                    ]}
                    layout={{ width: '100%', height: 400 }}
                  />
                )}
              </Card>

              {/* Monthly Revenue */}
              <Card title='Monthly Revenue Trend' style={{ marginBottom: '20px' }}>
                {monthlyRevenue && (
                  <Plot
                    data={[
                      {
                        x: monthlyRevenue.map(item => item.month),
                        y: monthlyRevenue.map(item => item.revenue),
                        type: 'scatter',
                        mode: 'lines+markers'
                      }
                    ]}
                    layout={{ width: '100%', height: 400 }}
                  />
                )}
              </Card>

              {/* Top Customers */}
              <Card title='Top 5 Customers by Lifetime Value' style={{ marginBottom: '20px' }}>
                {topCustomers && (
                  <Table
                    dataSource={topCustomers}
                    columns={[
                      { title: 'Customer ID', dataIndex: 'customer_id', key: 'customer_id' },
                      { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
                      { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
                      { title: 'Lifetime Value', dataIndex: 'total_lifetime_value', key: 'total_lifetime_value' }
                    ]}
                  />
                )}
              </Card>

              {/* Product Category Performance */}
              <Card title='Product Category Performance' style={{ marginBottom: '20px' }}>
                {productPerformance && (
                  <Plot
                    data={[
                      {
                        y: productPerformance.map(item => item.category),
                        x: productPerformance.map(item => item.revenue),
                        type: 'bar',
                        orientation: 'h'
                      }
                    ]}
                    layout={{ width: '100%', height: 400 }}
                  />
                )}
              </Card>

              {/* Customer Satisfaction */}
              <Card title='Customer Satisfaction Score' style={{ marginBottom: '20px' }}>
                {customerSatisfaction && (
                  <Plot
                    data={[
                      {
                        type: 'indicator',
                        mode: 'gauge+number',
                        value: customerSatisfaction.avg_satisfaction_score,
                        gauge: {
                          axis: { range: [null, 10] },
                          bar: { color: '#ffb800' }
                        }
                      }
                    ]}
                    layout={{ width: '100%', height: 400 }}
                  />
                )}
              </Card>

              {/* Churn Risk */}
              <Card title='Churn Risk Distribution' style={{ marginBottom: '20px' }}>
                {churnRisk && (
                  <Plot
                    data={[
                      {
                        values: churnRisk.map(risk => risk.value),
                        labels: churnRisk.map(risk => risk.category),
                        type: 'pie'
                      }
                    ]}
                    layout={{ width: '100%', height: 400 }}
                  />
                )}
              </Card>

              {/* RFM Segmentation */}
              <Card title='RFM Segmentation' style={{ marginBottom: '20px' }}>
                {rfmSegmentation && (
                  <Plot
                    data={[
                      {
                        x: rfmSegmentation.map(item => item.recency),
                        y: rfmSegmentation.map(item => item.frequency),
                        z: rfmSegmentation.map(item => item.monetary),
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: { size: 5 }
                      }
                    ]}
                    layout={{ width: '100%', height: 600 }}
                  />
                )}
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;