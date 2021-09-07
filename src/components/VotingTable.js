import { useState, useEffect } from "react";
import { ethers } from "ethers";
import OnBoardingButton from "../OnboardingButton";
import DelegateVoting from "../artifacts/contracts/DelegateVoting.sol/DelegateVoting.json";

const delegateVotingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const VotingTable = () => {

  let [account, setAccount] = useState("Guest");

  let [selectDelegate, setSelectDelegate] = useState("joe-biden")

  let [bidenScore, setBidenScore] = useState(0);

  let [trumpScore, setTrumpScore] = useState(0);

   async function listenForScore() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(delegateVotingAddress, DelegateVoting.abi, provider);

      contract.on("VoteCast", async (joeBidenScore, donaldTrumpScore) => {
        //parseInt(hexString, 16)
        // setBidenScore(parseInt(joeBidenScore._hex, 16));
        // setTrumpScore(parseInt(donaldTrumpScore._hex, 16));

        setBidenScore(joeBidenScore.toNumber())
        setTrumpScore(donaldTrumpScore.toNumber())
      })
      // const score = await contract.showScore();
      // console.log("Score: ", score);
      // setBidenScore(score[0]);
      // setTrumpScore(score[1])
    }
  }

  useEffect(() => {
    listenForScore();
  },[])

  async function vote(color) {
    try {
      if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(delegateVotingAddress, DelegateVoting.abi, signer)
      const transaction = await contract.castVote(color)
        await transaction.wait()
        
        // if (color === "joe-biden") {
        //   setBidenScore(bidenScore + 1);
        // } else {
        //   setTrumpScore(trumpScore + 1);
        // }
        
    }
    } catch (error) {
      console.log(error)
      alert(error.data.message)
    }
  }

  console.log(selectDelegate)

  return (
    <>
      <OnBoardingButton setAccount={setAccount} />
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Candidate Name</th>
      <th scope="col">Votes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Joe Biden</td>
            <td>{bidenScore}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Donald Trump</td>
            <td>{trumpScore}</td>
    </tr>
  </tbody>
      </table>
      
      <div className="d-inline-flex">
      <select class="form-select" aria-label="Default select example"  onChange={e => setSelectDelegate(e.currentTarget.value)}>
  <option selected>Select Delegate</option>
  <option value="joe-biden" selected>Joe Biden</option>
  <option value="donald-trump">Donald Trump</option>
</select>
        <input type="button" className="btn btn-primary" value="Vote" onClick={() => vote(selectDelegate)}/>
      </div>
    </>
  )
}

export default VotingTable;