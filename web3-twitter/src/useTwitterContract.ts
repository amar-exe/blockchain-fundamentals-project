import { ethers } from "ethers";
import { useState, useEffect } from "react";

const useChatContract = (
    contractAddress: string,
    web3TwitterAbi: ethers.ContractInterface,
    account?: string
): ethers.Contract | undefined => {
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
    const [webThreeProvider, setWebThreeProvider] =
        useState<ethers.providers.Web3Provider>();
    const { ethereum } = window;

    useEffect(() => {
        if (ethereum) {
            setWebThreeProvider(new ethers.providers.Web3Provider(window.ethereum));
        }
    }, [ethereum]
    );

    useEffect(() => {
        if (webThreeProvider && account) {
            setSigner(webThreeProvider.getSigner());
        }
    }, [account, webThreeProvider]);

    if (!contractAddress || !web3TwitterAbi || !ethereum || !webThreeProvider)
        return;

    return new ethers.Contract(
        contractAddress,
        web3TwitterAbi,
        signer || webThreeProvider
    );
};

export default useChatContract;