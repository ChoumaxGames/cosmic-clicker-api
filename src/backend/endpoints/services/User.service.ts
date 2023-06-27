import {Service} from "fastify-decorators";
import {Prisma, User} from "@prisma/client";
import prisma from "../../../clients/Prisma";
import {UserCreateBodySchema, UserDeleteBodySchema, UserScoreBodySchema} from "../schemas/User.schema";
import {ApiError} from "../Errors/ApiError";

export type rankUser = {
    uid: string,
    name: string,
    score: number,
    rank: number
}

@Service()
export default class UserService {

    public static UserPublicSelect: Prisma.UserSelect = {
        uid: true,
        name: true,
        score: true
    }

    public static async isUserExist(uid: string): Promise<boolean> {
        const user = await prisma.user.findFirst({
            where: {
                uid
            }
        });

        return user !== null;
    }

    async createUser(data: UserCreateBodySchema): Promise<Partial<User>> {

        const name = decodeURIComponent(data.name);

        return prisma.user.create({
            data: {
                name
            },
            select: UserService.UserPublicSelect
        });

    }

    async getUserByUID(uid: string): Promise<Partial<User>> {

            if (!await UserService.isUserExist(uid)) {
                throw new ApiError("User don't exists", 404);
            }

            return prisma.user.findFirst({
                where: {
                    uid
                },
                select: UserService.UserPublicSelect
            });
    }

    async getAllUsers(): Promise<Partial<rankUser>[]> {
        const userList = await prisma.user.findMany({
            select: UserService.UserPublicSelect
        });

        const rankUserList: Partial<rankUser>[] = [];

        userList.sort((a, b) => b.score - a.score).forEach((user, index) => {
            rankUserList.push({
                ...user, rank: index + 1
            })
        });

        return rankUserList;
    }

    async deleteUser(uid: UserDeleteBodySchema): Promise<Partial<void>> {

        if (!await UserService.isUserExist(uid)) {
            throw new ApiError("User don't exists", 404);
        }

        await prisma.user.delete({
            where: {
                uid
            }
        });
    }

    async addScore({uid, score}: UserScoreBodySchema): Promise<void> {
        if (!await UserService.isUserExist(uid)) {
            throw new ApiError("User don't exists", 404);
        }

        await prisma.user.update({
            where: {
                uid
            },
            data: {
                score: {
                    increment: score
                }
            }
        })
    }

    async setScore({uid, score}: UserScoreBodySchema): Promise<void> {
        if (!await UserService.isUserExist(uid)) {
            throw new ApiError("User don't exists", 404);
        }

        await prisma.user.update({
            where: {
                uid
            },
            data: {
                score
            }
        })
    }
}