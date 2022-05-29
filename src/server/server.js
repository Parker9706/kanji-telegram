import express from "express";
import authController from "./controllers/authController.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custom middleware could also be set at the router level like so
// router.use(isLoggedIn) then all routes in this router would be protected

app.post('/login', authController.login, (req, res) => {
  return res.status(200).send('loggedin');
});

app.post('/register', authController.register, (req, res) => {
  return res.status(200).json(res.locals.user);
});

app.use('*', (req, res) => {
  return res.status(404).send('404 page not found');
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message.err);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


export default app;