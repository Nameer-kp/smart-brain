import React from 'react';
import  './ScoreBoard.css';

class ScoreBoard extends React.Component{
    
    constructor(props){ //through here we get the current loged in user data
        super(props);
        this.state={
            scoreboard:[],
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
        let isTop10;
     
        return this.state.scoreboard.map((user, index) => {
           const { name,entries } = user //destructuring
           if(name===this.props.name){          //this code check whether the current user is in top10 or not
               isTop10=true;
           }
           else isTop10=false;
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

            <div>
                <h1>Score Board</h1>
            
            <div className="tcontainer">
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
        </div>
        )
    }
}

export default ScoreBoard;

