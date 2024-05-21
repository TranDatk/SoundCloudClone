import {
    Modal, Form, Input, Switch, Button, notification,
} from 'antd';
import { IUser } from './user.table';
import { registerUser } from '../../api/user.api';

interface Istate {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    updateListUser: () => void;
    meta: { current: number, total: number };
}

// const normFile = (e: any) => {
//     if (Array.isArray(e)) {
//         return e;
//     }
//     return e?.fileList;
// };

const AddUserModal = (state: Istate) => {
    const [form] = Form.useForm<IUser>();
    form.setFieldValue("is_superuser", false)

    const onFinish = () => {
        registerUser(form.getFieldsValue()).then((value) => {
            if (!!value) {
                state.updateListUser()
            }
            notification.success({
                message: "Tạo thành công"
            })
            return
        }).catch(err => {
            notification.error({
                message: JSON.stringify(err?.message)
            })
            return
        })
        state.setIsModalOpen(false);
    };

    return (
        <Modal
            maskClosable={false}
            title="Thêm người dùng"
            open={state.isModalOpen}
            onCancel={() => state.setIsModalOpen(false)}
            footer={[
                <Button key="back" onClick={() => state.setIsModalOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={() => { form.submit() }}>
                    Thêm mới
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
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                    <Input onChange={(e) => { form.setFieldValue("username", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Password1" name="password1" rules={[{ required: true }]}>
                    <Input.Password onChange={(e) => { form.setFieldValue("password1", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Password2" name="password2" rules={[{ required: true }]}>
                    <Input.Password onChange={(e) => { form.setFieldValue("password2", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Firstname" name="first_name" rules={[{ required: true }]}>
                    <Input onChange={(e) => { form.setFieldValue("first_name", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Lastname" name="last_name" rules={[{ required: true }]}>
                    <Input onChange={(e) => { form.setFieldValue("last_name", e.target.value) }} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input onChange={(e) => { form.setFieldValue("email", e.target.value) }} />
                </Form.Item>
                <Form.Item label="is_superuser" name="is_superuser">
                    <Switch checked={false} onChange={(e) => { form.setFieldValue("is_superuser", e) }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserModal;