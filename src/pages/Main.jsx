import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

const { Header, Sider, Content } = Layout;
const AdminContext = React.createContext([]);

const Main = () => {
  const [objects, setObject] = useState({
    headers: ["id", "name", "username", "password"],
    body: [
      {
        id: 1,
        name: "Maqsud",
        username: "123",
        password: 123,
      },
      {
        id: 2,
        name: "Maqsud 2",
        username: "123 cfs",
        password: 123657676,
      },
      {
        id: 3,
        name: "Maqsud 4",
        username: "sdfsdfsdf sdf sdfsd fcfs",
        password: 9999999,
      },
    ],
  });

  function getDataFromServer(url) {
    axios.get(url).then((res) => {
      setObject(res.data);
    });
  }

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link
                  to={"/"}
                  onClick={getDataFromServer(
                    "http://localhost:8080/api/user/list"
                  )}
                >
                  <UserOutlined />
                </Link>
              ),
              label: "user",
            },
            {
              key: "2",
              icon: (
                <Link to={"/"}>
                  <VideoCameraOutlined />
                </Link>
              ),
              label: "course",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "queue",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "group",
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "admin",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <table className={"table"}>
            <thead>
              <tr>
                {objects.headers.map((data) => {
                  return <th>{data}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {objects.body.map((data, index) => {
                return (
                  <tr>
                    {objects.headers.map((td) => {
                      return <td>{data[td]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
