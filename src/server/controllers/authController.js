import bcrypt from "bcryptjs";
// const Customer = require('../models/customerModel.js');
import newUser from './../models/accountModel.js';
import mongoose from 'mongoose';


const authController = {};

const exampleUser = {
  "firstName": "Parker",
  "lastName": "Hutcheson",
  "emailAddress": "pdhutcheson@gmail.com",
  "password": "12345678"
};

authController.register = async (req, res, next) => {

  const { firstName, lastName, emailAddress, password } = req.body;
  try {
    const checkEmail = await newUser.find({ emailAddress: emailAddress });
    // If email already exists, throw an error
    if (checkEmail.length > 0) {
      return next({
        log: 'Error: Email already exists, cannot create a new account',
        status: 409,
        message: { err: 'Account already exists, please log in or reset your passwords' },
      })
    }
  } catch(err) {
    return next({
      log: `Error: ${err}`,
      status: 400,
      message: { err: 'An error occured while attempting to create a new account. Please contact support.' },
    })
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const registerUser = await newUser.create({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashedPassword
  });
  res.locals.user = registerUser;
  return next();
}

authController.login = async (req, res, next) => {

  const { emailAddress, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  // const hashedPassword = bcrypt.hashSync(password, salt);
  const findAccount = await newUser.find({ emailAddress: emailAddress });

  if (findAccount.length <= 0) {
    return next({
      log: `Error: cannot find this account`,
      status: 404,
      message: { err: 'Account could not be found - please create an account.' },
    });
  };
  try {
    const evaluateResult = await bcrypt.compareSync(password, findAccount[0].password);
    if (evaluateResult) {
      res.locals.user = 'success'
      return next();
    } else {
      return next({
        log: `User '${findAccount[0].emailAddress}' attempted login but their email/password combination was incorrect.`,
        status: 401,
        message: { err: 'email and password did not match a relevant account; please try again' },
      })
    }

  } catch(err) {
    return next({
      log: `Unknown error occured in authController.login - unable to complete login request`,
      status: 404,
      message: { err: 'Error occured during login; please try again.' },
    })
  }  
}

export default authController;