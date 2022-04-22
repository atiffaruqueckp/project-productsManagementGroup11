const aws = require("aws-sdk")  //AWS is best cloud service,which data save in cloud that is save and secure SDK- software development kit

aws.config.update({                       //for uploading a file in backend
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
    secretAccessKey: "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",  // secret password
    region: "ap-south-1"                             // physical  location arround the world where we cluster data centers.
});

const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {     //execute/error
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })  //simple storage service
        const uploadParams = {
            ACL: "public-read",                 //Access control list public/private
            Bucket: "classroom-training-bucket",  //bucket is a container for objects stores in amazon S3.
            Key: "Group_11/" + file.originalname,
            Body: file.buffer            //AWS buffer also ensures efficiency over traffic or load ,it maintain a speed and provides a faster service. 

        }
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })
    })
}

module.exports.uploadFile = uploadFile