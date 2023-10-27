import React, { useState } from "react";
import {
  Button,
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../../features/authSlice";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                onClick={() => dispatch(userLogout())}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const NavList = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-sm">
      <Link
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        to="/"
      >
        <button className="flex items-center hover:text-blue-500 transition-colors">
          Home
        </button>
      </Link>
      <Link
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        to="/products"
      >
        <button className="flex items-center hover:text-blue-500 transition-colors ">
          Products
        </button>
      </Link>
      <Link
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
        to="/contact"
      >
        <button className="flex items-center hover:text-blue-500 transition-colors">
          Contact
        </button>
      </Link>
      {isAuth ? (
        <>
          <ProfileMenu />
        </>
      ) : (
        <>
          <Link
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            to="/sign-in"
          >
            <Button variant="text" size="sm" color="black">
              Sign In
            </Button>
          </Link>
          <Link
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
            to="/sign-up"
          >
            <Button variant="text" size="sm" color="black">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </ul>
  );
};

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="w-full px-6 py-3 z-10 fixed top-0 rounded-none ring-offset-blue-gray-400">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" variant="h6" className="mr-4 cursor-pointer py-1.5">
          Ibuy
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}