import React, { useEffect, useState } from "react";
import { Tweet } from "../types";
import { ethers } from "ethers";

interface Props {
    account?: string,
    tweetContract: ethers.Contract | undefined;
    }

const CreateTweet = ({account, tweetContract}: Props) => {
    const [tweetText,setTweetText] = useState<string>("");
    const postTweet = async () => {
        if (!tweetContract) return;
        try {
          const postTxn = await tweetContract.postTweet(tweetText);
          await postTxn.wait();
        } catch (e) {
          console.warn("Transaction failed with error", e);
        } finally {
          setTweetText("");
        }
      };

  return (
    <div>
        <h1>Create Tweet</h1>
        <div className="input-group">
        <textarea name="myText" id="myTextarea" placeholder="Type here..." value={tweetText} 
        onChange={(e) => 
        {setTweetText(e.target.value)}
        }></textarea>
        <button className="button post-tweet" onClick={postTweet}>Post</button>
    </div>
    </div>
  )
}

export default CreateTweet