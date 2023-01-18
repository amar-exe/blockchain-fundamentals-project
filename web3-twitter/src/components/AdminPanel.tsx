import React, { useState } from 'react'
import { ethers } from "ethers";
interface Props {
    account?: string,
    tweetContract: ethers.Contract | undefined;
    }
  
const AdminPanel = ({ account, tweetContract }: Props) => {
    const [address, setAddress] = useState<string>("");
    const [username, setUsername] = useState<string>("");

    const [newOwner, setNewOwner] = useState<string>("");

    const changeOwner =async () => {
        if (!tweetContract) return;
        try {
            const messageTxn = await tweetContract.transferOwnership(newOwner)
            await messageTxn.wait();
            } catch (e) {
            console.warn("Transaction failed with error", e);
            } finally {
                window.location.reload();
            }
    }

    const changeUsername =async () => {
        if (!tweetContract) return;
        try {
            const messageTxn = await tweetContract.changeUsername(address, username)
            await messageTxn.wait();
            } catch (e) {
            console.warn("Transaction failed with error", e);
            } finally {
                
            }
    }
    
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
            <div className="input-group">
                <input type="text" 
                className="change-username-input" 
                placeholder='Address' 
                value={address} 
                onChange={(e) => {
                    setAddress(e.target.value)
                }}/>

                <input type="text" 
                className="change-username-input" 
                placeholder='New username' 
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
                <button className="button accept-btn"
                onClick={changeUsername}
                >Approve</button>
            </div>
        </div>
        <div className="transfer-ownership-section">
            <h5 className='function-title'>Transfer ownership</h5>
            <div className="input-group">
                <input type="text" 
                className="change-username-input" 
                placeholder='New Owner Address'
                value={newOwner}
                onChange={(e) => {
                    setNewOwner(e.target.value)
                }

                }/>
                <button className="button cancel-btn"
                onClick={changeOwner}
                >Transfer</button>
            </div>
        </div>
    </div>
  )
}

export default AdminPanel