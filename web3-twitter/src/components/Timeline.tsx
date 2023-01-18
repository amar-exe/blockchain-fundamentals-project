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
                    timestamp: w.timestamp.toNumber()
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
        <div className="timeline">
          {!account && (
              <h1 className="heading1">Log in to your account to post tweets!</h1>
            )}
            {account && tweets && tweets.length === 0 && (
              <p className="state-message">There is no tweets to display</p>
            )}
            {tweets &&
              tweets.length > 0 &&
              tweets.slice(0).reverse().map((m, i) => (
                <SingleTweet
                  key={i}
                  username={m.username}
                  tweet={m.content}
                  timestamp={m.timestamp}
                />
              ))}
          
          
        </div>
      );
    };



export default Timeline;