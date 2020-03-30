import React from 'react';

import { AvatarList } from './avatar-list';

export const users = [
  {
    id: '1',
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '2',
    name: 'Tom Coleman',
  },
  {
    id: '3',
    name: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '4',
    name: 'Tim',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
  {
    id: '5',
    name: 'Hingston',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
  {
    id: '6',
    name: 'Tim Hingston',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
];

export default {
  title: 'Components|AvatarList',
  component: AvatarList,
  excludeStories: ['users'],
};

export const short = () => <AvatarList users={users.slice(0, 2)} />;
export const smallSize = () => <AvatarList users={users.slice(0, 2)} size="small" />;
export const loading = () => <AvatarList loading />;
export const ellipsized = () => <AvatarList users={users} />;
export const bigUserCount = () => <AvatarList users={users} userCount={100} />;
export const empty = () => <AvatarList users={[]} />;