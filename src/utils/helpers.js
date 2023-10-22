import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const singInWithGoogle = async () => {
	await signInWithPopup(auth, googleProvider).then((userCred) => {
		window.location.reload();
	});
};

export const singInWithGitHub = async () => {
	await signInWithPopup(auth, githubProvider).then((userCred) => {
		window.location.reload();
	});
};

export const Menu = [
	{ id: uuidv4(), name: "Projects", uri: "/home/projects" },
	{ id: uuidv4(), name: "Collections", uri: "/home/collections" },
	{ id: uuidv4(), name: "Profile", uri: "/home/profile" },
];

export const signOutAction = async () => {
	await auth.signOut().then(() => {
		window.location.reload();
	});
};
