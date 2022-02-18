import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';


const ADDRESS = "0x0aA3dB8776B75e16628ec5Ac4330FA65b5376FF2";
const apikey = "PS72K7NWSV7GWFT1W1SWV1RY3RU7P5SEQ5";
const endpoint = "https://api-rinkeby.etherscan.io/api"

async function connectwallet() { 
      if (window.ethereum) { 
      var web3 = new Web3(window.ethereum); 
      await window.ethereum.send('eth_requestAccounts'); 
      var accounts = await web3.eth.getAccounts(); 
      account = accounts[0]; 
      document.getElementById('wallet-address').textContent = account; 
      contract = new web3.eth.Contract(ABI, ADDRESS);
      }
}
async function mint() {
      if (window.ethereum) { 
        var _mintAmount = Number(document.querySelector("[name=amount]").value); 
        var mintRate = Number(await contract.methods.cost().call()); 
        var totalAmount = mintRate * _mintAmount; 
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
      }
    } 

class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
		};
	}

	async componentDidMount() {
		const etherscan = await axios.get(endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`);

		let { result } = etherscan.data;
		this.setState({
		 balance: result,
		});
  }
  render() {
	const {balance} = this.state;

  return (
    <div className="App">
 <div className='container'>
<div className='row'>
  <form class="gradient col-lg-5 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 15px #000000"}}>
    <h4 style={{color:"#FFFFFF"}}>Mint Portal</h4>
    <h5 style={{color:"#FFFFFF"}}>Please connect your wallet</h5>
    <Button onClick={connectwallet} style={{marginBottom:"5px",color:"#FFFFFF"}}>Connect Wallet</Button>
    <div class="card" id='wallet-address' style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <label for="floatingInput">Wallet Address</label>
      </div>
      <div class="card" style={{marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
      <label >Please select the amount of NFTs to mint.</label>
      <Button onClick={mint}>Buy/Mint!</Button>
      </div>
    <label style={{color:"#FFFFFF"}}>Price 0.05 ETH each mint.</label>
	<h2> Tokens Minted so far= {balance}/1000</h2>
  </form>
	</div>
 	</div>
    </div>
  			);
	};
}

export default App;
