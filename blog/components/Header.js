
// xs < 576px
// sm >= 576px
// md >= 768px
// lg >= 992px
// xl >=1200px
// xxl >= 1600px
import React, { useState } from 'react';
import { Row,Col,Menu,Affix } from 'antd'
import {
    HomeOutlined,
    VideoCameraOutlined,
    AliwangwangOutlined,
    AppstoreOutlined
  } from '@ant-design/icons';
import '../static/style/components/header.css'
const Header = () => {
    const [top,setTop] = useState(10)
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={20} sm={20} md={10} lg={15} xl={12}>
                    <span className="header-logo">健康生活</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频</span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="home">
                            <HomeOutlined />
                            博客首页
                        </Menu.Item>
                        <Menu.Item key="video">
                            <VideoCameraOutlined />
                            视频教程
                        </Menu.Item>
                        <Menu.Item key="life">
                            <AliwangwangOutlined />
                            健康生活
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col className="memu-div" xs={4} sm={4} md={0} lg={0} xl={0}>  
                    <Affix offsetTop={top}>
                        <AppstoreOutlined style={{fontSize: '18px' }}/>
                    </Affix>
                </Col>
            </Row>
        </div>
    )
}

export default Header