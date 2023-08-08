import { Button, Card, Divider, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import useQuery from "../../hooks/useQuery";
import { sendTweet } from "../../services/twitter";
import "./Dashboard.scss";
import useMainContext from "../../contexts/useMainContext";
import { toast } from "react-toastify";
import axios from "axios";
import netlifyIdentity from "netlify-identity-widget";

function Dashboard() {
  const [twittArea, setTwittArea] = useState("");
  const { twitterToken } = useMainContext();

  const { refresh, isLoading } = useQuery({
    axiosFn: sendTweet,
    isDisabled: true,
  });

  const handleSendTweet = async () => {
    if (!twitterToken) return;
    const twitt = {
      text: twittArea,
      token: twitterToken,
    };
    await refresh(twitt);
    setTwittArea("");
    toast("Tweet successfully sent!");
  };

  return (
    <>
      <Card className="cardWrapper">
        <Input.TextArea
          className="twittArea"
          rows={4}
          showCount
          value={twittArea}
          onChange={(e) => setTwittArea(e.target.value)}
          maxLength={280}
          autoSize={{ minRows: 4, maxRows: 8 }}
        />
        <Divider />
        <Button
          icon={<SendOutlined />}
          loading={isLoading}
          disabled={!twittArea}
          onClick={handleSendTweet}
        />
      </Card>
      <Button
        onClick={async () => {
          const n = netlifyIdentity.currentUser();

          console.log({ n });
          // const auth = new GoTrue({
          //   APIUrl: "/.netlify/identity",
          // });

          const result = (
            await axios.post("./.netlify/functions/test", {
              test: "test",
            },{
              headers: {
                Authorization: `Bearer ${
                  netlifyIdentity.currentUser()?.token?.access_token
                }`,
              },
            })
          ).data;
          console.log(result);
          console.log(result.headers.Authorization)
        }}
      >
        {" "}
        Test
      </Button>
    </>
  );
}

export default Dashboard;
