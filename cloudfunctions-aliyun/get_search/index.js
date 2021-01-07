'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		value
	} = event
	
	 const userinfo = await db.collection('user').doc(user_id).get()
	 const article_likes_ids = userinfo.data[0].article_likes_ids
	
     let articleList = await db.collection('article')
	 .aggregate()
	 .addFields({
		 is_like: $.in(['$_id', article_likes_ids])
	 })
	 .match({
		 title: new RegExp(value)
	 })
	 .end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: "获取文章列表成功",
		data: articleList.data
	}
};
