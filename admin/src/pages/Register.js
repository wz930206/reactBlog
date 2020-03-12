import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin,message } from 'antd'
import '../static/css/login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Register() {
    const [loading,setLoading] = useState(false)
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    return (
        <div className="login-div">
            <Spin tip="Loading....." spinning={loading}>
                <Card title="register" bordered={true} style={{width:400}}>
                    <Input 
                        id="userName"
                        size="large"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                    />
                    <br />
                    <br />
                    <Input.Password 
                        id="password"
                        size="large"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                    />
                    <br />
                    <br />
                    <Button type="primary" size="large" block>Register</Button>
                </Card>
            </Spin>

        </div>
    )
}
export default Register