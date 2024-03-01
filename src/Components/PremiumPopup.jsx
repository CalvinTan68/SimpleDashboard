import { Button, Card, Typography } from "antd";
import { useState } from "react";

function PremiumPopup() {
  const [buttonClick, setButtonClick] = useState(false);

  const clickedYes = () => {
    setButtonClick(true);
  };

  return (
    <>
      {buttonClick ? null : (
        <Card className="popup premium">
          <Typography.Title level={5}>Need more features?</Typography.Title>
          <Typography.Text>
            Upgrade your account to access more features
          </Typography.Text>
          <Button block onClick={clickedYes} type="primary">
            Get now
          </Button>
        </Card>
      )}
    </>
  );
}

export default PremiumPopup;
