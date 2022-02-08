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
      contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount)})
    }
}