import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import { FiLock, FiUnlock } from "react-icons/fi";
import { HiDuplicate } from "react-icons/hi";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Alert, UserProfileDetails } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

const NewProject = () => {
	const [html, setHtml] = useState("");
	const [css, setCss] = useState("");
	const [js, setJs] = useState("");
	const [output, setOutput] = useState("");
	const [title, setTitle] = useState("Untitled");
	const [isTitle, setIsTitle] = useState("");
	const [lock, setLock] = useState(false);
	const [alert, setAlert] = useState(false);

	const user = useSelector((state) => state.user.user);

	const copyHtml = () => {
		navigator.clipboard.writeText(html);
	};
	const copyCss = () => {
		navigator.clipboard.writeText(css);
	};
	const copyJs = () => {
		navigator.clipboard.writeText(js);
	};

	useEffect(() => {
		updateOutput();
	}, [html, css, js]);

	const updateOutput = () => {
		const combinedOutput = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
        `;
		setOutput(combinedOutput);
	};

	const saveProgram = async () => {
		const id = `${Date.now()}`;
		const _doc = {
			id: id,
			title: title,
			html: html,
			css: css,
			js: js,
			output: output,
			user: user,
		};
		await setDoc(doc(db, "Projects", id), _doc)
			.then((res) => {
				setAlert(true);
			})
			.catch((err) => console.log(err));

		setInterval(() => {
			setAlert(false);
		}, 2000);
	};

	return (
		<>
			<div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
				{/* alert section */}
				<AnimatePresence>
					{alert && <Alert status={"Success"} alertMsg={"Project saved"} />}
				</AnimatePresence>
				{/* header section */}
				<header className='w-full flex items-center justify-between px-4'>
					{/* title section */}
					<div className='flex items-center justify-center mt-3'>
						<Link to={"/home/projects"}>
							<img src={Logo} alt='Logo' className='object-contain w-60' />
						</Link>
						<div className='flex flex-col items-start justify-start -mt-2'>
							{/* title */}
							<div className='flex items-center justify-center gap-3'>
								<AnimatePresence>
									{isTitle ? (
										<>
											<motion.input
												key={"TitleInput"}
												type='text'
												placeholder='Your Title'
												value={title}
												onChange={(e) => setTitle(e.target.value)}
												className='px-3 py-2 w-40 rounded-md bg-transparent text-primaryText text-base outline-none border-none '
											/>
										</>
									) : (
										<>
											<motion.p
												key={"titleLabel"}
												className='px-3 py-2 text-white text-base'
											>
												{title}
											</motion.p>
										</>
									)}
								</AnimatePresence>
								<AnimatePresence>
									{isTitle ? (
										<>
											<motion.div
												key={"MdCheck"}
												whileTap={{ scale: 0.9 }}
												className='cursor-pointer'
												onClick={() => setIsTitle(false)}
											>
												<MdCheck className='text-xl text-emerald-500' />
											</motion.div>
										</>
									) : (
										<>
											<motion.div
												key={"MdEdit"}
												whileTap={{ scale: 0.9 }}
												className='cursor-pointer'
												onClick={() => setIsTitle(true)}
											>
												<MdEdit className='text-xl text-primaryText' />
											</motion.div>
										</>
									)}
								</AnimatePresence>
							</div>
							{/* follow button */}
							<div className='flex items-center justify-center px-3 -mt-2 gap-2'>
								<p className='text-primaryText text-base'>
									{user?.displayName
										? user.displayName
										: `${user?.email.split("@")[0]}`}
								</p>
								<motion.p
									whileTap={{ scale: 0.9 }}
									className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-medium cursor-pointer'
								>
									+ Follow
								</motion.p>
							</div>
						</div>
					</div>
					{/* user section */}
					{user && (
						<div className='flex items-center justify-center gap-2'>
							{lock ? (
								<motion.div
									whileTap={{ scale: 0.9 }}
									className='px-4 py-3 border-2 border-white cursor-pointer text-base text-primary font-semibold rounded-md bg-red-500'
									onClick={() => setLock(!lock)}
								>
									<FiLock className='text-white text-base' />
								</motion.div>
							) : (
								<motion.div
									whileTap={{ scale: 0.9 }}
									className='px-4 py-3 bg-transparent border-2 border-white cursor-pointer text-base text-primary font-semibold rounded-md'
									onClick={() => setLock(!lock)}
								>
									<FiUnlock className='text-white text-base' />
								</motion.div>
							)}
							<motion.button
								onClick={saveProgram}
								whileTap={{ scale: 0.9 }}
								className='px-5 py-3 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'
							>
								Save
							</motion.button>
							<UserProfileDetails />
						</div>
					)}
				</header>

				{/* coding section */}
				<div>
					{/* horizontal */}
					<SplitPane
						split='horizontal'
						minSize={100}
						maxSize={-100}
						defaultSize={"50%"}
					>
						{/* top coding section */}
						<SplitPane split='vertical' minSize={950}>
							<SplitPane split='vertical' minSize={350} maxSize={550}>
								{/* html code */}
								<div className='w-full h-full flex flex-col items-start justify-start'>
									<div className='w-full flex items-center justify-between'>
										<div className='bg-secondary px-2 py-1 border-t-4 flex items-center justify-center gap-1 border-t-gray-500'>
											<FaHtml5 className='text-sm text-red-500' />
											<p className='text-primaryText font-normal text-xs'>
												HTML
											</p>
										</div>
										{/* icons */}
										<div className='cursor-pointer flex items-center justify-center gap-2 px-2'>
											<motion.div onClick={copyHtml} whileTap={{ scale: 0.9 }}>
												<HiDuplicate className='text-base text-primaryText' />
											</motion.div>
											<motion.div whileTap={{ scale: 0.9 }}>
												<FcSettings className='text-sm text-primaryText' />
											</motion.div>
										</div>
									</div>
									<div className='w-full px-2'>
										<CodeMirror
											value={html}
											height='500px'
											theme={"dark"}
											editable={lock ? false : true}
											extensions={[javascript({ jsx: true })]}
											onChange={(value, viewUpdate) => {
												setHtml(value);
											}}
										/>
									</div>
								</div>
								{/* css code*/}
								<div className='w-full h-full flex flex-col items-start justify-start'>
									<div className='w-full flex items-center justify-between'>
										<div className='bg-secondary px-2 py-1 border-t-4 flex items-center justify-center gap-1 border-t-gray-500'>
											<FaCss3 className='text-sm text-sky-500' />
											<p className='text-primaryText font-normal text-xs'>
												CSS
											</p>
										</div>
										{/* icons */}
										<div className='cursor-pointer flex items-center justify-center gap-2 px-2'>
											<motion.div onClick={copyCss} whileTap={{ scale: 0.9 }}>
												<HiDuplicate className='text-base text-primaryText' />
											</motion.div>
											<motion.div whileTap={{ scale: 0.9 }}>
												<FcSettings className='text-sm text-primaryText' />
											</motion.div>
										</div>
									</div>
									<div className='w-full px-2'>
										<CodeMirror
											value={css}
											height='500px'
											theme={"dark"}
											editable={lock ? false : true}
											extensions={[javascript({ jsx: true })]}
											onChange={(value, viewUpdate) => {
												setCss(value);
											}}
										/>
									</div>
								</div>
							</SplitPane>
							{/* js code */}
							<div className='w-full h-full flex flex-col items-start justify-start'>
								<div className='w-full flex items-center justify-between'>
									<div className='bg-secondary px-2 py-1 border-t-4 flex items-center justify-center gap-1 border-t-gray-500'>
										<FaJs className='text-sm text-yellow-500' />
										<p className='text-primaryText font-normal text-xs'>JS</p>
									</div>
									{/* icons */}
									<div className='cursor-pointer flex items-center justify-center gap-2 px-2'>
										<motion.div onClick={copyJs} whileTap={{ scale: 0.9 }}>
											<HiDuplicate className='text-base text-primaryText' />
										</motion.div>
										<motion.div whileTap={{ scale: 0.9 }}>
											<FcSettings className='text-sm text-primaryText' />
										</motion.div>
									</div>
								</div>
								<div className='w-full px-2'>
									<CodeMirror
										value={js}
										height='500px'
										theme={"dark"}
										editable={lock ? false : true}
										extensions={[javascript({ jsx: true })]}
										onChange={(value, viewUpdate) => {
											setJs(value);
										}}
									/>
								</div>
							</div>
						</SplitPane>

						{/* bottom output section */}
						<div
							className='bg-white'
							style={{ overflow: "hidden", height: "100%" }}
						>
							<iframe
								title='Result'
								srcDoc={output}
								style={{ border: "none", width: "100%", height: "100%" }}
							/>
						</div>
					</SplitPane>
				</div>
			</div>
		</>
	);
};

export default NewProject;
