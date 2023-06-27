import {Type} from "@sinclair/typebox";

export default Type.Object({

    uid: Type.String({
        description: "The id of the user",
    }),
    name: Type.String({
        description: "The name of the user",
    }),
    score: Type.Number({
        description: "The score of the user",
    })

}, {
    $id: "User",
    description: "The schema describing a user"
})