import { ToiletPaper} from "../types.ts";
import {getLocalStorageDb} from "../db/localStorage.ts";

export { getRepository };

function getRepository() {
    const db = getLocalStorageDb();

    return {
        getToiletPapers: () => {
            return db.getToiletPapers();
        },
        savePapers: ({ papers }: {papers: ToiletPaper[]}) => db.savePapers({papers}),
    }
}