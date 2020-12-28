const tasksModel=require('../model/tasks')

exports.createTask=(req,res)=>{
    const {name,date,time}=req.body
    const attachments=req.file.filename
    const newTasksModel= new tasksModel({
        name,date,time,attachments
    })
    newTasksModel.save().then(data=>{
       return res.status(200).json({data,msg:"Task added"})
   }).catch(err=>{
       return res.status(400).json({err,msg:"Task not added"})
   })
}

exports.showTask=(req,res)=>{
    tasksModel.find().then(data=>{
        return res.status(200).json({data,msg:'data fetched successfully'})
    }).catch(err=>{
        return res.status(400).json({err,msg:'something went wrong'})
    })
}

exports.deleteTask=(req,res)=>{
    const id=req.params.id
    tasksModel.findByIdAndDelete(id).then(data=>{
        return res.status(200).json({data,msg:'deleted'})
    }).catch(err=>{
        return res.status(400).json({err,msg:'something went wrong'})
    })
}

exports.showOneTask=(req,res)=>{
    const id=req.params.id
    tasksModel.findOne({_id:id}).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.updateOne=(req,res)=>{
    const id=req.params.id
    tasksModel.findByIdAndUpdate(id,req.body).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.searchTask=(req,res)=>{
    let userpattern=new RegExp("^"+req.body.query)
    tasksModel.find({name:{$regex:userpattern,$options:'$i'}}).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.completedTasks=(req,res)=>{
    const id=req.params.id
    tasksModel.findByIdAndDelete(id).then(data=>{
        return res.status(200).json({data})
    }).catch(err=>{
        return res.status(400).json({err})
    })
}

exports.currentTasks=(req,res)=>{
    
    const currentDate=new Date().getDate()
    const currentmonth=new Date().getMonth()+1
    const currentyear=new Date().getFullYear()
    const currenthour=new Date().getHours()
    const currentmin=new Date().getMinutes()
    const Dates=`${currentyear}-${currentmonth}-${currentDate}`
    const times=`${currenthour}:${currentmin}`

    tasksModel.find({date:Dates,time:times}).then(data=>{
        if(data.length>0){
            return res.status(200).json({data})
        }
    
    }).catch(err=>{
        return res.status(400).json({err}) 
    })
 
}
