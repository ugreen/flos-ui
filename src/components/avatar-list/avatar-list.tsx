import React from "react";
import styled from "styled-components";

import { Avatar, sizes } from "../..";
import { color, typography } from "../../shared/styles";

type UserProps = {
  id: string;
  name?: string;
  avatarUrl?: string | null;
};

type AvatarListProps = {
  loading?: boolean | number;
  userCount?: number;
  size?: keyof typeof sizes;
  users?: UserProps[];
};

const UserAvatar = styled(Avatar)`
  box-shadow: ${color.lightest} 0 0 0 2px;
  display: block;
`;

const UserEllipses = styled.li`
  display: inline-flex;
  font-size: ${typography.size.s1}px;
  color: ${color.mediumdark};
  margin-left: 6px;
  white-space: nowrap;
`;

const User = styled.li<any>`
  display: inline-flex;
`;

const Users = styled.ul`
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  vertical-align: top;
  margin: 0;
  padding: 0;
  list-style: none;

  ${User} {
    position: relative;

    &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      z-index: 2;
      margin-left: -6px;
    }
    &:nth-child(3) {
      z-index: 1;
      margin-left: -6px;
    }
  }
`;

// Either pass the full list of users, or a userCount if known
export const AvatarList = ({
  loading = false,
  users = [
    { id: "loading", avatarUrl: null, name: "loading" },
    { id: "loading2", avatarUrl: null, name: "loading" },
    { id: "loading3", avatarUrl: null, name: "loading" },
  ],
  userCount,
  size = "medium",
  ...props
}: AvatarListProps) => {
  const count = userCount || users.length;
  return (
    <Users aria-label="users" {...props}>
      {users.slice(0, 3).map(({ id, name, avatarUrl }: UserProps) => (
        <User key={id}>
          <UserAvatar
            size={size}
            username={name}
            src={avatarUrl}
            loading={loading ? 1 : 0}
          />
        </User>
      ))}
      {count > 3 && (
        <UserEllipses aria-label={`${count - 3} more user(s)`}>
          {" "}
          &#43; {count - 3}{" "}
        </UserEllipses>
      )}
    </Users>
  );
};
