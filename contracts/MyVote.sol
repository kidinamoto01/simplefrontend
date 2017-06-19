pragma solidity ^0.4.0;
contract MyVote {

    struct Voter {
        uint weight;
        bool voted;
        bool valid; //
    }

    struct Proposal {
        uint voteNum;
        uint voteCount;
        address document;
    }

   //event
   event SendVote(address indexed whoIncreased,bytes messages);
   event EvaluateResult(address indexed whoAsked,bool result);
    address chairperson;
    //投票
     uint256 voteNum;
     //
     uint256 voteCount;

    //存储投票人的地址
    mapping(address => Voter) public voters;

    /// Create a new ballot with $(_numProposals) different proposals.
    function MyVote() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        voteNum = 1;
    }

    /// Give $(voter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    function giveRightToVote(address voter) {
        if (msg.sender != chairperson || voters[voter].voted||voters[voter].valid) return;
        else{
            voters[voter].weight = 1;
            voteNum ++;
            voters[voter].valid = true;
        }
    }

    function getCount() constant returns(uint){
        return voteCount;
    }

    function getSum() constant returns(uint){
        return voteNum;
    }

    /// Give a single vote to approve a proposal.
   //不能重复
    function vote() returns (bool success){
        Voter sender = voters[msg.sender];
        if (sender.voted) return false;
        else{
            sender.voted = true;
            voteCount += sender.weight;
            voters[msg.sender].weight --;
            //send event
            SendVote(msg.sender,"someone has voted");
            return true;
        }
    }

    function isApproved() constant returns (bool) {
       // uint256 votersSum = 0;
        /* for (uint8 voter = 0; voter < m_VoteCount; voter++){
             votersSum += voter.weight;
         }*/
         var isValidate = false;
         if( voteCount *2 > voteNum )
              isValidate = true;
          else
              isValidate = false;
         EvaluateResult(msg.sender,isValidate);
         return isValidate;
    }

    function kill(){
        if(msg.sender == chairperson){
            selfdestruct(chairperson);
        }
    }
}

