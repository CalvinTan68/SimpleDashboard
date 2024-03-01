import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import { deleteAccount } from "../../Functions/Modals";

function DeleteAccount() {
  return (
    <>
      <Card>
        <Flex align="center" justify="space-between">
          Delete your account
          <Button
            shape="circle"
            icon={<EditOutlined />}
            danger
            onClick={deleteAccount}
          />
        </Flex>
      </Card>
    </>
  );
}

export default DeleteAccount;
