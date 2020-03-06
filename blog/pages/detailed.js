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

const Detailed = () => {
  let markdown='# P01:课程介绍和环境搭建\n' +
    '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    '**这是加粗的文字**\n\n' +
    '*这是倾斜的文字*`\n\n' +
    '***这是斜体加粗的文字***\n\n' +
    '~~这是加删除线的文字~~ \n\n'+
    '\`console.log(111)\` \n\n'+
    '# p02:来个Hello World 初始Vue3.0\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n'+
    '***\n\n\n' +
    '# p03:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n'+
    '# p04:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n'+
    '#5 p05:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n'+
    '# p06:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n'+
    '# p07:Vue3.0基础知识讲解\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n'+
    '``` var a=11; ```'
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
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
              <Breadcrumb.Item>xxxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className="detailed-title">
              React实战视频教程-技术胖Blog开发(更新08集)
            </div>
            <div className="list-icon center">
              <span><CalendarOutlined /> 2019-06-28</span>
              <span><YoutubeOutlined /> 视频教程</span>
              <span><FireOutlined /> 5498人</span>
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

export default Detailed