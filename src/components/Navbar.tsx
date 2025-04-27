"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<
    "theater" | "jkt48points" | "shop" | null
  >(null);

  const handleDropdown = (menu: "theater" | "jkt48points" | "shop") => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  console.log(openDropdown);
    
};

export default Navbar;
