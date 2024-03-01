import { GoBell, GoGear } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { RiHome3Line } from "react-icons/ri";

import { Link } from "react-router-dom";

import Home from "../Pages/Home";
import Members from "../Pages/Members";
import Notifications from "../Pages/Notifications";
import Settings from "../Pages/Settings";
import Wallets from "../Pages/Wallets";

export const pageList = [
  {
    key: "/",
    icon: <RiHome3Line />,
    label: <Link to="/">Dashboard</Link>,
    element: <Home />,
  },
  {
    key: "/notifications",
    icon: <GoBell />,
    label: <Link to="/notifications">Notifications</Link>,
    element: <Notifications />,
  },
  {
    key: "/members",
    icon: <IoPeopleOutline />,
    label: <Link to="/members">Members</Link>,
    element: <Members />,
  },
  {
    key: "/wallets",
    icon: <LuWallet />,
    label: <Link to="/wallets">Wallets</Link>,
    element: <Wallets />,
  },
  {
    key: "/settings",
    icon: <GoGear />,
    label: <Link to="/settings">Settings</Link>,
    element: <Settings />,
  },
];
