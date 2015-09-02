'use strict';

var Crypto = require('crypto');
var config = require('../../../s3_config.json');

module.exports = function(app) {
  app.factory('s3Service', ['$scope', '$base64', function($scope, $base64) {

    var bucket = config.bucket;
    var folder = config.folder;
    var awsId = config.awsId; //AWS access id
    var secret = config.secret; //AWS secret key
    var region = config.region;
    var action = "http://" + bucket + ".s3.amazonaws.com/";

    var d1,
        d2,
        credential,
        policy;
    var theFile;

  // request
    return {
      s3Upload: function(theFile, callback) {

        var key = config.folder + '/' + theFile.name;

        // calculate various dates for policy and signature
        var d1 = new Date();
        var d2 = new Date(new Date(d1).setHours(d1.getHours()+12));
        var dates = {
          expDate: d2.toISOString(),
          shortDate: "" + d1.getUTCFullYear() + (d1.getUTCMonth()<10 ? '0' + (d1.getUTCMonth()+1) : (d1.getUTCMonth()+1)) + d1.getUTCDate(),
          isoDate: dates.dateStamp + "T" + "000000Z"
        };

        var policy = createS3Policy(dates.expDate, dates.isoDate);
        var signature = getSignature(key, dates.shortDate);
        var credential = config.secret + "/" + dates.shortDate + "/" + config.region + "/s3/aws4_request";

      // form data

        var data = new FormData();
        data.append('acl', 'public-read');
        data.append('key', key);
        data.append('Content-Type', theFile.type);
        data.append(awsId);
        data.append('x-amz-meta-uuid', theFile.id);
        data.append('x-amz-credential', credential);
        data.append('x-amz-algorithm', 'AWS4-HMAC-SHA256');
        data.append('x-amz-date', dates.isoDate);
        data.append('policy', policy);
        data.append('x-amz-signature', signature);
        data.append('file', theFile);

      // xhr

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress',function(ev){
          //display progress...
        }, false);
        xhr.onreadystatechange = function(ev){
          if(xhr.readyState == 4){
            //completed - // check xhr.status
          }
        };
        xhr.open('POST', action, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(data);
        return false;
      }
    };

    // policy

    function createS3Policy(expDate, reqDate) {

      var POLICY_JSON = {
        "expiration": expDate,
        "conditions": [
          {"bucket": config.bucket},
          ["starts-with", "$key", config.folder],
          {"acl": "public-read"},
          {"success_action_redirect": "http://acl6.s3.amazonaws.com/successful_upload.html"},
          ["starts-with", "$Content-Type", "image/"],
          {"x-amz-meta-uuid": theFile.id}, // file related
          ["starts-with", "$x-amz-meta-tag", ""],

          {"x-amz-credential": credential},
          {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
          {"x-amz-date": reqDate}
        ]
      };
      return $base64.encode(JSON.stringify(POLICY_JSON));
    }

    // signature

    function getSignature(key, date) {

      var keyDate = Crypto.HMAC(Crypto.SHA256, date, "AWS4" + key, { asBytes: true});
      var keyRegion = Crypto.HMAC(Crypto.SHA256, region, keyDate, { asBytes: true });
      var keyService = Crypto.HMAC(Crypto.SHA256, 's3', keyRegion, { asBytes: true });
      var signingKey = Crypto.HMAC(Crypto.SHA256, "aws4_request", keyService, { asBytes: true });

      return Crypto.HMAC(Crypto.SHA256, signingKey, policy);
    }
  }]);
};
