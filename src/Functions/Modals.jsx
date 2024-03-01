import { Input, List, Modal } from "antd";

const healthGuides = [
  "Routinely change your password",
  "Don't do any suspicious transactions",
  "Don't open any unknown attachment",
];

export const comingSoon = () => {
  Modal.info({
    title: "Coming soon!",
    content: "Feature in development",
    okText: "Close",
    centered: true,
  });
};

export const healthGuide = () => {
  Modal.info({
    title: "Increase your account health",
    content: (
      <>
        <List
          size="small"
          dataSource={healthGuides}
          renderItem={(item, index) => (
            <List.Item>
              {index + 1}. {item}
            </List.Item>
          )}
        />
      </>
    ),
    okText: "Close",
    centered: true,
  });
};

export const changePassword = () => {
  Modal.warning({
    title: "Changing password",
    content: (
      <>
        <Input.Password placeholder="Enter your new password" />
      </>
    ),
    okText: "Update",
    centered: true,
  });
};

export const deleteAccount = () => {
  Modal.warning({
    title: "Are you sure you want to delete your account?",
    okText: "Delete",
    cancelText: "Cancel",
    centered: true,
  });
};
