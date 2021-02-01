import React from 'react'
import {ACTIONS}from './../App'

export default function Rollouts( rollout:any,dispatch:React.Dispatch<any>) {
    const name = rollout.rollout.name;
    //const id = rollout.rollout.id;
    const complete = rollout.rollout.complete;
    return (
        <div>
            <span style = {{color : complete ? 'gray':'white'}}>
                {name}
            </span>
            <button onClick={
                () => dispatch({
                    type:ACTIONS.TOGGLE_ROLLOUT, payload:{id : rollout.id}
                })
            }>Toggle</button>
            <button onClick={
                () => dispatch({
                    type:ACTIONS.DELETE_TOGGLE, payload:{id : rollout.id}
                })
            }>Delete</button>
        </div>
    )
}
