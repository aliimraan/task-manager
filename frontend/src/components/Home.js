import React, { Fragment,useState,useEffect} from 'react'
import axiosInstance from '../helpers';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom'


function Home() {
    const [name,setName]=useState('');
    const [date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [attachments,setAttachment]=useState('');
    const [currentTask, setCurrentTask]=useState([]);
    const history=useHistory()

    useEffect(() => {
        axiosInstance.get('/task/current-task').then(data=>{
            setCurrentTask([data.data.data])
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    const completeHandler=(id)=>{
        axiosInstance.delete(`/task/completed/${id}`).then(data=>{
            if(data.status===200){
                toast.success('Marked As Completed')
              setTimeout(() => {
                history.go(0)
              }, 5000);
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const showNotification=(el)=>{
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
                     console.log(item)
                     return (
                        <div className="notice_box">
                        <h3>Hey It's reminder for you </h3>
                        <h2>{item.name}</h2>
                        <button onClick={()=>completeHandler(item._id)}>seen</button>
                         </div>
                     )
                 })
             }
                
         }
    }


    const submitHandler=(e)=>{
        e.preventDefault();
        const data=new FormData()
        data.append('name',name)
        data.append('date',date)
        data.append('time',time)
        data.append('attachments',attachments)
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axiosInstance.post('/task/create',data,config).then(data=>{
            toast.success('Task created')
            setTimeout(() => {
                history.go(0)
            }, 5000);
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Fragment>
        <Navbar/>
        <div className="notification">
           {showNotification(currentTask)}
        </div>
        <div className="main">
            <div className="card">
                <div className="heading">manage you tasks</div>
                <div className="info">
                <ToastContainer/>
                    <form onSubmit={submitHandler}>
                        <input type="text" placeholder="enter title" onChange={(e)=>setName(e.target.value)}/>
                        <input type="date" onChange={(e)=>setDate(e.target.value)}/>
                        <input type="time" onChange={(e)=>setTime(e.target.value)}/>
                        <input type="file" onChange={(e)=>setAttachment(e.target.files[0])}/>
                        <button type="submit">Add task</button>
                    </form>
                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default Home
