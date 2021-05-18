import { useState } from 'react';

import IUser from '../Models/IUser';
import { createContainer } from 'react-tracked';
import Role from '../util/UserEnum';

export type currentUserState =
{
    currentUser: IUser
}

const useUserState = () => useState<currentUserState>({ currentUser: JSON.parse(window.sessionStorage.getItem('currentUser') as string)});

export const 
{
    Provider: CurrentUserProvider,
    useTrackedState: useCurrentUserState,
    useUpdate: useSetCurrentUserState,
} = createContainer(useUserState);

