import { Roles } from 'app/enums/Roles';
import React from 'react';

export function createStores() {
  return { role: Roles.Unauthorized };
}

export const stores = createStores();
