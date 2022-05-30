import bcrypt from "bcryptjs";
// const Customer = require('../models/customerModel.js');
import newUser from './../models/accountModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import 'dotenv/config';



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
        log: `Email: '${emailAddress}' already exists in the database`,
        status: 409,
        message: { err: 'User already exists. Please login.' },
      })
    }
  } catch(err) {
    return next({
      log: `authController.register received an error: ${err}`,
      status: 400,
      message: { err: 'An error occured while attempting to create a new account. Please try again.' },
    })
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const registerUser = await newUser.create({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress.toLowerCase(),
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
      console.log(`${emailAddress} has completed login successfully!`)
      const token = jwt.sign(
        { user_id: emailAddress },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7 days",
        }
      );
      res.locals.user = token;
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



authController.checkJWT = async (req, res, next) => {
  // const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  console.log(req.headers)
  
}

export default authController;