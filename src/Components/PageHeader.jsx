import { Divider, Typography } from "antd";

function PageHeader({ title, divider, subtitle, extra }) {
  return (
    <>
      {title ? <Typography.Title>{title}</Typography.Title> : null}
      {subtitle ? <Typography.Text>{subtitle}</Typography.Text> : null}
      {divider ? <Divider /> : null}
    </>
  );
}

export default PageHeader;
