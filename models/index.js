const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglist })

//Session.hasMany(User)

/*
User.hasMany(Readinglist)
Readinglist.belongsTo(User)
*/
Blog.hasMany(Readinglist)
Readinglist.belongsTo(Blog)

//Blog.sync({ alter: true })
//User.sync({ alter: true })

module.exports = {
  Blog, User, Readinglist, Session
}