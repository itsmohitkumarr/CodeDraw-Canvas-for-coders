import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import { SignUp, Projects } from "../container";
import { Logo } from "../assets";
import { useSelector } from "react-redux";
import { UserProfileDetails } from "../components";

const Home = () => {
	const [isSideMenu, setIsSideMenu] = useState(false);
	const user = useSelector((state) => state.user?.user);

	return (
		<>
			{/* left */}
			<div
				className={`w-2 ${
					isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.24]"
				} min-h-screen max-h-screen relative bg-secondary py-1 flex
                flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
			>
				{/* anchor */}
				<motion.div
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSideMenu(!isSideMenu)}
					className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'
				>
					<HiChevronDoubleLeft className='text-white text-xl' />
				</motion.div>

				{!isSideMenu && (
					<div className='overflow-hidden w-full flex flex-col items-center gap-4'>
						{/* logo */}
						<Link to={"/home"}>
							<img src={Logo} alt='Logo' className='object-contain w-52' />
						</Link>

						{/* start coding */}
						<Link to={"/newProject"}>
							<div className='px-14 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-100'>
								<p className='text-gray-400 group-hover:text-gray-100 capitalize'>
									Start Coding
								</p>
							</div>
						</Link>

						{/* home nav */}
						{user && (
							<Link
								to={"/home/projects"}
								className='flex items-center justify-center'
							>
								<div className='text-primaryText hover:text-gray-100 flex items-center justify-center gap-2'>
									<MdHome className=' text-xl' />
									<p className='text-lg'>Home</p>
								</div>
							</Link>
						)}
					</div>
				)}
			</div>
			{/* right */}
			<div className='flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>
				{/* top section */}
				<div className='w-full flex items-center justify-between gap-3 -mt-4'>
					{/* search */}
					<div className='bg-secondary w-full px-4 py-2 rounded-md flex items-center justify-center'>
						<FaSearchengin className='text-xl text-primaryText' />
						<input
							type='text'
							className='flex-1 px-4 py-1 text-lg bg-transparent outline-none text-primaryText placeholder:text-gray-600'
							placeholder='Search here...'
						/>
					</div>
					{/* profile section */}
					{!user && (
						<motion.div
							whileTap={{ scale: 0.9 }}
							className='flex items-center justify-center gap-3'
						>
							<Link
								to={"/home/auth"}
								className='bg-emerald-500 w-24 py-3 rounded-md text-white text-base cursor-pointer flex justify-center items-center hover:bg-emerald-700'
							>
								Sign Up
							</Link>
						</motion.div>
					)}
					{user && <UserProfileDetails />}
				</div>

				{/* bottom section */}
				<div>
					<Routes>
						<Route path='/*' element={<Projects />} />
						<Route path='/auth' element={<SignUp />} />
					</Routes>
				</div>
			</div>
		</>
	);
};

export default Home;
