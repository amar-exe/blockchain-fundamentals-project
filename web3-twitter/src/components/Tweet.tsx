import React from "react";

interface Props {
  username: string;
  tweet: string;
  timestamp: number;
}

const SingleTweet = ({ username, tweet, timestamp }: Props) => {
  return (
    <div className="tweet">
          <h1>{username}</h1>
          <p>{tweet}</p>
          <small>Posted on {timestamp}</small>
      </div>
  );
};

export default SingleTweet;