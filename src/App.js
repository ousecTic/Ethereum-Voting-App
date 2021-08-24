import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import OnBoardingButton from "./OnboardingButton"
import Voting from "./artifacts/contracts/Voting.sol/Voting.json"

const votingAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"

function App() {

  let [account, setAccount] = useState("Guest")
  let [blueScore, setBlueScore] = useState(0)
  let [redScore, setRedScore] = useState(0)

  async function fetchScore() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(votingAddress, Voting.abi, provider);
      const score = await contract.showScore();
      console.log("Score: ", score);
      setRedScore(score[0]);
      setBlueScore(score[1])
    }
  }

  useEffect(() => {
    fetchScore();
  }, [])

  async function vote(color) {
    try {
      if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(votingAddress, Voting.abi, signer)
      const transaction = await contract.castVote(color)
      await transaction.wait()
    }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>BlockBank</h1>
        <h3>{`Welcome ${account}`}</h3>
        <OnBoardingButton setAccount={setAccount} />
        <h4>{`Blue : ${blueScore}`}</h4>
        <h4>{`Red : ${redScore}`}</h4>
        <button onClick={() => vote("red")}>Vote Red</button>
        <button onClick={() => vote("blue")}>Vote Blue</button>
      </header>
    </div>
  );
}

export default App;
