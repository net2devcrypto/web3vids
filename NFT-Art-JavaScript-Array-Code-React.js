const data = [
    {
		id: "1",
		img: "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/1.png",
		title: "Net2Dev Web3 NFT Number #1",
		buttontext: "Buy Now"
	},
	{
		id: "2",
		img: "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/2.png",
		title: "Net2Dev Web3 NFT Number #2",
		buttontext: "Buy Now"
	},
	{
		id: "3",
		img: "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/3.png",
		title: "Net2Dev Web3 NFT Number #3",
		buttontext: "Buy Now"
	},
	{
		id: "4",
		img: "https://ipfs.io/ipfs/QmetESUb7wTPr8mBHWFsiSKMw6HTLWUGoL8DrkcaY9TTyh/4.png",
		title: "Net2Dev Web3 NFT Number #4",
		buttontext: "Buy Now"
	},
]

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
			data: [],
		};
	}

	async componentDidMount() {
		const etherscan = await axios.get(endpoint + `?module=stats&action=tokensupply&contractaddress=${ADDRESS}&apikey=${apikey}`);

		let { result } = etherscan.data;
		this.setState({
		 balance: result,
		 data: data
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
	<h5 style={{color:"white"}}> Tokens Minted so far= {balance}/1000</h5>
  </form>
  <div className="row items mt-3">
  {this.state.data.map((item, idx) => {
	  return (
		<div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
			<div className="card">
            		<div className="image-over">
					<img className="card-img-top" src={item.img} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">{item.title}</h5>
                    	<div className="card-bottom d-flex justify-content-between">
							<Button className="btn btn-bordered-white btn-smaller mt-3">
								<i className="mr-2" />{item.buttontext}
							</Button>
							</div>
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
  			);
	};
}

export default App;