const controller = {};
const models = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

controller.show = async (req, res) => {
	let threads = await models.Thread.findAll({
		include: [{ model: models.Like }, { model: models.Comment }, { model: models.User }],
		attributes: ['content', 'mediaUrl', 'createdAt', 'userId', 'id'],
		order: [['createdAt', 'DESC']],
	});

	res.locals.threads = threads;
	res.render('index');
};

controller.showDetail = async (req, res) => {
	let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
	let thread = await models.Thread.findOne({
		include: [
			{ model: models.Like },
			{ model: models.Comment, include: [{ model: models.User }] },
			{ model: models.User },
		],
		attributes: ['content', 'mediaUrl', 'createdAt', 'userId', 'id'],
		where: { id },
	});
	let threadId = id;
	let comments = await models.Comment.findAll({
		attributes: ['content', 'userId', 'createdAt', 'id'],
		include: [{ model: models.User }],
		where: { threadId },
		order: [['createdAt', 'DESC']],
	});
	res.locals.comments = comments;
	res.locals.thread = thread;

	res.render('thread');
};

controller.createThread = async (req, res) => {
	//let mssv = 21810052
	// userId: số dư MSSV của bạn cho 10 + 1
	let mssv = 21810052;
	let userId = (mssv % 10) + 1;
	try {
		const { content } = req.body; //lay noi dung dang bai tu form
		const mediaUrl = '/assets/images/sample.jpg'; // duong dan mac dinh
		//tao Thread moi
		let newThread = await models.Thread.create({
			userId: userId,
			content: content,
			mediaUrl: mediaUrl,
		});

		//Sau khi dang thanh công, hiển thị lại trang vs thong tin mới
		//Lấy tất cả các Thread để hiển thị
		let threads = await models.Thread.findAll({
			include: [{ model: models.User }],
			order: [['createdAt', 'DESC']], //sap xep theo TG tao moi nhat
		});
		res.locals.threads = threads;
		res.render('index');
	} catch (error) {
		res.render('thread', {
			errorMessage: 'Opps, can not post content!',
		});
	}
};

module.exports = controller;
