import { Button, Card, Divider, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import "./Dashboard.scss";
import { toast } from "react-toastify";

function Dashboard() {
  const [twittArea, setTwittArea] = useState("");

  type Tweet = {
    tweet: string;
  };

  const send_tweet_url = "/.netlify/functions/tweet";

  const {
    refresh: sendTweet,
    error,
    isLoading,
  } = useQuery<unknown, Tweet>({
    path: send_tweet_url,
    method: "POST",
    isDisabled: true,
  });

  const handleSendTweet = async () => {
    const tweet = {
      tweet: twittArea,
    };
    const result = await sendTweet(tweet);

    if (result?.statusText === "OK") {
      setTwittArea("");
      toast("Tweet successfully sent!");
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Error sending tweet");
    }
  }, [error]);

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
        >
          Send tweet
        </Button>
      </Card>
    </>
  );
}

export default Dashboard;
