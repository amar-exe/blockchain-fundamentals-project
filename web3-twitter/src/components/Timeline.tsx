import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Tweet } from "../types";
import SingleTweet from "./Tweet";

interface Props {
    account?: string,
    tweetContract: ethers.Contract | undefined;
}

const Timeline = ({account, tweetContract}: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>();

    const getTweets = async () => {
        if (!tweetContract || account) return;

        const tweets = await tweetContract.getTweets();

        setTweets(() => {
            return tweets.map((w: any) => (
                {
                    address: w.sender,
                    username: w.username,
                    content: w.content,
                    timestamp: w.timestamp._hex
                }
            ));
        }

        );
    };

    useEffect(() => {
        if (!tweetContract || tweets) return;
        getTweets();
    }, [tweetContract]);

    return (
        <div className="chat">
          <div className="chat__messages">
            {!tweetContract && (
              <p className="state-message">
                Connect to the chat in order to see the messages!
              </p>
            )}
            {account && tweets && tweets.length === 0 && (
              <p className="state-message">There is no message to display</p>
            )}
            {tweets &&
              tweets.length > 0 &&
              tweets.map((m, i) => (
                <SingleTweet
                  key={i}
                  username={m.username}
                  tweet={m.content}
                  timestamp={m.timestamp}
                />
              ))}
          </div>
          {!account && (
              <p className="state-message">Connect With Metamask to chat!</p>
            )}
          
        </div>
      );
    };



export default Timeline;