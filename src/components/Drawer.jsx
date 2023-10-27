"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaPeopleGroup } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { AiFillClockCircle } from "react-icons/ai";
import { signIn, signOut, useSession } from 'next-auth/react'



const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [nameAvatar, setNameAvatar] = useState('')

  const handleClick = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const { data: session } = useSession()


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
                <div className="flex items-center gap-3">
                  <FaPeopleGroup size={40} />
                  <p>Turnos</p>
                </div>
              </Link>
            </div>

            <div className="flex-none hidden lg:block">
              <div className=" flex items-center gap-10">
                <ul className="menu menu-horizontal p-0 flex gap-1 items-center">
                  {session?.user ?
                    <>
                      <li className="font-semibold">
                        <Link href="/dashboard">Perfil</Link>
                      </li>
                      <li className="font-semibold">
                        <Link href="/about">About</Link>
                      </li>
                      <li className="font-semibold">
                        <Link href="/turnos">Turnos</Link>
                      </li>
                      {/* <li className="font-semibold">
                        <Link onClick={() => { signOut({ callbackUrl: "/" }) }} href="#">Cerrar sesion</Link>
                      </li> */}
                    </>
                    :
                    <>
                      <li className="font-semibold">
                        <Link href="/login">Ingresar</Link>
                      </li>
                      <li className="font-semibold">
                        <Link href="/register">Registrar</Link>
                      </li>
                    </>
                  }

                  {/* <li className="font-semibold">
                    <Link onClick={() => { signIn() }} href="/dashboard">Sign In</Link>
                  </li>  */}
                </ul>

                {session?.user &&
                  <div className="avatar online placeholder dropdown dropdown-hover ">
                    <div tabIndex={0} className="bg-neutral-focus text-neutral-content rounded-full w-10 cursor-pointer mb-1">
                      <span className="text-xl">{session?.user?.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li >
                        <Link onClick={() => { signOut({ callbackUrl: "/" }) }} href="#">Cerrar sesion</Link>
                      </li>
                    </ul>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200">
            {session?.user ?
              <>
                <li>
                  <Link onClick={handleClick} href="/dashboard">
                    <div className="flex items-center gap-2">
                      <IoMdContact size={25} />
                      <p>Perfil</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href="/about">
                    <div className="flex items-center gap-2">
                      <AiFillHome size={25} />
                      <p>About</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href="/turnos">
                    <div className="flex items-center gap-2">
                      <AiFillClockCircle size={25} />
                      <p>Turnos</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => { signOut({ callbackUrl: "/" }) }} href="#">
                    <div className="flex items-center gap-2">
                      <TbLogout2 size={25} />
                      <p>Cerrar sesion</p>
                    </div>
                  </Link>
                </li>
              </>
              :
              <>
                <li>
                  <Link onClick={handleClick} href="/login">
                    <div className="flex items-center gap-2">
                      <TbLogout size={25} />
                      <p>Ingresar</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} href="/register">
                    <div className="flex items-center gap-2">
                      <MdEmail size={25} />
                      <p>Registrar</p>
                    </div>
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
