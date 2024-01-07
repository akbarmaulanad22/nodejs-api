const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .trim()
      .withMessage('Please enter valid email address')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            Promise.reject('Please enter a check email address');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('password must be at least 5 characters'),
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('enter name')
      .not()
      .isEmpty(),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .trim()
      .withMessage('Please enter valid email address')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('password must be at least 5 characters'),
  ],
  authController.login
);

router.get('/status', isAuth, authController.getStatus);
router.put(
  '/status',
  isAuth,

  body('status')
    .trim()
    .isLength({ min: 2 })
    .withMessage('status must be at least 2 characters'),

  authController.updateStatus
);

module.exports = router;
