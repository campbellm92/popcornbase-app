// const  userExists  = require("../queries/userQueries");

// async function validateSignupInput(email, password, userExists) {
//   const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const strongPasswordRegex =
//     /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;
//   const emailIsValid = validEmailRegex.test(email);
//   const passwordIsStrong = strongPasswordRegex.test(password);

//   if (!email || !password) {
//     return res.status(400).render("signup", {
//       requiredError:
//         "A valid email address and password are required to proceed.",
//     });
//   } else if (!emailIsValid) {
//     return res.status(400).render("signup", {
//       invalidEmailError: "Please enter a valid email address.",
//     });
//   } else if (!passwordIsStrong) {
//     return res.status(400).render("signup", {
//       invalidPasswordError:
//         "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
//     });
//   }

//   const emailAlreadyInDB = await userExists(email);
//   if (emailAlreadyInDB) {
//     return res.status(400).render("signup", {
//       emailExistsError:
//         "This email address has already been used to create an account.",
//     });
//   }
// }

// module.exports = validateSignupInput;
