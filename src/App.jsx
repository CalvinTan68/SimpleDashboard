import { Layout } from "antd";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { pageList } from "./Data/pageList";
import { loginSuccessMessage } from "./Functions/Messages";

const { Sider, Content } = Layout;

function App() {
  useEffect(() => {
    loginSuccessMessage();
  }, []);

  return (
    <>
      <Layout hasSider>
        <Sidebar />
        <Layout>
          <Content>
            <Routes>
              {pageList?.map((pages) => (
                <Route
                  path={pages.key}
                  element={pages.element}
                  key={pages.key}
                />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
