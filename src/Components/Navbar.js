import React from "react";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../Images/logo.png"
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'
import { useSnackbar } from 'notistack';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Payment', href: '/payment' },
    { name: 'LogOut', href: '' },
]
export const Navbar = (props) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
      if(localStorage.getItem("loggedIn") !== "true"){
        navigate("/sign-in")
      }
    }, [])
    
    const logout = (item) => {
        if(item.name !== 'LogOut'){
            return
        }
        auth.signOut()
            .then(() => {
                enqueueSnackbar('Logout successfully!', { variant: 'success' });
                localStorage.clear();
                navigate("/sign-in")
            })
            .catch((error) => {
                console.error("Error during logout:", error);
                enqueueSnackbar('Error during logout!', { variant: 'error' });
            });
    }
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
<header className="absolute inset-x-0 top-0 z-50 bg-white ">
<nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
                className="h-8 w-auto"
                src={logo}
                alt=""
            />
        </a>
    </div>
    <div className="flex lg:hidden">
        <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
        >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
            <a key={item.name} href={item.href} onClick={() => logout(item)} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
            </a>
        ))}

    </div>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Hi, {props?.userName}
        </a>
    </div>
</nav>
<Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    <div className="fixed inset-0 z-50" />
    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    className="h-8 w-auto"
                    src={logo}
                    alt=""
                />
            </a>
            <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
            >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
        <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                        (item.name === 'LogOut') ?
                            null
                            :
                            <a
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                {item.name}
                            </a>
                    ))}
                    <a
                        onClick={logout}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                        LogOut
                    </a>
                </div>
                <div className="py-6">
                    <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                        Hi, {props?.userName}
                    </a>
                </div>
            </div>
        </div>
    </Dialog.Panel>
</Dialog>
</header>
  )
}