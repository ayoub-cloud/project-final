module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Wrong email or already taken";

  if (err.message.includes("email")) errors.email = "Incorrect Email";

  if (err.message.includes("password"))
    errors.password = "Password should be 6 characters at least";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Name already taken";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email already exists";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Incorrect Email";
  
  if (err.message.includes('password'))
    errors.password = "Incorrect Password"

  return errors;
}

module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};

  if (err.message.includes('invalid file'))
    errors.format = "Invalid Format";

  if (err.message.includes('max size'))
    errors.maxSize = "File is bigger than 500ko";

  return errors
}