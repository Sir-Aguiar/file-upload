import "dotenv/config";
import { httpServer } from "./server/server";

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = Number(process.env.PORT) || 8080;

httpServer.listen(PORT, HOSTNAME, () => {
	console.log(`Server running on ${HOSTNAME}:${PORT}`);
});
