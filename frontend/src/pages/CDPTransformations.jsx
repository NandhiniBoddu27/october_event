// import React, { useState, useEffect, useCallback } from 'react';
// import { Layout, Card, Button, Spin, message, ConfigProvider } from 'antd';
// import { ReloadOutlined } from '@ant-design/icons';
// import Plotly from 'plotly.js-dist-min';

// const { Content } = Layout;

// const theme = {
//   token: {
//     colorPrimary: '#ffb800',
//     colorLink: '#ffb800',
//     colorLinkHover: '#f7931f',
//     colorBgLayout: '#ffffff',
//     colorInfo: '#ffb800'
//   },
//   components: {
//     Layout: {
//       siderBg: 'rgb(245,245,245)',
//       triggerBg: 'rgb(241,241,241)'
//     }
//   }
// };

// const CDPTransformations = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const createSankeyDiagram = useCallback(() => {
//     const data = {
//       type: 'sankey',
//       orientation: 'h',
//       node: {
//         pad: 15,
//         thickness: 30,
//         line: { color: 'black', width: 0.5 },
//         label: ['Source Tables', 'Transformation Layer', 'customer_360 Table', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c']
//       },
//       link: {
//         source: [0, 1, 2, 2, 2],
//         target: [1, 2, 3, 4, 5],
//         value: [8, 8, 3, 3, 2],
//         label: ['Data Flow', 'Transformed Data', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['rgba(166,206,227,0.5)', 'rgba(31,120,180,0.5)', 'rgba(51,160,44,0.5)', 'rgba(251,154,153,0.5)', 'rgba(227,26,28,0.5)']
//       }
//     };

//     const layout = {
//       title: 'CDP Table Transformations',
//       font: { size: 10 },
//       height: 600,
//       width: '100%',
//       margin: { l: 0, r: 0, b: 0, t: 40 }
//     };

//     Plotly.newPlot('sankeyDiagram', [data], layout);
//   }, []);

//   const fetchData = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     // Simulating API call
//     setTimeout(() => {
//       try {
//         createSankeyDiagram();
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load data. Please try again.');
//         setLoading(false);
//       }
//     }, 1500);
//   }, [createSankeyDiagram]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleRetry = () => {
//     fetchData();
//   };

//   return (
//     <ConfigProvider theme={theme}>
//       <Layout>
//         <Content style={{ padding: '20px' }}>
//           <Card
//             title="CDP Table Transformations"
//             extra={
//               <Button
//                 icon={<ReloadOutlined />}
//                 onClick={handleRetry}
//                 disabled={loading}
//               >
//                 Refresh
//               </Button>
//             }
//             style={{ width: '100%', marginBottom: '20px' }}
//           >
//             {loading ? (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
//                 <Spin size="large" />
//               </div>
//             ) : error ? (
//               <div style={{ textAlign: 'center', padding: '20px' }}>
//                 <p>{error}</p>
//                 <Button onClick={handleRetry}>Retry</Button>
//               </div>
//             ) : (
//               <div id="sankeyDiagram" style={{ width: '100%', height: '600px' }} />
//             )}
//           </Card>
//         </Content>
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default CDPTransformations;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Layout, Card, Button, Spin, message, ConfigProvider } from 'antd';
// import { ReloadOutlined } from '@ant-design/icons';
// import Plotly from 'plotly.js-dist-min';
// import { useSwipeable } from 'react-swipeable';

// const { Content } = Layout;

// const theme = {
//   token: {
//     colorPrimary: '#ffb800',
//     colorLink: '#ffb800',
//     colorLinkHover: '#f7931f',
//     colorBgLayout: '#ffffff',
//     colorInfo: '#ffb800'
//   },
//   components: {
//     Layout: {
//       siderBg: 'rgb(245,245,245)',
//       triggerBg: 'rgb(241,241,241)'
//     }
//   }
// };

// const CDPTransformations = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const plotRef = useRef(null);

