import { motion } from "framer-motion";
import React from "react";
import { slideUpOut } from "../animations";

const Alert = ({ status, alertMsg }) => {
	return (
		<motion.div {...slideUpOut} className='fixed top-16 right-16 z-10'>
			{status === "Success" && (
				<div className='px-4 py-2 rounded-md bg-emerald-400 shadow-md'>
					<p className='text-base text-primary'>{alertMsg}</p>
				</div>
			)}
		</motion.div>
	);
};

export default Alert;
