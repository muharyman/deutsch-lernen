import { BlobNotFoundError, del, get, put } from '@vercel/blob';
import { mkdir, readFile, rm, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const LESSON_PREFIX = 'daily-lessons';
const LOCK_PREFIX = `${LESSON_PREFIX}/locks`;

function getLessonPath(date) {
  return `${LESSON_PREFIX}/${date}.json`;
}

function getLockPath(date) {
  return `${LOCK_PREFIX}/${date}.json`;
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
    async readLesson(date) {
      return readJsonBlob(getLessonPath(date));
    },
    async writeLesson(record) {
      await put(getLessonPath(record.date), JSON.stringify(record), {
        access: 'private',
        addRandomSuffix: false,
        contentType: 'application/json',
      });
    },
    async readLock(date) {
      return readJsonBlob(getLockPath(date));
    },
    async acquireLock(date, lock) {
      try {
        await put(getLockPath(date), JSON.stringify(lock), {
          access: 'private',
          addRandomSuffix: false,
          contentType: 'application/json',
        });
        return true;
      } catch {
        return false;
      }
    },
    async releaseLock(date, owner) {
      const existingLock = await readJsonBlob(getLockPath(date));
      if (!existingLock || existingLock.owner !== owner) {
        return;
      }

      try {
        await del(getLockPath(date));
      } catch (error) {
        if (!(error instanceof BlobNotFoundError)) {
          throw error;
        }
      }
    },
  };
}

function createFileStorage(baseDir) {
  const lessonDir = path.join(baseDir, LESSON_PREFIX);
  const lockDir = path.join(baseDir, LOCK_PREFIX);

  async function ensureDirectories() {
    await mkdir(lessonDir, { recursive: true });
    await mkdir(lockDir, { recursive: true });
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

  async function writeJsonFile(filePath, data, flag = 'w') {
    await ensureDirectories();
    await writeFile(filePath, JSON.stringify(data), { encoding: 'utf8', flag });
  }

  return {
    async readLesson(date) {
      return readJsonFile(path.join(lessonDir, `${date}.json`));
    },
    async writeLesson(record) {
      await writeJsonFile(path.join(lessonDir, `${record.date}.json`), record, 'wx');
    },
    async readLock(date) {
      return readJsonFile(path.join(lockDir, `${date}.json`));
    },
    async acquireLock(date, lock) {
      try {
        await writeJsonFile(path.join(lockDir, `${date}.json`), lock, 'wx');
        return true;
      } catch (error) {
        if (error && typeof error === 'object' && error.code === 'EEXIST') {
          return false;
        }

        throw error;
      }
    },
    async releaseLock(date, owner) {
      const lockPath = path.join(lockDir, `${date}.json`);
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
    async lockAgeMs(date) {
      try {
        const info = await stat(path.join(lockDir, `${date}.json`));
        return Date.now() - info.mtimeMs;
      } catch {
        return null;
      }
    },
  };
}

export function createDailyLessonStorage(options = {}) {
  const defaultBaseDir = process.env.DAILY_LESSON_CACHE_DIR
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
