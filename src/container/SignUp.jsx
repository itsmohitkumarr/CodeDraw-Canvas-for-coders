import React, { useState } from "react";
import { Logo } from "../assets";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { singInWithGitHub, singInWithGoogle } from "../utils/helpers";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { fadeInOut } from "../animations";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertMsg, setAlertMsg] = useState("");
	const [getEmailValidationStatus, setGetEmailValidationStatus] =
		useState(false);

	const createNewUser = async () => {
		if (getEmailValidationStatus) {
			await createUserWithEmailAndPassword(auth, email, password)
				.then((userCred) => {
					if (userCred) {
						console.log(userCred);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const loginWithEmailPassword = async () => {
		if (getEmailValidationStatus) {
			await signInWithEmailAndPassword(auth, email, password)
				.then((userCred) => {
					if (userCred) {
						console.log(userCred);
					}
				})
				.catch((err) => {
					console.log(err.message);
					if (err.message.includes("user-not-found")) {
						setAlert(true);
						setAlertMsg("Invalid email or password!");
					} else {
						setAlert(true);
						setAlertMsg("Invalid email or password!");
					}

					setInterval(() => {
						setAlert(false);
					}, 4000);
				});
		}
	};

	return (
		<div className='w-full py-4'>
			<img
				src={Logo}
				alt=''
				className='object-contain w-32 opacity-50 h-auto'
			/>
			<div className='w-full flex flex-col items-center justify-center py-8'>
				<p className='py-2 mb-2 -mt-3 text-lg text-primaryText'>
					Join With Us!😃
				</p>

				<div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-3'>
					{/* email */}
					<UserAuthInput
						label='Email'
						placeholder='Email'
						isPass={false}
						key='Email'
						setStateFunction={setEmail}
						Icon={FaEnvelope}
						setGetEmailValidationStatus={setGetEmailValidationStatus}
					/>
					{/* password */}
					<UserAuthInput
						label='Password'
						placeholder='Password'
						isPass={true}
						key='Password'
						setStateFunction={setPassword}
						Icon={MdPassword}
					/>
					{/* alert */}

					<AnimatePresence>
						{alert && (
							<motion.p
								key={"AlertMessage"}
								{...fadeInOut}
								className='text-red-500 text-xs -mb-1.5'
							>
								{alertMsg}
							</motion.p>
						)}
					</AnimatePresence>

					{/* login */}
					{!isLogin ? (
						<motion.div
							onClick={createNewUser}
							whileTap={{ scale: 0.9 }}
							className='bg-emerald-500 w-full py-2.5 mt-2 rounded-md text-white text-base cursor-pointer flex justify-center items-center hover:bg-emerald-700'
						>
							<p className='text-sm text-white'>Sign Up</p>
						</motion.div>
					) : (
						<motion.div
							onClick={loginWithEmailPassword}
							whileTap={{ scale: 0.9 }}
							className='bg-emerald-500 w-full py-2.5 mt-2 rounded-md text-white text-base cursor-pointer flex justify-center items-center hover:bg-emerald-700'
						>
							<p className='text-sm text-white'>Login</p>
						</motion.div>
					)}
					{/* account text section */}

					{!isLogin ? (
						<p className='text-xs text-primaryText flex items-center justify-center gap-1'>
							Already have an account,
							<span
								onClick={() => setIsLogin(!isLogin)}
								className='text-emerald-500 cursor-pointer'
							>
								Login
							</span>
						</p>
					) : (
						<p className='text-xs text-primaryText flex items-center justify-center gap-1'>
							Don't have an account,
							<span
								onClick={() => setIsLogin(!isLogin)}
								className='text-emerald-500 cursor-pointer'
							>
								Create Now
							</span>
						</p>
					)}
					{/* or section */}

					<div className='flex items-center justify-center gap-4'>
						<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
						<p className='text-sm text-[rgba(256,256,256,0.2)]'>OR</p>
						<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
					</div>

					{/* sign in button */}
					<div className='flex gap-6'>
						<motion.div
							onClick={singInWithGoogle}
							whileTap={{ scale: 0.9 }}
							className='flex items-center justify-center bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-28 py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'
						>
							<FcGoogle className='text-lg' />
						</motion.div>
						<motion.div
							onClick={singInWithGitHub}
							whileTap={{ scale: 0.9 }}
							className='flex items-center justify-center bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-28 py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer'
						>
							<FaGithub className='text-white text-lg' />
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
