import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import { changePassword } from "../../Functions/Modals";

function ChangePassword() {
  return (
    <>
      <Card>
        <Flex align="center" justify="space-between">
          Change your password
          <Button
            shape="circle"
            icon={<EditOutlined />}
            danger
            onClick={changePassword}
          />
        </Flex>
      </Card>
    </>
  );
}

export default ChangePassword;
