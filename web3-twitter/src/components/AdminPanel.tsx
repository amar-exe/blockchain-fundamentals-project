import React, { useState } from 'react'
import { ethers } from "ethers";
interface Props {
    account?: string,
    tweetContract: ethers.Contract | undefined;
    }
  
const AdminPanel = ({ account, tweetContract }: Props) => {
    
    const deleteMessages = async () => {
        if (!tweetContract) return;
        try {
        const messageTxn = await tweetContract.deleteMessages()
        await messageTxn.wait();
        } catch (e) {
        console.warn("Transaction failed with error", e);
        } finally {
            console.log("radi");
        }
    };
    return (
    <div className="admin-panel-wrapper">
        <h2 className="section-title">AdminPanel</h2>
        <div className="change-username-section">
            <h5 className='function-title'>Change username</h5>
            <input type="text" className="change-username-input" placeholder='' />
            <input type="text" className="change-username-input" />
            <button className="approve-button">Approve</button>
        </div>
        <div className="transfer-ownership-section">
            <h5 className='function-title'>Transfer ownership</h5>
            <input type="text" className="transfer-ownership-input" />
            <input type="text" className="transfer-ownership-input" />
            <button className="approve-button">Approve</button>
        </div>
    </div>
  )
}

export default AdminPanel