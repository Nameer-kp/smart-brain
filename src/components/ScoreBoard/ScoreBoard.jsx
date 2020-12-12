import React from 'react';
import  './ScoreBoard.css';

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
    renderTableData() {
        return this.state.scoreboard.map((user, index) => {
           const { name,entries } = user //destructuring
           return (
              <tr key={index+1}>
                 <td>{index+1}</td>
                 <td>{name}</td>
                 <td>{entries}</td>
              </tr>
           )
        })
     }

    render(){
        return (
        <div >
            <h1>Score Board</h1>
            <table id='table'>
                <tbody>
                    {this.renderTableData()}
                </tbody>

            </table>
        </div>
        )
    }
}

export default ScoreBoard;