//   const createSankeyDiagram = useCallback(() => {
//     const data = {
//       type: 'sankey',
//       orientation: 'h',
//       node: {
//         pad: 15,
//         thickness: 30,
//         line: { color: 'black', width: 0.5 },
//         label: ['Source Tables', 'Transformation Layer', 'customer_360 Table', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c']
//       },
//       link: {
//         source: [0, 1, 2, 2, 2],
//         target: [1, 2, 3, 4, 5],
//         value: [8, 8, 3, 3, 2],
//         label: ['Data Flow', 'Transformed Data', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['rgba(166,206,227,0.5)', 'rgba(31,120,180,0.5)', 'rgba(51,160,44,0.5)', 'rgba(251,154,153,0.5)', 'rgba(227,26,28,0.5)']
//       }
//     };

//     const layout = {
//       title: 'CDP Table Transformations',
//       font: { size: isMobile ? 8 : 10 },
//       height: isMobile ? 400 : 600,
//       width: '100%',
//       margin: { l: 0, r: 0, b: 0, t: 40 },
//       hovermode: 'closest'
//     };

//     const config = {
//       responsive: true,
//       displayModeBar: false
//     };

//     Plotly.newPlot('sankeyDiagram', [data], layout, config);
//   }, [isMobile]);

//   const fetchData = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     // Simulating API call with WebSocket
//     const ws = new WebSocket('wss://example.com/ws');
//     ws.onopen = () => {
//       ws.send(JSON.stringify({ type: 'fetchCDPData' }));
//     };
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.type === 'cdpData') {
//         createSankeyDiagram();
//         setLoading(false);
//         ws.close();
//       }
//     };
//     ws.onerror = () => {
//       setError('Failed to load data. Please try again.');
//       setLoading(false);
//     };
//   }, [createSankeyDiagram]);

//   useEffect(() => {
//     fetchData();
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [fetchData]);

//   const handleRetry = () => {
//     fetchData();
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => {
//       if (plotRef.current) {
//         Plotly.relayout(plotRef.current, { 'xaxis.range': [0, 1] });
//       }
//     },
//     onSwipedRight: () => {
//       if (plotRef.current) {
//         Plotly.relayout(plotRef.current, { 'xaxis.range': [-1, 0] });
//       }
//     },
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   return (
//     <ConfigProvider theme={theme}>
//       <Layout>
//         <Content style={{ padding: '20px' }}>
//           <Card
//             title="CDP Table Transformations"
//             extra={
//               <Button
//                 icon={<ReloadOutlined />}
//                 onClick={handleRetry}
//                 disabled={loading}
//                 style={{ fontSize: isMobile ? '16px' : '14px', padding: isMobile ? '8px 16px' : '4px 15px' }}
//               >
//                 Refresh
//               </Button>
//             }
//             style={{ width: '100%', marginBottom: '20px' }}
//           >
//             {loading ? (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? '300px' : '400px' }}>
//                 <Spin size="large" />
//               </div>
//             ) : error ? (
//               <div style={{ textAlign: 'center', padding: '20px' }}>
//                 <p>{error}</p>
//                 <Button onClick={handleRetry} style={{ fontSize: isMobile ? '16px' : '14px', padding: isMobile ? '8px 16px' : '4px 15px' }}>Retry</Button>
//               </div>
//             ) : (
//               <div {...handlers} ref={plotRef} id="sankeyDiagram" style={{ width: '100%', height: isMobile ? '400px' : '600px', touchAction: 'pan-y' }} />
//             )}
//           </Card>
//         </Content>
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default CDPTransformations;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Layout, Card, Button, Spin, message, ConfigProvider } from 'antd';
// import { ReloadOutlined } from '@ant-design/icons';
// import Plotly from 'plotly.js-dist-min';
// import { useSwipeable } from 'react-swipeable';

// const { Content } = Layout;

// const theme = {
//   token: {
//     colorPrimary: '#ffb800',
//     colorLink: '#ffb800',
//     colorLinkHover: '#f7931f',
//     colorBgLayout: '#ffffff',
//     colorInfo: '#ffb800'
//   },
//   components: {
//     Layout: {
//       siderBg: 'rgb(245,245,245)',
//       triggerBg: 'rgb(241,241,241)'
//     }
//   }
// };

// const CDPTransformations = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const plotRef = useRef(null);
//   const [cachedData, setCachedData] = useState(null);

//   const generateDummyData = () => {
//     return {
//       type: 'sankey',
//       orientation: 'h',
//       node: {
//         pad: 15,
//         thickness: 30,
//         line: { color: 'black', width: 0.5 },
//         label: ['Source Tables', 'Transformation Layer', 'customer_360 Table', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c']
//       },
//       link: {
//         source: [0, 1, 2, 2, 2],
//         target: [1, 2, 3, 4, 5],
//         value: [
//           Math.floor(Math.random() * 10) + 5,
//           Math.floor(Math.random() * 10) + 5,
//           Math.floor(Math.random() * 5) + 1,
//           Math.floor(Math.random() * 5) + 1,
//           Math.floor(Math.random() * 5) + 1
//         ],
//         label: ['Data Flow', 'Transformed Data', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//         color: ['rgba(166,206,227,0.5)', 'rgba(31,120,180,0.5)', 'rgba(51,160,44,0.5)', 'rgba(251,154,153,0.5)', 'rgba(227,26,28,0.5)']
//       }
//     };
//   };

//   const createSankeyDiagram = useCallback(() => {
//     const data = cachedData || generateDummyData();

//     const layout = {
//       title: 'CDP Table Transformations',
//       font: { size: isMobile ? 8 : 10 },
//       height: isMobile ? 400 : 600,
//       width: '100%',
//       margin: { l: 0, r: 0, b: 0, t: 40 },
//       hovermode: 'closest'
//     };

//     const config = {
//       responsive: true,
//       displayModeBar: false
//     };

//     Plotly.newPlot('sankeyDiagram', [data], layout, config);
//   }, [isMobile, cachedData]);

//   const fetchData = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     // Simulating API call
//     setTimeout(() => {
//       try {
//         const newData = generateDummyData();
//         setCachedData(newData);
//         createSankeyDiagram();
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load data. Please try again.');
//         setLoading(false);
//       }
//     }, 1500);
//   }, [createSankeyDiagram]);

//   useEffect(() => {
//     fetchData();
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);

