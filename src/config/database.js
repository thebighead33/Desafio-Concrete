const databaseConect = require('knex')({
	client: 'mysql',
	connection: {
		host : '138.128.186.242',
		user : 'visionde_thiago',
		password : '@SigmerWeb',
		database : 'visionde_sigmer'
	}
});

module.exports = databaseConect;