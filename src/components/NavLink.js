import { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

export const NavLink = forwardRef(({ className, ...props }, ref) => (
  <RouterLink
    ref={ref}
    {...props}
    className={({ isActive }) =>
      `${className ? className : ''} ${isActive ? 'active' : ''}`
    }
  />
));
