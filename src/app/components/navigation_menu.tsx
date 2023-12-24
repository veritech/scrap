'use client'
import Link from "next/link";
import styles from './navigation_menu.module.css'
import { useEffect, useState } from "react";
import { UserDto, getCurrentUser } from "../user/actions";

const NavMenu = () => {

    const [isOpen, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserDto|null>();

    useEffect(() => {
        getCurrentUser()
        .then(user => setCurrentUser(user))
        .catch(() => {
            setCurrentUser(null);
        })
    },[]);

    return (
        <div className="bg-slate-600 p-4 text-white">
            <div className="flex flex-row">
                <div className="basis-3/4">
                    <Link href="/">Scrap App</Link>
                </div>
                <div className="basis-1/4">
                    <button onClick={() => setOpen(!isOpen)}>Menu</button>
                </div>
            </div>
            <div 
                className="text-center" 
                style={{
                    display: isOpen ? 'block' : 'none'
                }}
                >
                <ul>
                    {currentUser &&
                    (
                    <li>
                        <Link href="/scrap/add">Add Scrap</Link>  
                    </li>

                    )
                    }
                    {
                        !currentUser && (
                            <>
                                <li>
                                    <Link href="/user/login">Login</Link>
                                </li>
                                <li>
                                    <Link href="/user/signup">Signup</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavMenu;

