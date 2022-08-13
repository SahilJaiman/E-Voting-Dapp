
import { contractAddress } from "./contract";
import { tezos } from "./tezos";

export const  voteCandidateAOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.vote_for_candidate_A().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};



export const voteCandidateBOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.vote_for_candidate_B().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};

export const resetOperation = async () => {
    try {
        const contractInstance = await tezos.wallet.at(contractAddress);
        const op = await contractInstance.methods.reset_voting().send();
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
};
