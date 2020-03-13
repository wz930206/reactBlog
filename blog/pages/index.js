import React,{ useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Row,Col,List,Affix,Carousel  } from 'antd'
import { CalendarOutlined,YoutubeOutlined,FireOutlined } from '@ant-design/icons';
import '../static/style/pages/index.css'
import Author from '../components/Author.js';
import Advert from '../components/Advert';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
const Home = (list) => {
  const [ myList,setMyList ] = useState(list.data)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  return (
    <>
      <Head>
        <title>博客首页</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="memu-div" xs={24} sm={24} md={0} lg={0} xl={0}>  
          <Carousel autoplay>
              <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%" /></div>
              <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%" /></div>
              <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%" /></div>
            </Carousel>
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List 
            header={<div>最新日志</div>}
            itemLayout = "vertical"
            dataSource={myList}
            renderItem = {item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {item.addTime}</span>
                  <span><YoutubeOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.viewCount}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>  
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
Home.getInitialProps = async () => {
  let promise = new Promise(resolve => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
    }).catch(err => console.log(err)) 
  })
  return await promise
}
export default Home