//     // Implement frequent dummy client-side caching
//     const cacheInterval = setInterval(() => {
//       setCachedData(generateDummyData());
//     }, 5000); // Update every 5 seconds

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       clearInterval(cacheInterval);
//     };
//   }, [fetchData]);

//   const handleRetry = () => {
//     fetchData();
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => {
//       if (plotRef.current) {
//         Plotly.relayout(plotRef.current, { 'xaxis.range': [0, 1] });
//       }
//     },
//     onSwipedRight: () => {
//       if (plotRef.current) {
//         Plotly.relayout(plotRef.current, { 'xaxis.range': [-1, 0] });
//       }
//     },
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   return (
//     <ConfigProvider theme={theme}>
//       <Layout>
//         <Content style={{ padding: '20px' }}>
//           <Card
//             title="CDP Table Transformations"
//             extra={
//               <Button
//                 icon={<ReloadOutlined />}
//                 onClick={handleRetry}
//                 disabled={loading}
//                 style={{ fontSize: isMobile ? '16px' : '14px', padding: isMobile ? '8px 16px' : '4px 15px' }}
//               >
//                 Refresh
//               </Button>
//             }
//             style={{ width: '100%', marginBottom: '20px' }}
//           >
//             {loading ? (
//               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? '300px' : '400px' }}>
//                 <Spin size="large" />
//               </div>
//             ) : error ? (
//               <div style={{ textAlign: 'center', padding: '20px' }}>
//                 <p>{error}</p>
//                 <Button onClick={handleRetry} style={{ fontSize: isMobile ? '16px' : '14px', padding: isMobile ? '8px 16px' : '4px 15px' }}>Retry</Button>
//               </div>
//             ) : (
//               <div {...handlers} ref={plotRef} id="sankeyDiagram" style={{ width: '100%', height: isMobile ? '400px' : '600px', touchAction: 'pan-y' }} />
//             )}
//           </Card>
//         </Content>
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default CDPTransformations;

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Layout, Card, Spin, Button, ConfigProvider, Typography } from 'antd';
// import Plotly from 'plotly.js-dist-min';

// const { Content } = Layout;
// const { Title, Text } = Typography;

// // Mock data for Sankey diagram
// const mockSankeyData = {
//   node: {
//     label: ['Source 1', 'Source 2', 'Source 3', 'Personal Info', 'Transaction Data', 'Engagement Data', 'Customer 360'],
//     color: ['#1890ff', '#1890ff', '#1890ff', '#ffa39e', '#ffd666', '#95de64', '#ffb800']
//   },
//   link: {
//     source: [0, 1, 2, 0, 1, 2, 3, 4, 5],
//     target: [3, 4, 5, 6, 6, 6, 6, 6, 6],
//     value: [2, 1, 3, 1, 2, 1, 3, 2, 4],
//     label: ['Field A', 'Field B', 'Field C', 'Field D', 'Field E', 'Field F', 'Personal Info', 'Transaction Data', 'Engagement Data'],
//     customdata: [
//       'Transform: Uppercase',
//       'Transform: Date format',
//       'Transform: Aggregation',
//       'Transform: Normalization',
//       'Transform: Currency conversion',
//       'Transform: Sentiment analysis',
//       'Merge: Combine personal info',
//       'Merge: Aggregate transactions',
//       'Merge: Summarize engagement'
//     ],
//     hovertemplate: '%{label}: %{value}<br>%{customdata}<extra></extra>'
//   }
// };

// const CDPTableTransformations = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);

//   const fetchData = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     // Simulating API call
//     setTimeout(() => {
//       if (Math.random() > 0.2) {
//         setData(mockSankeyData);
//         setLoading(false);
//       } else {
//         setError('Failed to fetch data');
//         setLoading(false);
//       }
//     }, 1500);
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const plotSankeyDiagram = useCallback(() => {
//     if (!data) return;

//     const layout = {
//       title: 'CDP Table Transformations',
//       font: { size: 10 },
//       autosize: true,
//       height: 500,
//       margin: { l: 0, r: 0, b: 0, t: 40 },
//       paper_bgcolor: 'rgba(0,0,0,0)',
//       plot_bgcolor: 'rgba(0,0,0,0)'
//     };

//     const config = { responsive: true };

//     Plotly.newPlot('sankeyDiagram', [{
//       type: 'sankey',
//       orientation: 'h',
//       node: {
//         pad: 15,
//         thickness: 30,
//         line: { color: 'black', width: 0.5 },
//         label: data.node.label,
//         color: data.node.color
//       },
//       link: data.link
//     }], layout, config);
//   }, [data]);

//   useEffect(() => {
//     if (data) {
//       plotSankeyDiagram();
//     }
//   }, [data, plotSankeyDiagram]);

//   const memoizedContent = useMemo(() => (
//     <Content style={{ padding: '20px', minHeight: '100vh' }}>
//       <Card
//         title={<Title level={3}>CDP Table Transformations</Title>}
//         style={{ width: '100%', marginBottom: '20px' }}
//       >
//         {loading ? (
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
//             <Spin size='large' />
//           </div>
//         ) : error ? (
//           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
//             <Text type='danger' style={{ marginBottom: '20px' }}>{error}</Text>
//             <Button type='primary' onClick={fetchData}>Retry</Button>
//           </div>
//         ) : (
//           <div id='sankeyDiagram' style={{ width: '100%', height: '500px' }} />
//         )}
//       </Card>
//     </Content>
//   ), [loading, error, fetchData]);

//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: '#ffb800',
//           colorLink: '#ffb800',
//           colorLinkHover: '#f7931f',
//           colorBgLayout: '#ffffff',
//           colorInfo: '#ffb800'
//         },
//         components: {
//           Layout: {
//             siderBg: 'rgb(245,245,245)',
//             triggerBg: 'rgb(241,241,241)'
//           }
//         }
//       }}
//     >
//       <Layout>
//         {memoizedContent}
//       </Layout>
//     </ConfigProvider>
//   );
// };

// export default CDPTableTransformations;

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