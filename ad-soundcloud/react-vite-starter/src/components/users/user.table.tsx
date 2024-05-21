import { useEffect, useState } from 'react';
import { getListUsers, hideUser } from '../../api/user.api';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Space, Button, Image, notification, Popconfirm, message
} from 'antd';
import AddUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';

export interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: any;
    email: string;
    password1: string;
    password2: string;
    is_superuser: boolean;
    is_active: boolean;
}

const UserTable = () => {
    const [listUsers, setListUsers] = useState([])
    const [meta, setMeta] = useState({
        current: 1,
        total: 0,
        pageSize: 5
    })
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isUpdateUserModal, setIsUpdateUserModal] = useState(false)
    const [dataUpdate, setDataUpdate] = useState<null | IUser>(null)
    const updateListUser = async () => {
        getListUsers(meta.current).then((value) => {
            setListUsers(value?.data?.results ?? [])
            setMeta({
                current: meta.current,
                total: value?.data?.count,
                pageSize: meta.pageSize
            })
        }).catch(err => {
            notification.error({
                message: JSON.stringify(err.message)
            })
        });
    }

    useEffect(() => {
        updateListUser()
    }, [meta.current])

    const confirm = (user: IUser) => {
        hideUser(user?.id).then((value) => {
            if (value) {
                notification.success({
                    message: `Xóa thành công người dùng ${user?.id}`
                })
                getListUsers(meta.current)
            }
        }).catch(err => {
            notification.error({
                message: JSON.stringify(err?.message)
            })
            return
        })
    };

    const cancel = () => {
        message.error('Click on No');
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Firstname',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Lastname',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, { avatar }) => (
                <>
                    <Image
                        width={50}
                        src={avatar}
                        style={{ borderRadius: 400 / 2 }}
                    />
                </>
            ),
        },
        {
            title: 'is_superuser',
            dataIndex: 'is_superuser',
            key: 'is_superuser',
            render: (_, { is_superuser }) => (
                <>
                    {is_superuser && <CheckCircleOutlined style={{ color: 'green' }} />}
                    {!is_superuser && <CloseCircleOutlined style={{ color: 'red' }} />}
                </>
            ),
        },
        {
            title: 'is_active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (_, { is_active }) => (
                <>
                    {is_active && <CheckCircleOutlined style={{ color: 'green' }} />}
                    {!is_active && <CloseCircleOutlined style={{ color: 'red' }} />}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record) => (
                <Space size="middle">
                    <Button
                        onClick={
                            () => {
                                setIsUpdateUserModal(true)
                                setDataUpdate(record)
                            }
                        }
                        type="default"
                        icon={<EditOutlined />}
                        style={{ background: '#F0E68C' }} />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn chắc chắn muốn xóa người dùng này?"
                        onConfirm={() => { confirm(record) }}
                        onCancel={cancel}
                        okText="Đồng ý"
                        cancelText="Hủy">
                        <Button
                            onClick={() => { }}
                            type="primary"
                            danger
                            icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Danh sách người dùng</h2>
                <Button
                    onClick={() => setIsAddUserModalOpen(true)}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{ background: '#9ACD32', marginTop: '20px', marginRight: '10vw' }}>Thêm mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                pagination={{
                    current: meta.current,
                    total: meta.total,
                    pageSize: meta.pageSize,
                    onChange: (page) => { setMeta({ current: page, total: meta.total, pageSize: meta.pageSize }) },
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`,
                }} />
            <AddUserModal
                updateListUser={updateListUser}
                isModalOpen={isAddUserModalOpen}
                setIsModalOpen={setIsAddUserModalOpen}
                meta={meta} />
            <UpdateUserModal
                updateListUser={updateListUser}
                isModalOpen={isUpdateUserModal}
                setIsModalOpen={setIsUpdateUserModal}
                meta={meta}
                dataUpdate={dataUpdate} />
        </>
    )
}

export default UserTable;