import React,{useEffect,useState} from 'react'
import axiosInstance from '../helpers'
import Navbar from './Navbar'
import {useHistory,Link} from 'react-router-dom'

function Single(props) {
    const [record,setRecord]=useState([])
    const history=useHistory()

    useEffect(() => {
        const id=props.match.params.id
        console.log(id)
        axiosInstance.get(`/task/showAll/one/${id}`).then(data=>{
            setRecord([data.data.data])
        })
    }, [])

    const deleteHandler=(id)=>{
        axiosInstance.delete(`/task/delete-one/${id}`).then(data=>{
            if(data.status===200){
                history.push('/alltasks')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const showAllRecord=(el)=>{
        if(el===''){
            return <h3>loading....</h3>
        }else{
            return el.map((item,index)=>{
                console.log(item)
                return(
                    <div className="single-card" key={index}>
                        <div className="heading">{item.name}</div>
                        <div className="info">Date : {item.date} </div>
                        <div className="info">Time : {item.time}</div>
                        <div className="btns">
                            <Link to={`/edit/${item._id}`} className="anchor" style={{textTransform:'capitalize',background:'#4259FA', padding:'5px 20px',cursor:'pointer'}}>edit</Link>
                            <button onClick={()=>deleteHandler(item._id)} style={{textTransform:'capitalize',background:'#4259FA', padding:'8px 20px',outline:'none',border:'none',color:'white',cursor:'pointer'}}>delete</button>
                        </div>
                    </div>
                )
            })
        }
       
    }

    return (
        <div>
        <Navbar/>
            <div className="single">
                {showAllRecord(record)}
            </div>
        </div>
    )
}

export default Single
