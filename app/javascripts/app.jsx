// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
import React from 'react';
import ReactDOM from 'react-dom';
import * as mCoin from './mCoin' 

function Balances(props) {
  return (
    <div>
      <h3>You have <span className="black">${props.balOrg}</span> META</h3>
      <h3>Dest has <span className="black">${props.balDest}></span> META</h3>
    </div>
  );
}

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      receiver: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    switch(ev.target.name) {
      case 'amt': {
        this.setState({amount: ev.target.value});
        break;
      }
      case 'rcvr': {
        this.setState({receiver: ev.target.value});
        break;
      }
    }
  }

  onSendClicked() {
    this.props.callbackParent(this.state.amount, this.state.receiver); // we notify our parent
  }

  render() {
    return (
      <div>
        <h3>Send MetaCoin</h3>
        <br/>
        <label htmlFor="amount">Amount:</label><input type="text" name='amt' placeholder="e.g., 95"
          value={this.state.amount} onChange={this.handleChange} />
        <br/><br/>
        <label htmlFor="receiver">To Address:</label><input type="text" name='rcvr' placeholder="e.g., 0x93e66d9baea28c17d9fc393b53e3fbdd76899dae" 
          value={this.state.receiver} onChange={this.handleChange} />
        <br/><br/>
        <button onClick={() => this.onSendClicked()}>
          Send MetaCoin
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      balance0: 0,
      balance1: 0
    }
  }

  componentDidMount() {
    mCoin.getAccounts().then(result => {
      this.setState({accounts: result});
      return mCoin.getBalance(result[0]);
    }).then(result => {
      this.setState({balance0: result.valueOf()});
      return mCoin.getBalance(this.state.accounts[1]);
    }).then(result => {
      this.setState({balance1: result.valueOf()});
    }).catch(function(err) {
      console.log('Error getting balances ', err);
    });
  }

  handleSend(amount, dest) {
    let {accounts} = this.state;
    mCoin.sendCoin(amount, accounts[0], dest).then(function() {
      return mCoin.getBalance(accounts[0]);
    }).then(result => {
      this.setState({balance0: result.valueOf()});
      return mCoin.getBalance(this.state.accounts[1]);
    }).then(result => {
      this.setState({balance1: result.valueOf()});
    }).catch(function(err) {
      console.log('Error sending Meta ', err);
    });
  }

  render() {
    return (
      <div>
        <Balances account1={this.state.accounts[0]} balOrg={this.state.balance0} balDest={this.state.balance1} />
        <Transfer callbackParent={(amount, receiver) => this.handleSend(amount, receiver) }/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
