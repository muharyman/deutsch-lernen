import { BlobNotFoundError, del, get, put } from '@vercel/blob';
import { mkdir, readFile, rm, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WORD_PREFIX = 'daily-words';
const LOCK_PREFIX = `${WORD_PREFIX}/locks`;

function getWordsPath(date, level) {
  return `${WORD_PREFIX}/${level}/${date}.json`;
}

function getLockPath(date, level) {
  return `${LOCK_PREFIX}/${level}/${date}.json`;
}

function createBlobStorage() {
  async function readJsonBlob(pathname) {
    try {
      const result = await get(pathname, { access: 'private' });
      if (!result || result.statusCode !== 200 || !result.stream) {
        return null;
      }

      const raw = await new Response(result.stream).text();
      return JSON.parse(raw);
    } catch (error) {
      if (error instanceof BlobNotFoundError) {
        return null;
      }

      throw error;
    }
  }

  return {
    async readWords(date, level) {
      return readJsonBlob(getWordsPath(date, level));
    },
    async writeWords(record) {
      await put(getWordsPath(record.date, record.level), JSON.stringify(record), {
        access: 'private',
        addRandomSuffix: false,
        contentType: 'application/json',
      });
    },
    async readLock(date, level) {
      return readJsonBlob(getLockPath(date, level));
    },
    async acquireLock(date, level, lock) {
      try {
        await put(getLockPath(date, level), JSON.stringify(lock), {
          access: 'private',
          addRandomSuffix: false,
          contentType: 'application/json',
        });
        return true;
      } catch {
        return false;
      }
    },
    async releaseLock(date, level, owner) {
      const existingLock = await readJsonBlob(getLockPath(date, level));
      if (!existingLock || existingLock.owner !== owner) {
        return;
      }

      try {
        await del(getLockPath(date, level));
      } catch (error) {
        if (!(error instanceof BlobNotFoundError)) {
          throw error;
        }
      }
    },
  };
}

function createFileStorage(baseDir) {
  const wordsDir = path.join(baseDir, WORD_PREFIX);
  const lockDir = path.join(baseDir, LOCK_PREFIX);

  async function ensureDirectories(level) {
    await mkdir(path.join(wordsDir, level), { recursive: true });
    await mkdir(path.join(lockDir, level), { recursive: true });
  }

  async function readJsonFile(filePath) {
    try {
      const raw = await readFile(filePath, 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      if (error && typeof error === 'object' && error.code === 'ENOENT') {
        return null;
      }

      throw error;
    }
  }

  async function writeJsonFile(filePath, data, level, flag = 'w') {
    await ensureDirectories(level);
    await writeFile(filePath, JSON.stringify(data), { encoding: 'utf8', flag });
  }

  return {
    async readWords(date, level) {
      return readJsonFile(path.join(wordsDir, level, `${date}.json`));
    },
    async writeWords(record) {
      await writeJsonFile(
        path.join(wordsDir, record.level, `${record.date}.json`),
        record,
        record.level,
        'wx'
      );
    },
    async readLock(date, level) {
      return readJsonFile(path.join(lockDir, level, `${date}.json`));
    },
    async acquireLock(date, level, lock) {
      try {
        await writeJsonFile(path.join(lockDir, level, `${date}.json`), lock, level, 'wx');
        return true;
      } catch (error) {
        if (error && typeof error === 'object' && error.code === 'EEXIST') {
          return false;
        }

        throw error;
      }
    },
    async releaseLock(date, level, owner) {
      const lockPath = path.join(lockDir, level, `${date}.json`);
      const existingLock = await readJsonFile(lockPath);
      if (!existingLock || existingLock.owner !== owner) {
        return;
      }

      try {
        await unlink(lockPath);
      } catch (error) {
        if (!(error && typeof error === 'object' && error.code === 'ENOENT')) {
          throw error;
        }
      }
    },
    async clearAll() {
      await rm(baseDir, { force: true, recursive: true });
    },
    async lockAgeMs(date, level) {
      try {
        const info = await stat(path.join(lockDir, level, `${date}.json`));
        return Date.now() - info.mtimeMs;
      } catch {
        return null;
      }
    },
  };
}

export function createDailyWordsStorage(options = {}) {
  const defaultBaseDir = process.env.DAILY_WORDS_CACHE_DIR
    ? path.resolve(process.env.DAILY_WORDS_CACHE_DIR)
    : process.env.DAILY_LESSON_CACHE_DIR
      ? path.resolve(process.env.DAILY_LESSON_CACHE_DIR)
      : path.join(process.cwd(), '.cache');

  if (options.mode === 'file') {
    return createFileStorage(options.baseDir ?? defaultBaseDir);
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return createBlobStorage();
  }

  return createFileStorage(options.baseDir ?? defaultBaseDir);
}
