/* 
	router.js	路由模块
		职责：
				处理路由
				根据不同的请求方法和请求路径做不同的服务
 */

const fs = require('fs')
var Student = require('./student')

// express 提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')
// 1.创建一个路由
var router = express.Router()
// 2.把路由都挂载到router路由容器上

router.get('/students',function(req,res){
	// 第二个参数是可选的 传入utf8 就是告诉文件直接utf8的格式传入
	// 也可以通过data.toSrtin()
	// fs.readFile('./db.json','utf8',function(err,data){
	// 	if(err){
	// 		return res.status(500).send('Server error ')
	// 	}
	// 	res.render('index.html',{
	// 		fruits:[
	// 			'苹果',
	// 			'香蕉',
	// 			'橘子'
	// 		],
	// 		students:JSON.parse(data).students
	// 	})
	// })
	
	Student.find(function(err,students){
		if(err){
				return res.status(500).send('Server error ')
			}
			res.render('index.html',{
				fruits:[
					'苹果',
					'香蕉',
					'橘子'
				],
				students:students
			})
	})
})

router.get('/students/new',function(req,res){
	res.render('new.html')
})
router.post('/students/new',function(req,res){
	/* 
		1.获取表单数据
		2.处理
			将数据保存到db.json文件中用以持久化
		3.发送响应
			先读取出来，转成对象
			然后往对象中 push 数据
			然后把对象转为字符串
			然后把字符串再次写入文件
	 */
	Student.save(req.body,function(err){
		if(err){
			return res.status(500).send('Server error ')
		}
		res.redirect('/students')
	})
})
// 渲染编辑页面
router.get('/students/edit',function(req,res){
	// 1.在客户端的列表页中处理连接问题(需要有id参数)
	// 2.获取要编辑的学生id
	// 3.渲染编辑页面
	// 		根据id把学生信息查出来
	// 		使用模板引擎渲染页面
	// console.log(req.query.id)
	Student.findById(parseInt(req.query.id),function(err,student){
		if(err){
			return res.status(500).send('server error')
		}
		res.render('edit.html',{
			student:student
		})
	})
})
// 处理编辑学生
router.post('/students/edit',function(req,res){
	// 1.获取表单数据
	// 			
	// 2.更新
	// 			Student.update()
	// 3.发送响应
	Student.updateById(req.body,function(err){
		if(err){
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
})
/* 
 *	处理删除学生
 */
router.get('/students/delete',function(req,res){
	// 1.获取要删除的id
	// 2.根据id执行删除操作
	// 3.根据操作结果发送响应数据
	Student.deleteById(req.query.id,function(err){
		if(err){
			return res.status(500).send('server error') 
		}
		res.redirect('/students')
	})
	
})
// module.exports = function(app){
// }

// 3.把router导出
module.exports = router
