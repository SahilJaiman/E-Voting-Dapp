import { Button, Divider, Input, Text,Badge } from '@nextui-org/react';
import React from 'react';
import { useState, useEffect } from "react";
import { resetOperation, voteCandidateAOperation, voteCandidateBOperation } from "../../utils/operation"
import { fetchStorage } from "../../utils/tzkt";
import useDarkMode from 'use-dark-mode';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { getAccount } from "../../utils/wallet";
import { CandidateCard } from '../card/card';



export default function Mainsection() {

  const darkMode = useDarkMode(false);
  // Voters
  const [voters, setVoters] = useState([]);
  const [candidateA_votes, setCandidateAVotes] = useState(0);
  const [candidateB_votes, setCandidateBVotes] = useState(0);
  const [total_votes, setTotalVotes] = useState(0);
  const [user_status, setStatus] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {

    (async () => {

      const storage = await fetchStorage();
      setVoters(Object.keys(storage.voters));
      setCandidateAVotes(storage.candidateA_votes);
      setCandidateBVotes(storage.candidateB_votes);
      setTotalVotes(storage.total_votes);
      const activeAccount = await getAccount();
      setStatus(Object.keys(storage.voters).includes(activeAccount));
    })();
  }, []);

  // onVoteCandidateA function
  const onVoteCandidateA = async () => {
    try {
      setLoadingA(true);
      await voteCandidateAOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
    setLoadingB(false);
    window.location.reload(false);
  };

  // onVoteCandidateB function
  const onVoteCandidateB = async () => {
    try {
      setLoadingB(true);
      await voteCandidateBOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
    setLoadingB(false);
    window.location.reload(false);
  };

  const onReset = async () => {
    try {
      setReset(true);
      await resetOperation();
      alert("Transaction Confirmend!");
    } catch (err) {
      alert("Transaction failed: " + err.message);
    }
    setReset(false);
    window.location.reload(false);
  };








  return (
    <>

      <Box>
        <Flex
          css={{
            'gap': '$3',
            'px': '$6',
            'flexDirection': 'column',
            'alignContent': 'center',
            'justifyContent': 'space-around',
            'alignItems': 'center',
            'width': '100%',
            '@sm': {
              flexDirection: 'row',
              mt: '$20',
            },

          }}
          justify={'around'}
        >

          <Box
            css={{
              pt: '$12',

              display: 'flex',
              flexDirection: 'column',
              gap: '$5',
              '@sm': {
                flexDirection: 'row',
                mt: '$10',
              },


            }}
          >
            <CandidateCard src={"https://www.freepnglogos.com/uploads/modi-png/texas-india-forum-howdy-modi-23.png"} name={"Narendra Modi"} votes={candidateA_votes} onPress={() => onVoteCandidateA()} />
            <CandidateCard src={"https://clipart.info/images/ccovers/1503498237rahul%20gandhi%20png.png"} name={"Rahul Gandhi"} votes={candidateB_votes} onPress={() => onVoteCandidateB()} />



          </Box>
          <Box
            css={{
              pt: '$13',

              display: 'flex',
              flexDirection: 'column',
              gap: '$5',

            }}
          >
            <div className="d-flex flex-row justify-content-around align-items-center h-100">
              <div>
                <span>
                  
                  {user_status === true ?
                     <Badge color="success" size="lg">Voted</Badge>
                    :
                    <Badge color="error" size="lg">Not Voted</Badge>
                    
                  }
                </span>

                <Button flat color="primary" auto 
                  css={{ my:'$2'}}
                >
                  Recent Voters
                </Button>
                <div style={{ width: "450px", height: "200px", flexDirection: "column-reverse" }} className="d-flex flex-column overflow-auto border border-2" >
                  {voters.map((voter, index) => (
                    <div key={index}>
                      {voter}
                    </div>
                  ))}
                </div>
                <Button flat color="success" auto css={{ mt: '$2' }}>
                  Total Votes : {total_votes}
                </Button>
                <Button disabled={loadingB | loadingA | reset} onClick={onReset} style={{ width: "160px" }} className="d-block mt-2" variant="warning">
                  {reset === true ? <span>

                  </span> : "Reset Election"}

                </Button>{' '}

              </div>
            </div>
          </Box>


        </Flex>
      </Box>

    </>
  )
}
