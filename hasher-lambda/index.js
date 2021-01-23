const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dch = require('./dropbox-content-hasher');

exports.handler = async (event) => {
  const { bucket, key } = event;

  const hash = await calculateHashValue(bucket, key);
  const fileSize = await getFileSize(bucket, key);

  if (!hash) {
    console.log('Failed to calculate hash value');
    return {
      status: 'error',
      message: 'Failed to calculate hash value',
    }
  }

  return {
    status: 'success',
    hash_value: hash,
    file_size: fileSize,
  };
};

const calculateHashValue = (bucket, key) => {
  return new Promise((resolve) => {
    const hasher = dch.create();

    s3.getObject({
      Bucket: bucket,
      Key: key,
    })
    .createReadStream()
    .on('data', function(buf) {
      hasher.update(buf);
    })
    .on('error', function(err) {
      console.log(err);
      resolve(null);
    })
    .on('end', function() {
      const hexDigest = hasher.digest('hex');
      resolve(hexDigest);
    });
  });
};

const getFileSize = async (bucket, key) => {
  try {
    const { ContentLength } = await s3.headObject({ Key: key, Bucket: bucket }).promise();
    return ContentLength;
  }
  catch (err) {
    console.log(err);
    return -1;
  }
};
