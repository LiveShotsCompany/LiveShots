import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/pages/nav";

const Home = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    const handleSignIn = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ e_mail: email, password: password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }
            await router.push('/matches');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ e_mail: email, password: password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Sign-up failed');
            }
            await router.push('/matches');
        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <div className="">
            <section className="bg-gray-100 border-2 border-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/matches" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
                    <div className="w-full bg-white rounded-lg shadow dark:border mb-32 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                            <div className="flex flex-col space-y-4">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your LiveShots account
                            </h1>
                                <div className="space-x-1.5">
                                <Link className="text-center font-normal" href="/matches">Or log in without a account:</Link>
                                <Link className="text-center text-green-400 font-bold" href="/matches">Click Here</Link>
                                </div>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 font-bold">{error}</p>}
                                <div className="flex space-x-4">
                                <button
                                    onClick={handleSignIn}
                                    className="w-full text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <button
                                    onClick={handleSignUp}
                                    className="w-full text-white bg-blue-600 hover:bg-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up   
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;