import React, { Component } from 'react'
import BuyForm from './BuyForm';
import SellForm from './SellForm';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm : 'buy'
    }
  }

  render() {
    let content

    if(this.state.currentForm === 'buy')
    {
        content = <BuyForm transactionBalance={this.props.transactionBalance} tokenBalance={this.props.tokenBalance}
        buyTokens= {this.props.buyTokens}/>
    }
    // else
    // {
    //     content = <SellForm transactionBalance={this.props.transactionBalance} tokenBalance={this.props.tokenBalance}
    //     sellTokens= {this.props.sellTokens}/>
    // }

    return (
      <div id="content" className="mt-3">
        <div className="d-flex justify-content-between mb3">
            <button className="btn btn-light" onClick={(event) => {
                this.setState({currentForm : 'buy'})
            }}>
                Buy
            </button>
            {/* <span className="text-muted">&lt; &nbsp; &gt;</span>
            <button className="btn btn-light" onClick={(event) => {
                this.setState({currentForm : 'sell'})
            }}>
                Sell
            </button> */}
            <button type="button" className="btn btn-primary" onClick={(e) => {window.location.href='Verification';}}>Validate Farmer Data</button>
        </div>
        <div className="card mb-4" >
          <div className="card-body">
             {content}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
