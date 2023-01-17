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
        }
      };

  return (
    <div>
        <h1>Create Tweet</h1>
        <input type="text" value={tweetText} 
        onChange={(e) => 
        {setTweetText(e.target.value)}
        }></input>
        <button onClick={postTweet}>Post</button>
    </div>
  )
}

export default CreateTweet