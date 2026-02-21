import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBell,
  IconBook,
  IconChevronRight,
  IconMessageCircle,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import "../styles/profilePage.css";

import { useNavigate } from "react-router";
import { authStore } from "../store/authStore";
import { useEffect } from "react";

function ProfilePage() {
  const { login } = authStore();
  const navigate = useNavigate();
  const ProfileItem = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => (
    <button className="profile-item">
      <div className="profile-item-left">
        {icon}
        <span>{label}</span>
      </div>
      <IconChevronRight size={18} stroke={1.5} />
    </button>
  );
  useEffect(() => {
    login("user@example.com", "password123");
  }, []);
  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        {/* Header */}
        <div className="profile-header">
          <Group justify="space-between">
            <ActionIcon
              onClick={() => navigate("/main")}
              variant="subtle"
              color="gray"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>

            <Text fw={600}>Profile</Text>

            <ActionIcon variant="subtle" color="gray">
              <IconSettings size={20} />
            </ActionIcon>
          </Group>

          <div className="profile-user">
            <Avatar
              size={72}
              radius="xl"
              src="https://freesvg.org/img/FacelessMan.png"
            />
            <Stack gap={2}>
              <Text fw={600} size="lg">
                Alex Johnson
              </Text>
              <Text size="sm" c="dimmed">
                Intermediate English Learner
              </Text>
            </Stack>
          </div>
        </div>

        {/* Sections */}
        <div className="profile-section">
          <div className="section-title">Account</div>

          <ProfileItem
            icon={<IconUser size={20} />}
            label="Personal Information"
          />
          <ProfileItem icon={<IconBook size={20} />} label="My Courses" />
          <ProfileItem
            icon={<IconMessageCircle size={20} />}
            label="Practice History"
          />
        </div>

        <div className="profile-section">
          <div className="section-header">
            <span className="section-title">Notifications</span>
            <Switch color="orange" />
          </div>

          <ProfileItem icon={<IconBell size={20} />} label="Daily Reminder" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
