import type { ReactNode } from "react";
import {
  ActionIcon,
  Avatar,
  Divider,
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
  IconLogout,
  IconMessageCircle,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { authStore } from "../store/authStore";
import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import "../styles/profilePage.css";

function ProfilePage() {
  const { logout } = authStore();
  const navigate = useNavigate();

  const ProfileItem = ({
    icon,
    label,
  }: {
    icon: ReactNode;
    label: string;
  }) => (
    <button className="profile-item" type="button">
      <div className="profile-item-left">
        <div className="profile-icon">{icon}</div>
        <span>{label}</span>
      </div>
      <IconChevronRight size={18} stroke={1.5} />
    </button>
  );

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-header">
          <Group justify="space-between">
            <ActionIcon
              onClick={() => navigate("/main")}
              variant="subtle"
              radius="xl"
              className="profile-action"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>

            <Text fw={700} size="sm" c="rgba(255,255,255,0.7)">
              PROFILE
            </Text>

            <ActionIcon variant="subtle" radius="xl" className="profile-action">
              <IconSettings size={20} />
            </ActionIcon>
          </Group>

          <div className="profile-user-card">
            <Avatar
              size={84}
              radius="xl"
              src="https://freesvg.org/img/FacelessMan.png"
            />
            <Stack gap={4} align="center">
              <Text fw={600} size="xl" c="white">
                Alex Johnson
              </Text>
              <Text size="sm" c="rgba(255,255,255,0.72)">
                Intermediate English Learner
              </Text>
            </Stack>
          </div>
        </div>

        <div className="premium-card">
          <div className="card-title">Account</div>

          <ProfileItem icon={<IconUser size={18} />} label="Personal Information" />
          <Divider color="rgba(255, 255, 255, 0.08)" />
          <ProfileItem icon={<IconBook size={18} />} label="My Courses" />
          <Divider color="rgba(255, 255, 255, 0.08)" />
          <ProfileItem icon={<IconMessageCircle size={18} />} label="Practice History" />
        </div>

        <div className="premium-card">
          <div className="card-header">
            <span className="card-title">Notifications</span>
            <Switch color="indigo" size="md" />
          </div>

          <Divider color="rgba(255, 255, 255, 0.08)" />
          <ProfileItem icon={<IconBell size={18} />} label="Daily Reminder" />
        </div>

        <button className="logout-button" onClick={logout} type="button">
          <IconLogout size={18} />
          Log out
        </button>
      </div>

      <ButtonsNavigation />
    </div>
  );
}

export default ProfilePage;
