const user = require("express").Router();
import { checkUserAndPassword } from "../helpers/dbConnectionUser";

user.get("/", (request: any, response: any) => {
  response.send(`Welcome to User Api`);
});

/**
 * Expects the body to have a @param username and a @param password
 */
user.post("/login", (request: any, response: any) => {
  const data = request.body;
  console.log(data)

  if (!data.username || !data.password)
    return response.status(400).json({ message: `username or password field is missing from the post data` });

  checkUserAndPassword(data.username, data.password, (valid: boolean, role: string) => {
    response.json({ message: "Login data received", valid, role });
  });
});

module.exports = user;
