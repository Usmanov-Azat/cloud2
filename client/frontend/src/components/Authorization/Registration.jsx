import React from 'react'
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { registration } from '../../actions/user'

export const Registration = () => {
    const dispatch = useDispatch()
    const onFinish = async ({ email, password }) => {
        registration(email, password)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div
            style={{
                paddingTop: '15%',
            }}
        >
            <h1 style={{ paddingLeft: '35%' }}>Регистрация</h1>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input username!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input password!' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Registration
