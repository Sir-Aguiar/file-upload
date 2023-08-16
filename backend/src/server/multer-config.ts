import multer from "multer";
import { resolve } from "path";

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, resolve("src/uploads"));
	},
	filename(req, file, callback) {
		const time = new Date().getTime();
		callback(null, `${time}_${file.originalname}`);
	},
});

export { storage };
