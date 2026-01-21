'use server';
import { ActionResult } from '@/types/action-result';
import { CreateNewUserPayload, DatabaseUser, UpdateUserPayload } from '../../types';
import { getCurrentUser } from '@/shared/lib/auth';
import { GeneralErrorsMessages } from '@/shared/utils/messages';
import { isAdmin } from '@/shared/lib/checks';
import userRepository from '../../db/user.repo';
import { UsersErrorsMessages, UsersMessages } from '../../helpers/messages';
import { handleError } from '@/shared/lib/error-handling';
import { updateTag } from 'next/cache';
import { createNewUserSchema, updateUserSchema } from '../../schemas';
import z from 'zod';

export const createNewUserAction = async (
  payload: z.input<typeof createNewUserSchema>
): Promise<ActionResult<DatabaseUser>> => {
  try {
    const vData = createNewUserSchema.parse(payload);

    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const [usr] = await userRepository.insertNewUser({ ...vData, image: '' });
    if (!usr) throw Error(UsersErrorsMessages.notFound);
    return { success: true, message: UsersMessages.created(usr.username), data: usr };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const updateUserAction = async (
  userId: string,
  payload: UpdateUserPayload
): Promise<ActionResult<DatabaseUser>> => {
  try {
    const vData = updateUserSchema.parse(payload);

    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const usr = await userRepository.findUserById(userId);
    if (!usr) throw Error(UsersErrorsMessages.notFound);

    await userRepository.updateUser(userId, vData);
    updateTag('admin-users-page');

    return { success: true, message: UsersMessages.updated(userId) };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const deleteUserAction = async (userId: string): Promise<ActionResult<DatabaseUser>> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw Error(GeneralErrorsMessages.userNotFound);
    if (!isAdmin(user)) throw Error(GeneralErrorsMessages.unauthorized);

    const usr = await userRepository.findUserById(userId);
    if (!usr) throw Error(UsersErrorsMessages.notFound);

    await userRepository.deleteUser(userId);
    updateTag('admin-users-page');

    return { success: true, message: UsersMessages.deleted(userId) };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
