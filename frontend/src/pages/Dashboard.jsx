import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Card, Table, ConfigProvider } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, ShoppingOutlined, BarChartOutlined } from '@ant-design/icons';
import Plotly from 'plotly.js-dist-min';

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

  const customerSegmentsRef = useRef(null);
  const monthlyRevenueRef = useRef(null);
  const productPerformanceRef = useRef(null);
  const customerSatisfactionRef = useRef(null);
  const churnRiskRef = useRef(null);
  const rfmSegmentationRef = useRef(null);

  useEffect(() => {

    fetchKPIs();
    fetchCustomerSegments();
    fetchMonthlyRevenue();
    fetchTopCustomers();
    fetchProductPerformance();
    fetchCustomerSatisfaction();
    fetchChurnRisk();
    fetchRFMSegmentation()

    // setCustomerSegments([
    //   { name: 'Segment A', value: 35 },
    //   { name: 'Segment B', value: 40 },
    //   { name: 'Segment C', value: 25 }
    // ]);

    // setMonthlyRevenue([
    //   { month: 'January', revenue: 20000 },
    //   { month: 'February', revenue: 25000 },
    //   { month: 'March', revenue: 30000 }
    // ]);

    // setTopCustomers([
    //   { customer_id: 'C001', first_name: 'John', last_name: 'Doe', total_lifetime_value: '$50,000' },
    //   { customer_id: 'C002', first_name: 'Jane', last_name: 'Smith', total_lifetime_value: '$45,000' }
    // ]);

    // setProductPerformance([
    //   { category: 'Electronics', revenue: 40000 },
    //   { category: 'Apparel', revenue: 20000 },
    //   { category: 'Home Goods', revenue: 15000 }
    // ]);

    // setCustomerSatisfaction({ avg_satisfaction_score: 9 });

    // setChurnRisk([
    //   { category: 'High Risk', value: 20 },
    //   { category: 'Medium Risk', value: 50 },
    //   { category: 'Low Risk', value: 30 }
    // ]);

    // setRfmSegmentation([
    //   { recency: 5, frequency: 3, monetary: 1000 },
    //   { recency: 10, frequency: 5, monetary: 2000 },
    //   { recency: 15, frequency: 2, monetary: 500 }
    // ]);
  }, []);

  useEffect(() => {
    // Render plots once the data is available
    if (customerSegments) {
      Plotly.newPlot(customerSegmentsRef.current, [{
        values: customerSegments.map(segment => segment.value),
        labels: customerSegments.map(segment => segment.name),
        type: 'pie'
      }], { height: 400, width: '100%' });
    }

    if (monthlyRevenue) {
      Plotly.newPlot(monthlyRevenueRef.current, [{
        x: monthlyRevenue.map(item => item.month),
        y: monthlyRevenue.map(item => item.revenue),
        type: 'scatter',
        mode: 'lines+markers'
      }], { height: 400, width: '100%' });
    }

    if (productPerformance) {
      Plotly.newPlot(productPerformanceRef.current, [{
        y: productPerformance.map(item => item.category),
        x: productPerformance.map(item => item.revenue),
        type: 'bar',
        orientation: 'h'
      }], { height: 400, width: '100%' });
    }

    if (customerSatisfaction) {
      Plotly.newPlot(customerSatisfactionRef.current, [{
        type: 'indicator',
        mode: 'gauge+number',
        value: customerSatisfaction.avg_satisfaction_score,
        gauge: { axis: { range: [null, 10] }, bar: { color: '#ffb800' } }
      }], { height: 400, width: '100%' });
    }

    if (churnRisk) {
      Plotly.newPlot(churnRiskRef.current, [{
        values: churnRisk.map(risk => risk.value),
        labels: churnRisk.map(risk => risk.category),
        type: 'pie'
      }], { height: 400, width: '100%' });
    }

    if (rfmSegmentation) {
      Plotly.newPlot(rfmSegmentationRef.current, [{
        x: rfmSegmentation.map(item => item.recency),
        y: rfmSegmentation.map(item => item.frequency),
        z: rfmSegmentation.map(item => item.monetary),
        mode: 'markers',
        type: 'scatter3d',
        marker: { size: 5 }
      }], { height: 600, width: '100%' });
    }
  }, [customerSegments, monthlyRevenue, productPerformance, customerSatisfaction, churnRisk, rfmSegmentation]);

  const domain="http://localhost:800"
  const fetchKPIs = async () => {
    try {
      const response = await fetch('http://localhost:8000/kpis');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data)
      setKpis(data);
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
      setCustomerSatisfaction(data);
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

  return (
    <ConfigProvider>
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
                    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                      <h3>Total Customers</h3>
                      <p>{kpis.total_customers}</p>
                    </Card.Grid>
                    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                      <h3>Total Lifetime value</h3>
                      <p>{kpis.total_lifetime_value}</p>
                    </Card.Grid>
                    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                      <h3>Avg Order value</h3>
                      <p>{kpis.average_order_value}</p>
                    </Card.Grid>
                    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>
                      <h3>Retention Rate</h3>
                      <p>{kpis.retention_rate}</p>
                    </Card.Grid>
                  </div>
                )}
              </Card>

              {/* Customer Segment Distribution */}
              <Card title='Customer Segment Distribution' style={{ marginBottom: '20px' }}>
                <div ref={customerSegmentsRef}></div>
              </Card>

              {/* Monthly Revenue */}
              <Card title='Monthly Revenue Trend' style={{ marginBottom: '20px' }}>
                <div ref={monthlyRevenueRef}></div>
              </Card>

              {/* Top Customers */}
              <Card title='Top 5 Customers by Lifetime Value' style={{ marginBottom: '20px' }}>
                <Table
                  dataSource={topCustomers}
                  columns={[
                    { title: 'Customer ID', dataIndex: 'customer_id', key: 'customer_id' },
                    { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
                    { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
                    { title: 'Lifetime Value', dataIndex: 'total_lifetime_value', key: 'total_lifetime_value' }
                  ]}
                />
              </Card>

              {/* Product Performance */}
              <Card title='Product Category Performance' style={{ marginBottom: '20px' }}>
                <div ref={productPerformanceRef}></div>
              </Card>

              {/* Customer Satisfaction */}
              <Card title='Customer Satisfaction Score' style={{ marginBottom: '20px' }}>
                <div ref={customerSatisfactionRef}></div>
              </Card>

              {/* Churn Risk */}
              <Card title='Customer Churn Risk' style={{ marginBottom: '20px' }}>
                <div ref={churnRiskRef}></div>
              </Card>

              {/* RFM Segmentation */}
              <Card title='RFM Segmentation (3D)' style={{ marginBottom: '20px' }}>
                <div ref={rfmSegmentationRef}></div>
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
