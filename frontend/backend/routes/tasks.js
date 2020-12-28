const express=require('express')
const router=express.Router()
const multer=require('multer')
const path=require('path')
const {createTask} =require('../controller/tasks')
const  {showTask} =require('../controller/tasks')
const  {deleteTask} =require('../controller/tasks')
const  {showOneTask} =require('../controller/tasks')
const  {updateOne} =require('../controller/tasks')
const  {searchTask} =require('../controller/tasks')
const  {currentTasks} =require('../controller/tasks')
const  {completedTasks} =require('../controller/tasks')

const storage=multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    },
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
    }
})

const upload=multer({storage})

router.post('/create',upload.single('attachments'),createTask)
router.get('/showAll',showTask)
router.get('/showAll/one/:id',showOneTask)
router.delete('/delete-one/:id',deleteTask)
router.put('/update-one/:id',updateOne)
router.post('/search-task',searchTask)
router.get('/current-task',currentTasks)
router.delete('/completed/:id',completedTasks)

module.exports=router;