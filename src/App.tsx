import React, {useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { act } from 'react-dom/test-utils';
import Rollouts from './component/Rollouts'

export const ACTIONS = {
  ADD_ROLLOUT : 'add-rollout',
  TOGGLE_ROLLOUT : 'toggle-rollout',
  DELETE_TOGGLE : 'delete-toggle'
}
function reducer (rollouts:any,action:any) {
    switch(action.type) {
      case ACTIONS.ADD_ROLLOUT : return [...rollouts,newRollout(action.payload.name)]
      case ACTIONS.TOGGLE_ROLLOUT : return rollouts.map(
        (rollout:any) => {
          if(rollout.id === action.payload.id){
            return {... rollout, on:!rollout.on}
          }
          return rollout;
        }
      )
      case ACTIONS.DELETE_TOGGLE : return rollouts.filter(
        (rollout:any) => rollout.id !== action.payload.id
      )
      default : return rollouts;
    }
  }
function newRollout(name1:String){
  return {
    id : Date.now(),
    name:name1,
    on:false
  }
}
function App() {
  const [rollouts,dispatch] = useReducer(reducer,[]);
  const [name, setName] = useState('');
  

  function handleSubmit (e:any) {
    e.preventDefault();
    dispatch({type: ACTIONS.ADD_ROLLOUT, payload: {name : name}});
    setName('');

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rollout Toggles</h1>
        <div>
          Name you are typing : {name}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </form>
        {rollouts !== undefined?(rollouts.map (
          (rollout:any) => {
            return <div key={rollout.id} >
              <span style = {{color : rollout.on ? 'gray':'white'}}>{rollout.name}</span>
              <button onClick={
                () => dispatch({
                    type:ACTIONS.TOGGLE_ROLLOUT, payload:{id : rollout.id}
                })
            }>{rollout.on?"ON":"OFF"}</button>
            <button onClick={
                () => dispatch({
                    type:ACTIONS.DELETE_TOGGLE, payload:{id : rollout.id}
                })
            }>Delete</button>
            </div>
          }
        )):''}
      </header>
    </div>
  );
}

export default App;
