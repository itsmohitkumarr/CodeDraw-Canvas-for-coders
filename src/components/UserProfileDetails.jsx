import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Menu, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
import { slideUpOut } from "../animations";

const UserProfileDetails = () => {
	const user = useSelector((state) => state.user?.user);
	const [isMenu, setIsMenu] = useState(false);

	return (
		<div className='flex items-center justify-center gap-2 relative'>
			<div className='w-12 h-12 flex items-center justify-center rounded-md overflow-hidden cursor-pointer bg-emerald-500'>
				{user?.photoURL ? (
					<>
						<motion.img
							whileHover={{ scale: 1.2 }}
							src={user?.photoURL}
							alt={user?.displayName}
							referrerPolicy='no-referrer'
							className='w-full h-full object-cover'
						/>
					</>
				) : (
					<p className='text-base text-white capitalize font-normal'>
						{user?.email[0]}
					</p>
				)}
			</div>

			<motion.div
				onClick={() => setIsMenu(!isMenu)}
				whileTap={{ scale: 0.9 }}
				className='w-12 h-12 flex items-center justify-center rounded-md overflow-hidden cursor-pointer bg-secondary'
			>
				<FaChevronDown className='text-primaryText' />
			</motion.div>

			<AnimatePresence>
				{isMenu && (
					<motion.div
						{...slideUpOut}
						className='bg-secondary absolute top-16 right-0 px-2 py-3 rounded-md shadow-md z-10 flex flex-col items-start justify-start min-w-[11vw]'
					>
						{Menu &&
							Menu.map((menu) => (
								<Link
									to={menu.uri}
									key={menu.id}
									className='text-primaryText text-base hover:bg-[rgba(256,256,256,0.05)] px-2 py-2 w-full rounded-md'
								>
									{menu.name}
								</Link>
							))}
						<motion.p
							onClick={signOutAction}
							whileTap={{ scale: 0.9 }}
							className='text-primaryText text-base hover:bg-[rgba(256,256,256,0.05)] px-2 py-2 w-full rounded-md'
						>
							Sign Out
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default UserProfileDetails;
