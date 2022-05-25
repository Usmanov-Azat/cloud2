import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { FormInstance, useForm } from 'antd/lib/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { setIsReg } from '../../reducers/userReducer'
import { setIsAuthorization } from '../../reducers/userReducer'
import { registration, login } from '../../actions/user'

export const Auth = () => {
    const isRegistration = useSelector((state) => state.user.isRegistratiton)
    const dispatch = useDispatch()
    const onFinish = async (data) => {
        const { email, password } = data
        isRegistration
            ? registration(email, password)
            : dispatch(login(email, password))
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
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
                rules={[{ required: true, message: 'Please input username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input password!' }]}
            >
                <Input.Password />
            </Form.Item>
            {!isRegistration && (
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            )}
            {!isRegistration && (
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <span onClick={() => dispatch(setIsReg())}>
                        Нет аккаунта? Пройдите регистрацию
                    </span>
                </Form.Item>
            )}
            {isRegistration && (
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <span onClick={() => dispatch(setIsAuthorization())}>
                        Уже есть аккаунт? Пройдите авторизацию
                    </span>
                </Form.Item>
            )}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                </Button>
            </Form.Item>
        </Form>
    )
}
