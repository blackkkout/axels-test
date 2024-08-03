import { forwardRef } from 'react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, ...props }, ref) => (
    <RouterLink
      ref={ref}
      {...props}
      className={({ isActive }) =>
        `${className ? className : ''} ${isActive ? 'active' : ''}`
      }
    />
  ),
);

NavLink.displayName = 'NavLink';
