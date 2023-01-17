import React from "react";

interface Props {
  username: string;
  tweet: string;
  timestamp: number;
}

const SingleTweet = ({ username, tweet, timestamp }: Props) => {
   //const decimalTimestamp = parseInt(timestamp.toString(), 16);

  // create a new Date object
  const date = new Date(timestamp*1000);
  /*
  // format the date as a string*/
  const formattedDate = date.toString(); 
  return (
    
    <div id="quote-box">
        <div className="quote-text">
            <span id="text">{tweet}</span>
        </div>
        <div className="quote-author">
            <span id="author">@{username}</span>
        </div>
        <div className="quote-date">
          <span id="date">on {formattedDate}</span>
        </div>
      
    </div>
  );
};

export default SingleTweet;