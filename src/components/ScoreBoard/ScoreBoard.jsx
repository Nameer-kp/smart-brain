import React from 'react';

class ScoreBoard extends React.Component{
    
    constructor(){
        super();
        this.state={
            scoreboard:[]
        }
    }

    componentDidMount(){
        console.log("from scoreboard",this.state.scoreboard);
        fetch('http://localhost:3001/').then(async response=>{
            let users =  await response.json()
            this.setState({scoreboard:users})
            console.log("from scoreboard",this.state.scoreboard);
            
        }).catch(err =>{
            console.log("error getting scoreboard");
        })
        
    }

    render(){
        return (
        <div>

        </div>
        )
    }
}

export default ScoreBoard;

