import React, { useEffect, useState } from "react";
import { Tweet } from "../types";
import { ethers } from "ethers";

interface Props {
    account?: string,
    tweetContract: ethers.Contract | undefined;
    }

const AddUsername = ({account, tweetContract}: Props) => {
    const [username, setUsername] = useState<string>("");

    const addUsername =async () => {
        if (!tweetContract) return;
        try {
            const messageTxn = await tweetContract.addUsername(username)
            await messageTxn.wait();
            } catch (e) {
            console.warn("Transaction failed with error", e);
            } finally {
                window.location.reload();
            }
    }

  return (
    <div className="transfer-ownership-section">
            <h5 className='function-title'>Please add your username before you can post a tweet</h5>
            <div className="input-group">
                <input type="text" 
                className="change-username-input" 
                placeholder='Add your desired username'
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }

                }/>
                <button className="button cancel-btn"
                onClick={addUsername}
                >Add</button>
            </div>
        </div>
  )
}

export default AddUsername