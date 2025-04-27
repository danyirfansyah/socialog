import Link from "next/link";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleDropdown = (menu: string | null) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <div className="border-b border-gray-200 hidden sm:block relative">
            <div className="hidden lg:block">
                <div className="container">
                    <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish relative">
                        {openDropdown === 'theater' && (
                            <div className="absolute inset-0 bg-cover bg-center z-10" style={{ backgroundImage: `url('/path-to-theater-background-image.jpg')` }} />
                        )}
                        <Link href="#" passHref>
                            <button className="navbar__link relative flex items-center">
                                NEWS
                            </button>
                        </Link>
                        <Link href="#" passHref>
                            <button className="navbar__link relative flex items-center">
                                SCHEDULE
                            </button>
                        </Link>
                        <Link href="#" passHref>
                            <button className="navbar__link relative flex items-center">
                                MEMBER
                            </button>
                        </Link>
                        <div className="relative">
                            <button className="navbar__link relative flex items-center" onClick={() => handleDropdown('theater')}>
                                THEATER
                                <RiArrowDropDownLine className="mr-1" />
                            </button>
                            {openDropdown === 'theater' && (
                                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded z-20">
                                    <Link href="#" passHref>
                                        <span className="dropdown__link">Apa itu Theater JKT48?</span>
                                    </Link>
                                    <Link href="#" passHref>
                                        <span className="dropdown__link">Theater Virtual Tour 360°</span>
                                    </Link>
                                    <Link href="#" passHref>
                                        <span className="dropdown__link">Tata Cara Pembelian Ticket</span>
                                    </Link>
                                    <Link href="#" passHref>
                                        <span className="dropdown__link">Jadwal Pertunjukan + Pembelian Tiket</span>
                                    </Link>
                                    <Link href="#" passHref>
                                        <span className="dropdown__link">Jadwal Event + Pembelian Ticket</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* Remaining dropdown items */}
                        {/* ... */}
                        <Link href="#" passHref>
                            <button className="navbar__link relative flex items-center">
                                FAN CLUB
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
