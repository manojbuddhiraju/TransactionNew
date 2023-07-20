import React, { Component } from 'react';
import Web3 from 'web3';
import Transactions from '../abis/Transactions.json';
import Token from '../abis/Token.json';
import Navbar from './Navbar';
import Main from './Main';

import './App.css';

class App extends Component {

  async componentWillMount()
  {
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  async loadBlockChainData()
  {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)

    this.setState({ account : accounts[0]})

    const transactionBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ transactionBalance: transactionBalance.toString()})

    //Token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];

    if(tokenData)
    {
      const token = new web3.eth.Contract(Token.abi,tokenData.address);
      this.setState({token : token});
      let tokenBalance = await token.methods.balanceOf(this.state.account).call();
      this.setState({ tokenBalance : tokenBalance.toString()})
    }
    else
    {
      window.alert('Token contract not deployed to detected network');
    }

    //Transaction
    const transactionData = Transactions.networks[networkId];

    if(transactionData)
    {
      const transaction = new web3.eth.Contract(Transactions.abi,transactionData.address);
      this.setState({transaction : transaction});
    }
    else
    {
      window.alert('Transactions contract not deployed to detected network');
    }
    
    this.setState({ loading : false})
  }

  async loadWeb3 () {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
 }

 buyTokens = (etherAmount) => {
  this.setState({ loading : true})
  this.state.transaction.methods.buyTokens().send({value: etherAmount, from: this.state.account}).on('transactionHash',(hash) => {
                                this.setState({loading : false})
                                })
 }

 sellTokens = (tokenAmount) => {
  this.setState({ loading : true})
  this.state.token.methods.approve(this.state.transaction.address, tokenAmount).send({from: this.state.account}).on('transactionHash',(hash) => {
    this.state.transaction.methods.sellTokens(tokenAmount).send({from: this.state.account}).on('transactionHash',(hash) => {
      this.setState({loading : false})
      })                             
                                })
  
 }
 constructor(props){
    super(props);
    this.state = { 
      account: '',
      token: {},
      transaction : {},
      transactionBalance: '0',
      tokenBalance: '0',
      loading : true
    };
    //this.state = { items : [], text : ''};
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleChange.bind(this);
 }

  render() {

    let content

    if(this.state.loading)
    {
      content = <p id="loader" className="text-center">Loading ...!</p>
    }
    else
    {
      content = <Main transactionBalance={this.state.transactionBalance} tokenBalance={this.state.tokenBalance} 
                      buyTokens= {this.buyTokens} sellTokens={this.sellTokens}/>
    }
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth:'600px'}}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
