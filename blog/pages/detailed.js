import React,{useState} from 'react';
import Head from 'next/head'
import Header from '../components/Header'
import { Row,Col,Breadcrumb,Affix } from 'antd'
import { CalendarOutlined,YoutubeOutlined,FireOutlined } from '@ant-design/icons';
import Author from '../components/Author.js';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/detailed.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'

import axios from 'axios';
import servicePath from '../config/apiUrl';

const Detailed = (props) => {
  let markdown= props.articleContent
  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    // render这个是必须写 可以通过自定义的renderer渲染除自定义格式
    renderer: renderer,
    // gfm：启动类似Github样式的Markdown,填写true或者false
    gfm: true,
    // pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    pedantic: false,
    // sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写false
    sanitize: false,
    // tables： 支持Github形式的表格，必须打开gfm选项
    tables: true,
    // breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
    breaks: false,
    // smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartLists: true,
    smartypants: false,
    // highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })
  let html = marked(markdown) 
  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              {props.title}
            </div>
            <div className="list-icon center">
              <span><CalendarOutlined /> {props.addTime}</span>
              <span><YoutubeOutlined /> {props.typeName}</span>
              <span><FireOutlined /> {props.viewCount}人</span>
            </div>
            <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}
Detailed.getInitialProps = async (ctx) => {
  let id = ctx.query.id
  let promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id ).then( res => {
      resolve(res.data.data[0])
    })
  })
  return await promise
}
export default Detailed
