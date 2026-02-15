import React from "react";
import { Button, Container } from "@mantine/core";
import "./buttonsNavigation.css";
import { IconHome } from "@tabler/icons-react";

function ButtunsNanigation() {
  return (
    <Container className="buttonsContainer">
      <Button>
        <IconHome stroke={1.5} />
        Home
      </Button>
      <Button>Courses</Button>

      <Button>Words</Button>
      <Button>Audio</Button>
      <Button>Profile</Button>
    </Container>
  );
}

export default ButtunsNanigation;
