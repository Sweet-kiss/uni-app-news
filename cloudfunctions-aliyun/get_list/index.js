'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		classify,
		page = 1,
		pageSize = 5
	} = event
	
	let classifyName = {}
	
	if(classify !== "全部") {
		classifyName = {
			classify: classify
		}
	}
	
	
     let articleList = await db.collection('article')
	 .aggregate()
	 .match(classifyName)
	 .project({
		 content: 0
	 })
	 .skip(pageSize*(page-1))
	 .limit(pageSize)
	 .end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: "获取文章列表成功",
		data: articleList.data
	}
};
