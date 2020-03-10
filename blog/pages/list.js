import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { Row,Col,List,Breadcrumb } from 'antd'
import { CalendarOutlined,YoutubeOutlined,FireOutlined } from '@ant-design/icons';
import Author from '../components/Author.js';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/comm.css'
import axios from 'axios';
import servicePath from '../config/apiUrl';

const ArticleList = (list) => {
  const [ myList , setMylist ] = useState([]);
  useEffect(() => {
    setMylist(list.data)
  })
  return (
    <>
      <Head>
        <title>博客列表页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List 
            itemLayout = "vertical"
            dataSource={myList}
            renderItem = {item => (
              <List.Item>
                <div className="list-title">
                <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                  <a>{item.title}</a>
                </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.addTime}</span>
                  <span><YoutubeOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.viewCount}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>  
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

ArticleList.getInitialProps = async (context)=>{
  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}
export default ArticleList
