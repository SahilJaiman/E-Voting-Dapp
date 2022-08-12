import smartpy as sp

class Voting(sp.Contract):
    def __init__(self):
        #Storage
        self.init(
            voters = sp.map(l = {}, tkey = sp.TAddress , tvalue = sp.TBool ),
            candidateA_votes=sp.nat(0),
            candidateB_votes=sp.nat(0),
            total_votes = sp.nat(0),
            admin = sp.address("tz1TNpJWCEWEhkaX8zUrZ1WJx5q4z4jwL9yp")
            )
    def _onlyAdmin(self):
        sp.verify(sp.sender == self.data.admin,self.error.adminOnly())

    @sp.entry_point
    def vote_for_candidate_A(self):  

        #Assertions
        sp.verify(self.data.voters.contains(sp.sender)==sp.bool(False) , "User has already voted")
        
        #Storage Changes

        self.data.voters[sp.sender] = sp.bool(True)
        self.data.candidateA_votes = self.data.candidateA_votes + 1
        self.data.total_votes = self.data.total_votes + 1

    @sp.entry_point
    def vote_for_candidate_B(self):  

        #Assertions
        sp.verify(self.data.voters.contains(sp.sender)==sp.bool(False) , "User has already voted")
        
        #Storage Changes

        self.data.voters[sp.sender] = sp.bool(True)
        self.data.candidateB_votes = self.data.candidateB_votes + 1
        self.data.total_votes = self.data.total_votes + 1


       


@sp.add_test(name="main")
def test():

    scenario = sp.test_scenario()

    #Test accounts

    admin  = sp.test_account("admin")
    sahil  = sp.test_account("sahil")
    archit = sp.test_account("archit")
    yash   = sp.test_account("yash")
    samridhi  = sp.test_account("samridhi")
    rohit  = sp.test_account("rohit")

    #Contract Instance

    voting = Voting()
    scenario += voting

    #vote_for_candidate_A

    scenario +=  voting.vote_for_candidate_A().run(sender = sahil)
    scenario +=  voting.vote_for_candidate_A().run(sender = samridhi)
    scenario +=  voting.vote_for_candidate_A().run(sender = rohit) 
    #vote_for_candidate_B
    scenario +=  voting.vote_for_candidate_B().run(sender = archit)
    scenario +=  voting.vote_for_candidate_B().run(sender = yash)

    #Duplicate voting test
    scenario +=  voting.vote_for_candidate_B().run(sender = archit)
    









    