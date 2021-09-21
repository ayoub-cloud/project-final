import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //** Admin Role  */
    const [role, setRole] = useState(false);

    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );
        // Check Role
        const checkBox = document.getElementById("checkBox");

        const termsError = document.querySelector(".terms.error");

        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML = "Wrong Password";

            if (!terms.checked)
                termsError.innerHTML = "Please accept the terms and conditions";
        } else {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password,
                    //Admin
                    role,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <span></span>
                    <h4 className="success">
                        You have successfully registered, please sign-in
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Name</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error"></div>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="password-conf">Confirm your password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password-conf"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className="password-confirm error"></div>
                    {/*Role Checkbox */}
                    <br />
                    <input
                        type="checkbox"
                        id="checkbox"
                        defaultChecked={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <label htmlFor="terms">
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            inscrivez-vous en tant qu'administrateur?
                        </a>
                    </label>
                    {/*______________ */}
                    <br />
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        I Accept The{" "}
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            Terms and Conditions
                        </a>
                    </label>
                    <div className="terms error"></div>
                    <br />
                    <input type="submit" value="Register" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;
