const ADDRESS = "0x0aA3dB8776B75e16628ec5Ac4330FA65b5376FF2";
const apikey = "PS72K7NWSV7GWFT1W1SWV1RY3RU7P5SEQ5";
const endpoint = "https://api-rinkeby.etherscan.io/api"
const nftpng = "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/";

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
			nftdata: [],
		};
	}

	async componentDidMount() {
		
		await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })

		await axios.get((endpoint + `?module=account&action=tokennfttx&contractaddress=${ADDRESS}&page=1&offset=100&tag=latest&apikey=${apikey}`))
		.then(outputb => {
			const { result } = outputb.data
            this.setState({
                nftdata:result
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;

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
	<h5 style={{color:"white", textShadow:"1px 1px 3px #000000"}}> Tokens Minted so far= {balance.result}/1000</h5>
  </form>
  <div className="row items mt-3">
  <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
  {nftdata.map(result => {
	  return (
			<div className="card">
            		<div className="image-over">
					<img className="card-img-top" src={nftpng + result.tokenID +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">Net2Dev Collection NFT #{result.tokenID}</h5>
							<h5 className="mb-0 mt-2">Owner Wallet:<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{result.to}</p></h5>
                    	<div className="card-bottom d-flex justify-content-between">
							<Button className="btn btn-bordered-white btn-smaller mt-3">
								<i className="mr-2" />Buy Now
							</Button>
							</div>
					</div>
                </div>
            </div>
        );
    })}
	</div>
</div>
  </div>
	</div>
 	</div>
  			);
	};
}

export default App;