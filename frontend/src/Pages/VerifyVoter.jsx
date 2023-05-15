import React, {useState, useEffect} from "react";
import {Row, Col, Radio, Typography, Card, Table} from "antd";
import EnhancedTable from "../components/EnahancedTable";
import axios from "axios";
import { Button } from "antd/es/radio";
import {format} from 'date-fns'

const VerifyVoter = () => {
    const [status, setStatus] = useState("All");
    const [refreshing, setRefreshing] = useState(true)
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        onLoad()
    },[status])

    useEffect(() => {
        onLoad()
    },[])


    const showTotal = (total, range) => <Typography.Text>{range[0]}-{range[1]} of {total} items</Typography.Text>
    const [pagination, setPagination] =  useState({
        current: 1,
        pageSize: 5,
        total: 0,
        size: "middle",
        showTotal,
        showSizeChanger: true
    }) 
    const onLoad = async () => {
        setRefreshing(true)
        try{
            let url = `http://localhost:8080/user?page=${pagination.current}&limit=${pagination.pageSize}`
            const res = await axios.get(url, {
                headers: { filters: JSON.stringify({status: status})}
            })
            setVoters(res.data.user)
        } catch {

        }
        setRefreshing(false)
    }

    const onTableChange = (pagination, filters) => {
        onLoad({pagination, filters})
    }

    const tableColumns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (name) => (
                <span>{name}</span>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (email) => (
                <span>{email}</span>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone",
            render: (phone) => (
                <span>{phone}</span>
            )
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (gender) => (
                <span>{gender}</span>
            ),
            width: 100
        },
        {
            title: "D.O.B.",
            dataIndex: "dob",
            render: (dob) => (
                <span>{format(new Date(dob), 'dd MMM yyy')}</span>
            ),
            width: 100
        },
        {
            title: "age",
            dataIndex: "dob",
            render: (dob) => (
                <span>{new Date() - new Date(dob)}</span>
            )
        },
        {
            title: "State",
            dataIndex: "state",
            render: (state) => (
                <span>{state}</span>
            )
        },
        {
            title: "City",
            dataIndex: "city",
            render: (city) => (
                <span>{city}</span>
            )
        },
        {
            title: "Action",
            dataIndex: "actions",
            render: (_) => (
                <div style={{display: "flex", gap: "5px"}}>
                <Button>Verify</Button>
                <Button>Un-Verify</Button>
                </div>

            )
        },
    ]

    return (
        <>
            <Row gutter={[8, 8]} justify="space-between" className="mb-4">
                <Col span={20}>
                    <Row gutter={8}>
                        <Col>
                            <Typography.Title level={2}>All Voters</Typography.Title>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div>
                <Radio.Group value={status} onChange={e => setStatus(e.target.value)} buttonStyle="solid" size="small">
                    <Radio.Button value="All">&emsp;All&nbsp;</Radio.Button>
                    <Radio.Button value="Verified">&nbsp;Verified&nbsp;</Radio.Button>
                    <Radio.Button value="Not Verified">&emsp;Not Verified&nbsp;</Radio.Button>
                </Radio.Group>
            </div>
            <Card
                bodyStyle={{padding: 0}}
                className="mt-3"
            >
               <Table
                    rowKey='_id'
                     columns={tableColumns}
                    dataSource={voters}
                    onChange={onTableChange}
                    loading={refreshing}
                    sticky
                    scroll={{ y: "50vh"}}
                />
            </Card>
        </>
    
    )
}

export default VerifyVoter;