const asyncWrapper = require('../Utils/asyncWrapper');
const validate = require('../Utils/validate');
const usersModel = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');

// ===================== SIGNUP =====================
const signUp = asyncWrapper(async (req, res) => {
	validate(req);

	const { name, email, password, role } = req.body;

	// Validate role
	if (!role || !['admin', 'user'].includes(role)) {
		return res.status(400).json({
			status: false,
			message: 'Role must be either admin or user',
		});
	}

	// Check if email already exists
	const isUserExist = await usersModel.findOne({ email });
	if (isUserExist) {
		return res.status(400).json({
			status: false,
			message: 'Email already exists',
		});
	}

	// Create new user
	const newUser = await usersModel.create({
		name,
		email,
		password: await bcrypt.hash(password, 10),
		role, // ✅ Save role
		status: 'active',
	});

	if (!newUser) {
		return res.status(400).json({
			status: false,
			message: 'User not created',
		});
	}

	// ✅ Include role in token
	const token = jwt.sign(
		{ id: newUser._id, role: newUser.role },
		config.JWT_SECRET_KEY,
		{ expiresIn: '24h' }
	);

	return res.status(200).json({
		status: true,
		message: 'User created successfully',
		data: newUser,
		token,
	});
});

// ===================== SIGNIN =====================
const signIn = asyncWrapper(async (req, res) => {
	validate(req);

	const { email, password, role } = req.body;

	// Validate role
	if (!role || !['admin', 'user'].includes(role)) {
		return res.status(400).json({
			status: false,
			message: 'Role must be either admin or user',
		});
	}

	// Check if user exists
	const user = await usersModel.findOne({ email });
	if (!user) {
		return res.status(400).json({
			status: false,
			message: 'Email not found',
		});
	}

	// Check password
	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect) {
		return res.status(400).json({
			status: false,
			message: 'Invalid password',
		});
	}

	// ✅ Check role match
	if (user.role !== role) {
		return res.status(403).json({
			status: false,
			message: `Invalid role. You are registered as '${user.role}'.`,
		});
	}

	// ✅ Include role in token
	const token = jwt.sign(
		{ id: user._id, role: user.role },
		config.JWT_SECRET_KEY,
		{ expiresIn: '24h' }
	);

	return res.status(200).json({
		status: true,
		message: 'User signed in successfully',
		data: user,
		token,
	});
});

module.exports = {
	signUp,
	signIn,
};
