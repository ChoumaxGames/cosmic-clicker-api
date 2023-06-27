import {Static, Type} from "@sinclair/typebox";
import {FastifySchema} from "fastify";
import UserSchema from "../../schemas/User.schema";
import {AlreadyExistsConflictSchema, DoesntExistsConflictSchema} from "./Global.schema";

const UserCreateBodySchema = Type.Object({
    name: Type.String()
})

const UserScoreBodySchema = Type.Object({
    uid: Type.String(),
    score: Type.Number()
});

const UserGetParamsSchema = Type.Object({
    uid: Type.String()
})

const UserGetAllReturnsSchema = Type.Object({
    uid: Type.String(),
    name: Type.String(),
    score: Type.Number(),
    rank: Type.Number()
});

const UserDeleteBodySchema = Type.String();

export type UserCreateBodySchema = Static<typeof UserCreateBodySchema>
export type UserDeleteBodySchema = Static<typeof UserDeleteBodySchema>
export type UserGetParamsSchema = Static<typeof UserGetParamsSchema>
export type UserScoreBodySchema = Static<typeof UserScoreBodySchema>

export const UserCreateSchema: FastifySchema = {
    tags: ["User"],
    summary: "Create an user",
    operationId: "createUser",
    body: UserCreateBodySchema,
    response: {
        200: Type.Ref(UserSchema),
    }
}

export const UserAddScoreSchema: FastifySchema = {
    tags: ["User"],
    summary: "Add score to an user",
    operationId: "addScore",
    body: UserScoreBodySchema,
    response: {
        200: Type.Ref(UserSchema),
        404: DoesntExistsConflictSchema
    }
}

export const UserSetScoreSchema: FastifySchema = {
    tags: ["User"],
    summary: "Set score to an user",
    operationId: "setScore",
    body: UserScoreBodySchema,
    response: {
        200: Type.Ref(UserSchema),
        404: DoesntExistsConflictSchema
    }
}

export const UserDeleteSchema: FastifySchema = {
    tags: ["User"],
    summary: "Delete an user",
    operationId: "deleteUser",
    body: UserDeleteBodySchema,
    response: {
        200: Type.Void(),
        404: DoesntExistsConflictSchema
    }
}

export const UserGetSchema: FastifySchema = {
    tags: ["User"],
    summary: "Get an user",
    operationId: "getUserByEmail",
    params: UserGetParamsSchema,
    response: {
        200: Type.Ref(UserSchema),
        404: DoesntExistsConflictSchema
    }
}

export const UserGetAllSchema: FastifySchema = {
    tags: ["User"],
    summary: "Get all users",
    operationId: "getAllUsers",
    response: {
        200: Type.Array(UserGetAllReturnsSchema)
    }
}