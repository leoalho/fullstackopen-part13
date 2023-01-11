const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist })
Blog.belongsToMany(User, { through: Readinglist })

//Blog.sync({ alter: true })
//User.sync({ alter: true })

module.exports = {
  Blog, User, Readinglist
}