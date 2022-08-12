import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { voteCandidateAOperation, voteCandidateBOperation } from "./utils/operation"
import { fetchStorage } from "./utils/tzkt";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { getAccount } from "./utils/wallet";

const App = () => {
  // Voters
  const [voters, setVoters] = useState([]);
  const [candidateA_votes, setCandidateAVotes] = useState(0);
  const [candidateB_votes, setCandidateBVotes] = useState(0);
  const [total_votes, setTotalVotes] = useState(0);
  const [user_status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active_account, setAccount] = useState("");


  useEffect(() => {

    (async () => {

      const storage = await fetchStorage();
      setVoters(Object.keys(storage.voters));
      setCandidateAVotes(storage.candidateA_votes);
      setCandidateBVotes(storage.candidateB_votes);
      setTotalVotes(storage.total_votes);
      const activeAccount = await getAccount();
      setAccount(activeAccount);
      setStatus(Object.keys(storage.voters).includes(activeAccount));
    })();
  }, []);

  // onVoteCandidateA function
  const onVoteCandidateA = async () => {
    try {
      setLoading(true);
      await voteCandidateAOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
    setLoading(false);
    window.location.reload(false);
  };

  // onVoteCandidateB function
  const onVoteCandidateB = async () => {
    try {
      setLoading(true);
      await voteCandidateBOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
    setLoading(false);
    window.location.reload(false);
  };

  return (
    <div className="h-100">

      <Navbar />

      <div className="d-flex flex-row justify-content-around align-items-center h-100">
        <div>
          <span>
            Status 
          {user_status === true ?
            <small className="d-inline-flex mx-1 mb-2 px-1 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">
              <span className="mx-1"><i class="bi bi-check-circle-fill"></i></span><span>Voted</span>
            </small>
            :
            <small className="d-inline-flex mx-1 mb-2 px-1 py-1 fw-semibold text-danger bg-danger bg-opacity-10 border border-danger border-opacity-10 rounded-2">
            <span className="mx-1"><i class="bi bi-x-circle-fill"></i></span><span>Not Voted</span>
            </small>
            }
            </span>

          <small className="d-flex mb-3 px-2 py-1 fw-semibold text-dark bg-info bg-opacity-10 border border-info border-opacity-10 rounded-2">Recent Voters</small>
          <div style={{ width: "450px", height: "200px", flexDirection: "column-reverse" }} className="d-flex flex-column overflow-auto border border-2" >
            {voters.map((voter, index) => (
              <div key={index}>
                <b>Voter {index + 1}:</b> {voter}
              </div>
            ))}
          </div>
          <small className="d-inline-flex mt-3 px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2">Total Votes: {total_votes} </small>

        </div>
        <CardGroup>
          <Card border="light" style={{ width: '18rem', marginTop: "8px", marginRight: "40px" }}>
            <Card.Img style={{ width: "286px", height: "340px" }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Official_Photograph_of_Prime_Minister_Narendra_Modi_Potrait.png/330px-Official_Photograph_of_Prime_Minister_Narendra_Modi_Potrait.png" />
            <Card.Body>
              <Card.Title>Narendra Modi </Card.Title>
              <Card.Text>
                Vote Count: {candidateA_votes}
              </Card.Text>
              <Button style={{ width: "80px" }} disabled={loading} onClick={onVoteCandidateA} variant="primary" >
                {loading === true ? <span> <Spinner as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" /></span> : "Vote"}
              </Button>
            </Card.Body>
          </Card>
          <Card border="light" style={{ width: '18rem', marginLeft: "40px" }}>
            <Card.Img style={{ width: "286px", marginTop: "8px", height: "340px" }} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rahul_Gandhi_%28portrait_crop%29.jpg/330px-Rahul_Gandhi_%28portrait_crop%29.jpg" />
            <Card.Body>
              <Card.Title>Rahul Gandhi </Card.Title>
              <Card.Text>
                Vote Count: {candidateB_votes}
              </Card.Text>
              <Button style={{ width: "80px" }} disabled={loading} onClick={onVoteCandidateB} variant="primary">
                {loading === true ? <span> <Spinner as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" /></span> : "Vote"}
              </Button>
            </Card.Body>
          </Card>
        </CardGroup>


      </div>
    </div>
  );
};

export default App;
