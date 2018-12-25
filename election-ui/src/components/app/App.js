import React, { Component } from 'react';
import logo from '../../res/logo.svg';
import './App.css';
import {electionContract, web3} from '../../contracts/election'

class App extends Component
{
  constructor()
  {
    super();

    this.state = {
      loading: true,
      candidates: [],
      candidatesInfo: new Map()
    };

    electionContract.events.CandidateRegistered({}, (error, event) => {
      console.log(event);
    }).on("data", (event) =>
    {
      this.loadCandidates();
      console.log(event);
    });

    electionContract.events.VoteGiven({}, (error, event) => {
      console.log(event);
    }).on("data", (event) =>
    {
      this.loadCandidates();
      console.log(event);
    });

    this.loadCandidates();
  }

  loadCandidates()
  {
    electionContract.methods.getCandidates().call().
    then((candidates) =>
    {
      this.setState({
        candidates: candidates
      });

      const candiesInfo = new Map();

      let candyInfos = candidates.map((id) =>
      {
        return electionContract.methods.getCandidateInfo(id).call().
        then((info) => {
          console.log(info);

          candiesInfo.set(id, {
            id: id,
            name: info[0],
            description: info[1],
            votes: info[2]
          });
        })
      });

      Promise.all(candyInfos).then(() =>
      {
        this.setState({
          candidatesInfo: candiesInfo
        });

        console.log(this.state.candidatesInfo);

        this.loadingFinished();
      });
    });
  }

  loadingFinished()
  {
    this.setState({
      loading: false
    });
  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Vote for best name ever!</h2>
        </header>

        <div className="columns is-centered">
          <div className="column is-two-thirds">
          {this.state.loading &&
            <Loading value={null}/>
          }

          {this.state.loading === false &&
            <Candidates candidates={Array.from(this.state.candidatesInfo.values())}/>
          }
          </div>
        </div>

      </div>
    );
  }
}

class Candidates extends Component
{
  vote(event)
  {
    event.preventDefault();

    let id = event.target.attributes.candyid.value;

    console.log(event.target);
    console.log(id);

    electionContract.methods.vote(id).send({
      from: web3.currentProvider.selectedAddress
    }).
    then((result) => {
      console.log(result);
    }).catch((e) => {
      console.log(e);
    });
  }

  render()
  {
    let candidatesTable = this.props.candidates.map((candy) =>
      <tr key={candy.id}>
        <td>
          <h3>{candy.name}</h3>
          <div className="help">{candy.description}</div>
        </td>
        <td>{candy.votes}</td>
        <td><button className="button" candyid={candy.id} onClick={this.vote}>Vote</button></td>
      </tr>
    );

    return (
      <div className="App-body content">
        {this.props.candidates.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th>Candidate Info</th>
              <th>Votes</th>
              <th className="is-"></th>
            </tr>
          </thead>
          <tbody>
          {candidatesTable}
          </tbody>
        </table>
        }

        {this.props.candidates.length == 0 &&
        <p>no candidates registered yet</p>
        }

        <RegisterCandidateForm />

      </div>
    );
  }
}

class RegisterCandidateForm extends Component
{
  constructor(props)
  {
    super(props);

  }

  registerCandidate(event)
  {
    event.preventDefault();

    let name = event.target.elements.name.value;
    let description = event.target.elements.description.value;

    electionContract.methods.register(name, description).send({
      from: web3.currentProvider.selectedAddress
    }).
    then((result) => {
      console.log(result);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <form onSubmit={this.registerCandidate}>
        <div className="box">
          <h4>Register yourself</h4>
          <div className="field is-horizontal is-grouped is-grouped-centered">
            <div className="control">
              <input className="input" placeholder="Candidate" type="text" name="name"/>
            </div>
            <div className="control">
              <input className="input" placeholder="Description" type="text" name="description"/>
            </div>
            <div className="control">
              <input className="button is-link" type="submit" value="Register"/>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

class Loading extends Component
{
  render()
  {
    return (
      <div className="App-loading box">
        <img className="App-logo" src={logo}/>
      </div>
    );
  }
}

export default App;
