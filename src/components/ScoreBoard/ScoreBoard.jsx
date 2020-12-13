import React from 'react';
import  './ScoreBoard.css';

class ScoreBoard extends React.Component{
    
    constructor({name}){ //through here we get the current loged in user data
        super(name);
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
    checkTop10 =(user)=>{
        if (user.name===name){
            return true
        }
    }
    renderTableData() {
        if(this.state.scoreboard.find((user)=>{ ///this code checks for the current user in the top 10 list ..if yep it flags the istop10 to true
            if (user.name===name){
                return true
            }
        }
            ))
            {
            isTop10=true
        }

        return this.state.scoreboard.map((user, index) => {
           const { name,entries } = user //destructuring
           return (
              <tr key={index+1} className= {isTop10?"active":null}>
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
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Entries</th>  
                    </tr>
                    
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>

            </table>
        </div>
        )
    }
}

export default ScoreBoard;

