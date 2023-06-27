import {CosmicClickerRest} from "./backend";
import consolaGlobalInstance from "consola";

(async () => {
    consolaGlobalInstance.info(
        `Initializing server on the ${process.env.NODE_ENV ?? "developement"} environment...`
    )

    const server = CosmicClickerRest.getInstance()
    await server.start();
})();