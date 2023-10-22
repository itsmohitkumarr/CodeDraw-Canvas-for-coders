import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";

const UserAuthInput = ({
	label,
	placeholder,
	isPass,
	setStateFunction,
	Icon,
	setGetEmailValidationStatus,
}) => {
	const [value, setValue] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);

	const handleTextChange = (e) => {
		setValue(e.target.value);
		setStateFunction(e.target.value);

		if (placeholder === "Email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const status = emailRegex.test(value);
			setIsEmailValid(status);
			setGetEmailValidationStatus(status);
		}
	};

	return (
		<div className='flex flex-col items-start justify-start gap-1'>
			<label className='text-xs text-gray-300'>{label}</label>
			<div
				className={`flex items-center justify-center gap-2 w-full md:w-64 rounded-md px-4 bg-gray-200 ${
					!isEmailValid &&
					placeholder === "Email" &&
					value.length > 0 &&
					"border-2 border-red-500"
				}`}
			>
				<Icon className='text-text555 text-base' />
				<input
					type={isPass && showPass ? "password" : "text"}
					placeholder={placeholder}
					className='flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-sm'
					value={value}
					onChange={handleTextChange}
				/>
				{isPass && (
					<motion.div
						whileTap={{ scale: 0.9 }}
						onClick={() => setShowPass(!showPass)}
						className='cursor-pointer'
					>
						{showPass ? (
							<FaEyeSlash className='text-text555 text-base' />
						) : (
							<FaEye className='text-text555 text-base' />
						)}
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default UserAuthInput;
