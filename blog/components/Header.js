
// xs < 576px
// sm >= 576px
// md >= 768px
// lg >= 992px
// xl >=1200px
// xxl >= 1600px
import React, { useState,useEffect } from 'react';
import { Row,Col,Menu,Affix, Icon } from 'antd'
import {
    HomeOutlined,
    AppstoreOutlined 
  } from '@ant-design/icons';
import '../static/style/components/header.css'
import axios from 'axios';
import servicePath from '../config/apiUrl';
import Router from 'next/router'

const Header = () => {
    const [navArray , setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const result = await axios(servicePath.getTypeInfo).then(res => {
                return res.data.data
            })
            setNavArray(result)
        }
        fetchData()
    },[])
    const handleClick = (e) => {
        console.log(e)
        if(e.key == 0) {
            Router.push('/index')
        }else {
            Router.push('/list?id=' + e.key )
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={20} sm={20} md={10} lg={15} xl={12}>
                    <span className="header-logo">健康生活</span>
                    <span className="header-txt">专注前端开发,每年100集免费视频</span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.id}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
                <Col className="memu-div" xs={4} sm={4} md={0} lg={0} xl={0}>  
                    <AppstoreOutlined style={{fontSize: '18px' }}/>
                </Col>
            </Row>
        </div>
    )
}
export default Header