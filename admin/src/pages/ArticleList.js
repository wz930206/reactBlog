import React, { useState,useEffect } from 'react';
import { List,Row,Col,Modal,message,Button,Switch } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/articleList.css'
const { confirm } = Modal
function ArticleList (props) {
    const [ list,setList ] = useState([])
    useEffect(() => {
        getList()
    },[])
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(res => {
            setList(res.data.data)
        })
    }
    const delArticle = (id) => {
        confirm({
            title: '删除',
            content: 'Do you Want to delete these items?',
            onOk() {
                axios({
                    method: 'get',
                    url:servicePath.delArticle + id,
                    withCredentials: true
                }).then(res => {
                    if(res.data.code === 10000) {
                        message.success('删除成功')
                        getList()
                    } else {
                        message.error('删除失败')
                    }
                })
            },
            onCancel() {

            }
        })
    }
    const editArticle = id => {
        props.history.push({pathname: '/index/add/',query: {'id': id}})
    }
    return (
        <div>
            <List 
                header = {
                    <Row className="list-div">
                        <Col span={8}><b>标题</b></Col>
                        <Col span={3}><b>类别</b></Col>
                        <Col span={3}><b>发布时间</b></Col>
                        <Col span={3}><b>集数</b></Col>
                        <Col span={3}><b>浏览量</b></Col>
                        <Col span={4}><b>操作</b></Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem = { item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime ? item.addTime : '1'}
                            </Col>
                            <Col span={3}>
                                {item.partCount ? item.partCount : '1'}集
                            </Col>
                            <Col span={3}>
                                {item.viewCount ? item.viewCount : '1'}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={() => editArticle(item.id)}>修改</Button>
                                &nbsp;
                                <Button onClick={() => (delArticle(item.id))}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList