const models = require('./models');
models.sequelize.sync().then(result => {
	console.log(result);
	console.log('Tables created !');
});
