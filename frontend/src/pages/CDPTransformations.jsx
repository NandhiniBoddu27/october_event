import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Layout, Card, Spin, ConfigProvider, Typography } from 'antd';
import Plotly from 'plotly.js-dist-min';

const { Content } = Layout;
const { Title } = Typography;

// Mock data for Sankey diagram
const mockSankeyData = {
  node: {
    label: [
      'Customer Data', 'Transaction Data', 'Engagement Data',
      'Personal Info', 'Financial Info', 'Behavioral Data',
      'Customer 360'
    ],
    color: [
      '#1890ff', '#ffa39e', '#95de64',
      '#ffd666', '#87e8de', '#adc6ff',
      '#ffb800'
    ]
  },
  link: {
    source: [0, 0, 1, 1, 2, 2, 3, 4, 5],
    target: [3, 4, 4, 5, 5, 3, 6, 6, 6],
    value: [5, 3, 4, 2, 3, 2, 6, 5, 4],
    label: [
      'Name', 'Account Info', 'Purchase History', 'Spending Patterns',
      'Website Visits', 'Email Interactions', 'Personal Profile',
      'Financial Summary', 'Behavior Insights'
    ],
    customdata: [
      'Transform: Name parsing',
      'Transform: Account normalization',
      'Transform: Transaction aggregation',
      'Transform: Pattern analysis',
      'Transform: Visit frequency calculation',
      'Transform: Interaction scoring',
      'Merge: Combine personal data',
      'Merge: Aggregate financial data',
      'Merge: Summarize behavioral data'
    ],
    hovertemplate: '%{label}: %{value}<br>%{customdata}<extra></extra>'
  }
};

const CDPTableTransformations = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setData(mockSankeyData);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const plotSankeyDiagram = useCallback(() => {
    if (!data) return;

    const layout = {
      title: 'CDP Table Transformations',
      font: { size: 12 },
      autosize: true,
      height: 600,
      margin: { l: 0, r: 0, b: 0, t: 40 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)'
    };

    const config = { responsive: true };

    Plotly.newPlot('sankeyDiagram', [{
      type: 'sankey',
      orientation: 'h',
      node: {
        pad: 15,
        thickness: 30,
        line: { color: 'black', width: 0.5 },
        label: data.node.label,
        color: data.node.color
      },
      link: data.link
    }], layout, config);
  }, [data]);

  useEffect(() => {
    if (data) {
      plotSankeyDiagram();
    }
  }, [data, plotSankeyDiagram]);

  const memoizedContent = useMemo(() => (
    <Content style={{ padding: '20px', minHeight: '100vh' }}>
      <Card
        title={<Title level={3}>CDP Table Transformations</Title>}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
            <Spin size='large' />
          </div>
        ) : (
          <div id='sankeyDiagram' style={{ width: '100%', height: '600px' }} />
        )}
      </Card>
    </Content>
  ), [loading]);

  return (
    <ConfigProvider
      theme={{
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
      }}
    >
      <Layout>
        {memoizedContent}
      </Layout>
    </ConfigProvider>
  );
};

export default CDPTableTransformations;