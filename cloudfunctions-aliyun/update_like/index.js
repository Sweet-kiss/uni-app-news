'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
    const {
		user_id,
		article_id
	} = event
	
	const userinfo = await db.collection('user').doc(user_id).get()
	
	let dbCmdlikes = null
	if(userinfo.data[0].article_likes_ids.includes(article_id)) {
		dbCmdlikes = dbCmd.pull(article_id)
	}else {
		dbCmdlikes = dbCmd.addToSet(article_id)
	}
	
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdlikes
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg:"收藏文章成功",
		data: userinfo.data
	}
};
