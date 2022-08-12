// TODO 1 - Setup Tezos Toolkit
import { wallet } from "./wallet"
import { TezosToolkit} from "@taquito/taquito"

export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");
// TODO 3 - Specify wallet provider for Tezos instance

tezos.setWalletProvider(wallet);

