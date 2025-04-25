import type { Db } from '../types.ts';
import _ from 'lodash';
import { config } from '../config.ts';
import { getJsonDb } from './json.ts';
import { getLocalStorageDb } from './localStorage.ts';

let db: Db | undefined;
function getDb(): Db {
  if (!_.isNil(db)) {
    return db;
  }

  db = getLocalStorageDb();

  if (config.VITE_JSONBIN_USE) {
    db = getJsonDb();
  }

  return db;
}

export { getDb };
