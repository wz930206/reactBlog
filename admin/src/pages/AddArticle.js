import React, { useState,useEffect } from 'react';
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
  useEffect(() => {
    getTypeInfo()
  },[])
  const renderer = new marked.Renderer();
  marked.setOptions({
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
     smartypants: false
  })
  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true         //接口使用了这个参数 就直接调用中台中间件
    }).then(res => {
      if(res.data.code === 10010) {
        localStorage.removeItem('openId')
        message.error(res.data.message)
        props.history.push('/')
      }else {
        setTypeInfo(res.data.data)
      }
    })
  }
  const selectedTypeHandler = (value) => {
    setSelectType(value)
  }
  const saveArticle = () => {
    if(selectedType === '请选择类型'){
      message.error('必须选择文章类别')
      return false
    }else if(!articleTitle){
      message.error('文章名称不能为空')
      return false
    }else if(!articleContent){
      message.error('文章内容不能为空')
      return false
    }else if(!introducemd){
      message.error('简介不能为空')
      return false
    }else if(!showDate){
      message.error('发布日期不能为空')
      return false
    }
    message.success('检验通过')
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input 
                placeholder="博客标题"
                onChange={ e => {setArticleTitle(e.target.value)}}
                size="large"
              />
            </Col>
            <Col span={4}>
                <Select defaultValue={selectedType} size="large" onChange={selectedTypeHandler}>
                  {
                    typeInfo.map((item,index) => {
                      return (
                        <Option key={index} value={item.id}>{item.typeName}</Option>
                      )
                    })
                  }
                </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea 
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
                />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button> &nbsp;
              <Button size="large" type="primary" onClick={saveArticle}>保存文章</Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea 
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{__html:'文章简介：'+ introducehtml}}></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker 
                  placeholder="发布日期"
                  onChange={(date,dateString) => setShowDate(dateString)}
                  size="large"
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker 
                  placeholder="修改日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle