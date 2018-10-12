const config = require('../../config');

class GoogleStorageUtil {
  setBucket(bucket) {
    try {
      this.bucket = googleStorage.bucket(bucket);
      this.bucketUrl = `http://${bucket}.storage.googleapis.com`;
    } catch (e) {
      logger.error(e);
    }
  }

  async uploadFile(filePath, bucketPath) {
    await this.bucket.upload(filePath, { destination: bucketPath || '/', public: true });
    const fileUrl = `${this.bucketUrl}/${bucketPath}`;
    return fileUrl;
  }
}

const googleStorageUtil = new GoogleStorageUtil();
googleStorageUtil.setBucket(config.GOOGLE_STORAGE_DEFAULT_BUCKET);

// googleStorageUtil.uploadFile(`${__dirname}/test.jpg`, 'test/test2.jpg');

module.exports = googleStorageUtil;
