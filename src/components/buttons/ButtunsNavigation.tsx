import type { ReactNode } from "react";
import { Button } from "@mantine/core";
import "./buttonsNavigation.css";
import {
  IconBook,
  IconBrandDatabricks,
  IconHeadphones,
  IconHome,
  IconUserCircle,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router";

function ButtonsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  type PagesType = {
    title: string;
    url: string;
    icon: ReactNode;
  };

  const pages: PagesType[] = [
    {
      title: "Home",
      url: "/main",
      icon: <IconHome stroke={1.5} />,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: <IconBrandDatabricks stroke={1.5} />,
    },
    {
      title: "Words",
      url: "/words",
      icon: <IconBook stroke={1.5} />,
    },
    {
      title: "Audio",
      url: "/audio",
      icon: <IconHeadphones stroke={1.5} />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <IconUserCircle stroke={1.5} />,
    },
  ];

  return (
    <nav className="buttonsContainer" aria-label="Main navigation">
      {pages.map((e) => {
        const isActive = location.pathname === e.url;

        return (
          <Button
            classNames={{
              root: `navButton${isActive ? " is-active" : ""}`,
              label: "mantine-Button-label",
            }}
            variant="subtle"
            key={`${e.title}-${e.url}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => navigate(e.url)}
          >
            {e.icon}
            {e.title}
          </Button>
        );
      })}
    </nav>
  );
}

export default ButtonsNavigation;
