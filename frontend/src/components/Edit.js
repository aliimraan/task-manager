import React,{ useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../helpers';
import Navbar from './Navbar';

function Edit(props) {
    const [name,setName]=useState('');
    const [date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [attachments,setAttachment]=useState('');
    const [record,setRecord]=useState('');
    const history=useHistory()

    useEffect(() => {
        const id=props.match.params.id
        axiosInstance.get(`/task/showAll/one/${id}`).then(data=>{
            const {name,time,date}=data.data.data
            console.log(data.data.data)
            setName(name)
            setDate(date)
            setTime(time)
            setAttachment(attachments)
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    const submitHandler=(e)=>{
        e.preventDefault();
        const id=props.match.params.id
        const data={
            name,date,time
        }
        console.log(data)

        axiosInstance.put(`/task/update-one/${id}`,data).then(data=>{
            if(data.status===200){
                history.push('/alltasks')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
        <Navbar/>
        <div className="main">
        <div className="card">
            <div className="heading">Edit you tasks</div>
            <div className="info">
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="enter title" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="date" value={date.substr(0,10)} onChange={(e)=>setDate(e.target.value)}/>
                    <input type="time" value={time} onChange={(e)=>setTime(e.target.value)}/>
                    <button type="submit">Add task</button>
                </form>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Edit
