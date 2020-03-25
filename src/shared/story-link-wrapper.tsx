/* eslint-disable import/no-extraneous-dependencies */
// This is allows us to test whether the link works via the actions addon
import React, { ReactNode} from 'react';
import { action } from '@storybook/addon-actions';

const fireClickAction = action('onLinkClick');

type StoryLinkWrapperProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: Function;
  to?: string;
}

function StoryLinkWrapper ({ children, className, href, onClick, to, ...rest }: StoryLinkWrapperProps) {
  const modifiedOnClick = (event: any) => {
    event.preventDefault();
    onClick && onClick();
    fireClickAction(href || to);
  };

  return (
    <a className={className} href={href || to} onClick={modifiedOnClick} {...rest}>
      {children}
    </a>
  );
}

StoryLinkWrapper.defaultProps = {
  className: null,
  href: null,
  onClick: () => {},
  to: null,
};

export default StoryLinkWrapper;
