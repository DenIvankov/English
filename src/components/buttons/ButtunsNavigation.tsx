import React, { type JSX } from "react";
import { Button } from "@mantine/core";
import "./buttonsNavigation.css";
import {
  IconBook,
  IconBrandDatabricks,
  IconHeadphones,
  IconHome,
  IconUserCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

function ButtonsNavigation() {
  const navigate = useNavigate();

  type PagesType = {
    title: string;
    url: string;
    icon: JSX.Element;
  };

  const pages: PagesType[] = [
    {
      title: "Home",
      url: "/main",
      icon: <IconHome stroke={1.5} />,
    },
    {
      title: "Courses",
      url: "/main",
      icon: <IconBrandDatabricks stroke={1.5} />,
    },
    {
      title: "Words",
      url: "/words",
      icon: <IconBook stroke={1.5} />,
    },
    {
      title: "Audio",
      url: "/words",
      icon: <IconHeadphones stroke={1.5} />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <IconUserCircle stroke={1.5} />,
    },
  ];

  return (
    <div className="buttonsContainer">
      {pages.map((e, i) => (
        <Button
          classNames={{
            root: "navButton",
            label: "mantine-Button-label",
          }}
          variant="subtle"
          key={i}
          onClick={() => navigate(e.url)}
        >
          {e.icon}
          {e.title}
        </Button>
      ))}
    </div>
  );
}

export default ButtonsNavigation;
