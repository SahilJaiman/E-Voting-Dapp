import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      const activeAccount = await getAccount();
      setAccount(activeAccount);
    })();
  }, []);

  const onConnectWallet = async () => {
    await connectWallet();
    const activeAccount = await getAccount();
    setAccount(activeAccount);
    window.location.reload(false);
  };

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
        <img
              alt=""
              src="https://www.freepnglogos.com/uploads/indian-flag-png/indian-flag-india-day-background-png-image-download-5.png"
              width="54"
              height="36"
              className="d-inline-block align-top"
            />{' '}
          Voting Dapp
        </a>
        <span style={{fontSize: "24px"}} className="navbar-text">
          Welcome to Indian Prime Minister Election 2022
        </span>

        <div className="d-flex">
          <button onClick={onConnectWallet} color="primary" starticon="add" className="btn btn-outline-info">
            <span className="mx-1"><i className="bi bi-link "></i></span><span>Connect Wallet</span></button>

          <button className="btn btn-success mx-2">
            {account !== "" ? account : "To vote, link to a wallet!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
