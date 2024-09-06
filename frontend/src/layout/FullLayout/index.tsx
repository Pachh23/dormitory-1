// Layout ของหอพักนักศึกษา กำหนด Routes
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import logo from "../../assets/logo.png";
import Homepages from "../../pages/homepage";
import Personal from "../../pages/personal";
import PersonalCreate from "../../pages/personal/create";
const { Header, Content, Footer, Sider } = Layout;

const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
   
  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };
  const Logout = () => {
    localStorage.clear();
    messageApi.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: '#0c1327',  // Sidebar
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ width: "80%" }}
              />
            </div>
            <Menu
              theme="dark"
              style={{
                backgroundColor: '#0c1327',  // Sidebar
              }}
              defaultSelectedKeys={[page ? page : "homepage"]}
              mode="inline"
            >
              <Menu.Item
                key="homepage"
                onClick={() => setCurrentPage("homepage")}
              >
                <Link to="/">
                  <HomeOutlined />
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="personal"
                onClick={() => setCurrentPage("personal")}
              >
                <Link to="/personal">
                  <UserOutlined />
                  <span>ข้อมูลส่วนตัว</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button onClick={Logout} style={{ margin: 4 }}>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Homepages />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/personal/create" element={<PersonalCreate />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dormitory
        </Footer>
      </Layout>
    </Layout>
  );
};
export default FullLayout;