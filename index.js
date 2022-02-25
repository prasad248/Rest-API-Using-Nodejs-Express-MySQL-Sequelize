module.dbconfig=require('../config/dbconfig.js');


const{Sequelize,DataTypes}=require('sequelize');
const dbconfig = require('../config/dbconfig.js');

const sequelize=new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host:dbconfig.HOST,
        dialect:dbconfig.dialect,
        operatorsAliases:false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('yes the re-sync done!')
})



module.exports=db