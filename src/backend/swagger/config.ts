import { RegisterOptions } from "fastify";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

const DEFAULT_SWAGGER_URL = "localhost:3000"

function processSwaggerURL(url: string): string {
    if (!url) return DEFAULT_SWAGGER_URL

    return url.replace(/^http(s?):\/\//, "")
}

const SwaggerConfig: RegisterOptions & FastifyDynamicSwaggerOptions = {
    swagger: {
        info: {
            title: "Cosmic Clicker API",
            description: "PRIVATE Cosmic Clicker API Documentation",
            version: process.env.npm_package_version ?? "1.0.0",
            contact: {
                name: "Choumax Games Team",
                email: "contact@cosmic-clicker.click",
                url: "cosmic-clicker.click"
            }
        },
        host: processSwaggerURL(DEFAULT_SWAGGER_URL),
        schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: [
            { name: "User", description: "User related end-points" },
        ]
    },
    refResolver: {
        clone: true,
        buildLocalReference(json, baseUri, fragment, i): string {
            return json.$id.toString()
        }
    }
}

export default SwaggerConfig