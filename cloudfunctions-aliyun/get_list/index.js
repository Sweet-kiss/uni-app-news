'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
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
	
	 const userinfo = await db.collection('user').doc(user_id).get()
	 const article_likes_ids = userinfo.data[0].article_likes_ids
	
     let articleList = await db.collection('article')
	 .aggregate()
	 .addFields({
		 is_like: $.in(['$_id', article_likes_ids])
	 })
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
