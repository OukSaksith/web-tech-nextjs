'use client';
import React, { useRef, useState } from 'react';
// import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import IconMail from '../icon/icon-mail';
import IconLockDots from '../icon/icon-lock-dots';
// import IconFacebookCircle from '../icon/icon-facebook-circle';
// import IconGoogle from '../icon/icon-google';
// import IconInstagram from '../icon/icon-instagram';
// import IconTwitter from '../icon/icon-twitter';
import LanguageDropdown from '../language-dropdown';
import { Frontend_URL } from '@/lib/Constants';

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const userName = useRef('');
    const pass = useRef('');
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            username: userName.current,
            password: pass.current,
            redirect: false,
        });

        if (res?.error) {
            console.error('Authentication failed:', res.error);
            setError(res.error);
        } else {
            setError(null);
            router.push(Frontend_URL!);
        }
    };
    return (
        <>
            <div>
                <div className="absolute inset-0">
                    <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
                </div>

                <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                    <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                    <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                    <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                    <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                    <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                        <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px]">
                            <div className="absolute end-6 top-6">
                                <LanguageDropdown />
                            </div>
                            <div className="mx-auto w-full max-w-[440px]">
                                <div className="mb-10">
                                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                    <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                                </div>

                                {/* <div className="bg-gradient-to-b  from-slate-50 to-slate-200 p-2 text-center text-slate-600">
                  Login Form
              </div> */}
                                {!! error && <p className="bg-red-100 text-red-600 text-center p-2">Authentication Failed</p>}
                                <form onSubmit={onSubmit} className="p-2 flex flex-col gap-3">
                                    <div>
                                        <label htmlFor="Email">Email</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                onChange={(e) => (userName.current = e.target.value)}
                                                id="Email"
                                                type="email"
                                                placeholder="Enter Email"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconMail fill={true} />
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="Password">Password</label>
                                        <div className="relative text-white-dark">
                                            <input
                                                id="Password"
                                                onChange={(e) => (pass.current = e.target.value)}
                                                type="password"
                                                placeholder="Enter Password"
                                                className="form-input ps-10 placeholder:text-white-dark"
                                            />
                                            <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                <IconLockDots fill={true} />
                                            </span>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                        Sign in
                                    </button>
                                </form>

                                <div className="relative my-7 text-center md:mb-9">
                                    <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                    {/* <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span> */}
                                </div>
                                {/* <div className="mb-10 md:mb-[60px]">
                              <ul className="flex justify-center gap-3.5 text-white">
                                  <li>
                                      <Link
                                          href="#"
                                          className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                          style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                      >
                                          <IconInstagram />
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          href="#"
                                          className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                          style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                      >
                                          <IconFacebookCircle />
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          href="#"
                                          className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                          style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                      >
                                          <IconTwitter fill={true} />
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          href="#"
                                          className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                          style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                      >
                                          <IconGoogle />
                                      </Link>
                                  </li>
                              </ul>
                          </div> */}
                                {/* <div className="text-center dark:text-white">
                              Don&apos;t have an account ?&nbsp;
                              <Link href="/auth/boxed-signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                  SIGN UP
                              </Link>
                          </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
