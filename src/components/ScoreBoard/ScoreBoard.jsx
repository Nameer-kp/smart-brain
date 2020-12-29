import React from 'react';
import  './ScoreBoard.css';
import {useState,useEffect,useContext} from 'react'
import { SignInContext } from '../../App';

const ScoreBoard =()=>{
    const {entries,username} =useContext(SignInContext)
    //using hooks
    const [scoreBoard,setScoreBoard] =useState([]);
    
   
    const fetchData=()=>{
    

    fetch('http://localhost:3001/',{
        credentials:'include',
        method:'get'
    }).then(async response=>{ //need the pass the jwt token

        let users =  await response.json()
        setScoreBoard(users)
        
    }).catch(err =>{
        console.log("error getting scoreboard");
    })
}
    useEffect(()=>{
        
        fetchData()

    },[entries])
    const renderTableData=()=> {
        let isTop10;
        return scoreBoard.map((user, index) => {
           const { name,entries } = user //destructuring
           if(name===username){          //this code check whether the current user is in top10 or not
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
                    {renderTableData()}
                </tbody>

            </table>
        </div>
        </div>
        )
    }


export default ScoreBoard;

