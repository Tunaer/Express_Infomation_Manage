/* 
	Student.js
		数据操作文件模块
		职责:操作文件中的数据，只处理数据，不关心业务
		
	这里是node学习的精华所在
		封装异步
	
 */
var fs = require('fs')

var dbPath = './db.json'
/* 
	获取所有学生列表
	callback 中的参数
			第一个参数是err
				成功是null
				错误是 错误对象
			第二个参数是 结果
				成功是 数组
				错误是 undefined
	return []
 */
exports.find = function(callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
}
// find(function(err,data){
// })

// 编辑页面查找需要更新的信息
// 根据id获取学生信息
// @param {Number}		id				学生id
// @param {Function}	callback	回调函数
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})
}



/* 
	添加保存学生
 */
exports.save = function(student,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		// 处理id唯一的问题
		student.id = students[students.length - 1].id + 1
 		// 把用户传递的对象保存到数组中
		students.push(student)
		// 把对象数据转为字符串
		var fileData = JSON.stringify({
			students:students
		})
		// 把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			// 成功就没有错误，所以错误对象就是null
			callback(null)
		})
	})
}
// save({
// 	name:'xx',
// 	age:18
// },function(){
// 	if(err){
// 		console.log('保存失败了')
// 	}else{
// 		console.log('保存成功了')
// 	}
// })

/* 
	更新学生
 */
exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		// 统一 id 格式为 数字
		student.id = parseInt(student.id)  
		// 修改谁就需要把谁找出来 ES6 中的一个方法 find ，需要接收一个函数作为参数
		// 当id匹配的时候就会终止遍历，并且返回遍历项
		var stu = students.find(function(item){
			return item.id === student.id
		})
		// 遍历拷贝对象
		for(var key in student){
			stu[key] = student[key]
		}
		
		// 把对象数据转为字符串
		var fileData = JSON.stringify({
			students:students
		})
		// 把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			// 成功就没有错误，所以错误对象就是null
			callback(null)
		})
		
	})
}

// updateById({
// 	id:1,
// 	name:'xx',
// 	age:15,
// },function(err){
	
// })


/* 
	删除学生
 */
exports.deleteById = function(id,callback){
	fs.readFile(dbPath,function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		
		// findIndex 方法专门用来根据条件查找元素的下标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})
		// 根据下标从数组中删除对应的学生对象
		students.splice(deleteId,1)
		
		// 把对象数据转为字符串
		var fileData = JSON.stringify({
			students:students
		})
		// 把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			// 成功就没有错误，所以错误对象就是null
			callback(null)
		})
	})
