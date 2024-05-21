import { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    Space, Button, Image, notification, Popconfirm, message
} from 'antd';
import { IUser } from '../users/user.table';
import { getTrackList, hideTrack } from '../../api/tracks.api';
import { BASE_URL } from '../../api/api';

interface IGenre {
    id: number;
    name: string;
    description: string;
}

interface ITrack {
    id: number;
    fk_genre: IGenre;
    fk_user: IUser;
    description: string;
    photo: string;
    title: string;
    duration: number;
    url: string;
    like: number;
    is_active: boolean;
    key: string;
}

const TrackTable = () => {
    const [listTracks, setTrackList] = useState([]);
    const [meta, setMeta] = useState({
        current: 1,
        total: 0,
        pageSize: 5
    })
    // const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);
    // const [isUpdateTrackModal, setIsUpdateTrackModal] = useState(false)
    // const [dataUpdate, setDataUpdate] = useState<null | ITrack>(null)

    const updateTrackList = async () => {
        getTrackList(meta.current).then((value) => {
            setTrackList(value?.data?.results ?? [])
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
        updateTrackList()
    }, [meta.current])

    const confirm = (user: ITrack) => {
        hideTrack(user?.id).then((value) => {
            if (value) {
                notification.success({
                    message: `Xóa thành công người dùng ${user?.id}`
                })
                getTrackList(meta.current)
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

    const columns: ColumnsType<ITrack> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Like',
            dataIndex: 'like',
            key: 'like',
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (_, { photo }) => (
                <>
                    <Image
                        width={50}
                        src={`${BASE_URL}/static/${photo}`}
                        style={{ borderRadius: 400 / 2 }}
                    />
                </>
            ),
        },
        {
            title: 'is_active',
            dataIndex: 'is_active',
            key: 'id',
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
                                // setIsUpdateTrackModal(true)
                                // setDataUpdate(record)
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
                    // onClick={() => setIsAddTrackModalOpen(true)}
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    style={{ background: '#9ACD32', marginTop: '20px', marginRight: '10vw' }}>Thêm mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listTracks}
                pagination={{
                    current: meta.current,
                    total: meta.total,
                    pageSize: meta.pageSize,
                    onChange: (page) => { setMeta({ current: page, total: meta.total, pageSize: meta.pageSize }) },
                    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} người dùng`,
                }} />
        </>
    )
}

export default TrackTable;