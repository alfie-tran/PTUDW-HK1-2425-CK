const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressHbs = require('express-handlebars');
// const { createPagination } = require('express-handlebars-paginate');

app.use(express.static(__dirname + '/html'));

app.engine(
	'hbs',
	expressHbs.engine({
		defaultLayout: 'layout',
		layoutDir: __dirname + '/views/layouts',
		extname: 'hbs',
		runtimeOptions: {
			allowProtoPropertiesByDefault: true,
		},
		helpers: {
			formatDate: date => {
				return date.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				});
			},
		},
	}),
);
app.set('view engine', 'hbs');

//xem truoc cac cau de minh dinh hinh phan route cho hop ly
//cau3: / => GET
//cau4: //profile => GET
//
//Cau hinh cho POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/threadRouter'));
app.use('/profile', (req, res) => {
	res.render('profile');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
