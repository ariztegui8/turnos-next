"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { signIn, signOut, useSession } from 'next-auth/react'



const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const { data: session } = useSession()
  // console.log(session);

  return (
    <div>
      <div className="drawer">
        <input
          id="my-drawer-3"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 gap-2 justify-around">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className=" px-2 mx-2">
              <Link href="/" className="font-bold">
                <div className="flex items-center gap-2">
                  <FcGoogle size={30} />
                  <p>Turnos</p>
                </div>
              </Link>
            </div>

            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal p-0 flex gap-1 items-center">
                {session?.user ?
                  <>
                    <li>
                      <Link href="/dashboard">Dashboard</Link>
                    </li>
                    {/* <li>
                    <p>{session.user.name}</p>
                  </li> */}
                    <li>
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={session.user.image} />
                        </div>
                      </div>
                    </li>
                    <li className="font-semibold">
                      <Link onClick={() => { signOut({callbackUrl: "/"}) }} href="#">Sign Out</Link>
                    </li>
                  </>
                  :
                  ''

                  // <li className="font-semibold">
                  //   <Link onClick={() => { signIn() }} href="/dashboard">Sign In</Link>
                  // </li>
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            <li>
              <Link onClick={handleClick} href="/dashboard">
                <div className="flex items-center gap-2">
                  <AiFillHome size={25} />
                  <p>Dashboard</p>
                </div>
              </Link>
            </li>
            {/* <li className="font-semibold">
              <Link onClick={() => { signIn(); handleClick(); }} href="#">
                <div className="flex items-center gap-2">
                  <AiFillHome size={25} />
                  <p>Sign In</p>
                </div>
              </Link>
            </li> */}
            {/* <li>
              <Link onClick={handleClick} href="/about">
                <div className="flex items-center gap-2">
                  <IoMdContact size={25} />
                  <p>About</p>
                </div>
              </Link>
            </li>
            <li>
              <Link onClick={handleClick} href="/contact">
                <div className="flex items-center gap-2">
                  <MdEmail size={25} />
                  <p>Contact</p>
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
