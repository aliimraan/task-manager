import React,{useState,useEffect} from 'react'
import axiosInstance from '../helpers'
import {Link,useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

function Tasks() {
    const [alltasks,setAllTasks]= useState([])
    const [searchItems,setSearchItems]= useState([])
    const [char,setChar]= useState('')
    const [currentTask,setCurrentTask]= useState('')
    const history=useHistory()

    useEffect(() => {
        getAllTasks()
    }, [])

    const getAllTasks=()=>{
        axiosInstance.get('/task/showAll').then(data=>{
            setAllTasks([data.data.data])
        }).catch(err=>{
            console.log(err)
        })
    }
    const showAllTasks=(el)=>{
        if(el[0]===undefined){
            return<h4>loading...</h4>
        }
        return el[0].map((item,index)=>{
            const {_id,name,date,time}=item
            return(
                <div className="card_one" key={index}>
                <div className="title">{item.name}</div>
                <div className="date">Date : {item.date}</div>
                <div className="date">Time : {item.time}</div>
                <div className="btns">
                    <Link to={`/edit/${_id}`} className="anchor" style={{textTransform:'capitalize',background:'#4259FA', padding:'5px 20px',cursor:'pointer'}}>edit</Link>
                    <button onClick={()=>deleteHandler(_id)} style={{textTransform:'capitalize',background:'#4259FA', padding:'8px 20px',outline:'none',border:'none',color:'white',cursor:'pointer'}}>delete</button>
                </div>
            </div>
            )
        })
    }

    const deleteHandler=(id)=>{
        axiosInstance.delete(`/task/delete-one/${id}`).then(data=>{
            if(data.status===200){
               history.go(0)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const fetchUser=(query)=>{
        const data={query}
        setChar(query)
      axiosInstance.post('/task/search-task',data).then(data=>{
            if(data.data.data.length<1){
                return
            }else{
                setSearchItems([data.data.data])
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const showSearched=(el)=>{
       if(el[0]===undefined){
           return
       }else{
        if(el[0]===''){
            return
        }else{
            if(el[0]===[]){
                return 
            }
            return el[0].map((item,index)=>{
                return (
                    <div className="search_list" style={char===''?{display:'none',padding:0}:{display:'block'}}>
                        <Link to={`/search-result/one/${item._id}`} className="anchor">
                             <li key={index} style={{listStyle:'none'}}>{item.name}</li>
                        </Link>
                    </div>)
            })
        }
           
       }
    }


    return (
        <div>
        <Navbar/>
        <div className="tasks_info">
            <div className="search_feild">
                <input type="text" placeholder="search task" onChange={(e)=>fetchUser(e.target.value)}/> 
                {showSearched(searchItems)}
             </div>
        <div className="main_area">
            <ToastContainer autoClose={false} />
           
            <div className="all_cards">
                {showAllTasks(alltasks)}
            </div>  
        </div>
            
        </div>
        </div>
    )
}

export default Tasks
