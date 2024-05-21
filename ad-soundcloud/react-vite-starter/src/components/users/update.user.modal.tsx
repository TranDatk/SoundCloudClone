import {
    Modal, Form, Input, Switch, Button, notification,
} from 'antd';
import { IUser } from './user.table';
import { updateUser } from '../../api/user.api';
import { useEffect } from 'react';

interface Ipropss {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    updateListUser: () => void;
    meta: { current: number, total: number };
    dataUpdate: IUser | null;
}

const UpdateUserModal = (props: Ipropss) => {
    const [form] = Form.useForm<IUser>();

    const onFinish = async () => {
        updateUser(form.getFieldsValue()).then((value) => {
            if (!!value) {
                props.updateListUser()
            }
            notification.success({
                message: JSON.stringify(value?.data?.message)
            })
        }).catch(err => {
            notification.error({
                message: JSON.stringify(err?.message)
            })
            return
        })
        props.setIsModalOpen(false);
    };

    useEffect(() => {
        if (props.dataUpdate) {
            form.setFieldValue("id", props.dataUpdate?.id)
            form.setFieldValue("username", props.dataUpdate?.username)
            form.setFieldValue("first_name", props.dataUpdate?.first_name)
            form.setFieldValue("last_name", props.dataUpdate?.last_name)
            form.setFieldValue("email", props.dataUpdate?.email)
            form.setFieldValue("is_superuser", props.dataUpdate?.is_superuser)
        }
    }, [props.dataUpdate])

    return (
        <Modal
            maskClosable={false}
            title="Sửa thông tin người dùng"
            open={props.isModalOpen}
            onCancel={() => props.setIsModalOpen(false)}
            footer={[
                <Button key="back" onClick={() => props.setIsModalOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={() => { form.submit() }}>
                    Xong
                </Button>,
            ]}>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label="Id" name="id" rules={[{ required: true }]}>
                    <Input
                        disabled
                        id="id"
                        value={props?.dataUpdate?.id ?? ""}
                        onChange={(e) => { form.setFieldValue("id", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                    <Input
                        id="username"
                        value={props?.dataUpdate?.username ?? ""}
                        onChange={(e) => { form.setFieldValue("username", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Firstname" name="first_name" rules={[{ required: true }]}>
                    <Input
                        value={props?.dataUpdate?.first_name ?? ""}
                        onChange={(e) => { form.setFieldValue("first_name", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Lastname" name="last_name" rules={[{ required: true }]}>
                    <Input
                        value={props?.dataUpdate?.last_name ?? ""}
                        onChange={(e) => { form.setFieldValue("last_name", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input
                        value={props?.dataUpdate?.email ?? ""}
                        onChange={(e) => { form.setFieldValue("email", e.target.value) }} />
                </Form.Item>
                <Form.Item label="is_superuser" name="is_superuser" valuePropName="checked" rules={[{ required: true }]}>
                    <Switch
                        checked={props?.dataUpdate?.is_superuser ?? false}
                        onChange={(e) => { form.setFieldValue("is_superuser", e) }} />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default UpdateUserModal;