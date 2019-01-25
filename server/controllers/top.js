const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const top = await mysql('books')
        .select('id', 'title', 'image', 'count')
        .orderBy('count', 'desc')
        .limit(9)
    console.log(top)
    ctx.state.data = {
        list: top
    }
}
