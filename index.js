
var AWS = require('aws-sdk');
var uuid = require('uuid');
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;


module.exports = function (logStreamName, logGroupName, awsParams) {
  assert(logStreamName, 'Parameter logStreamName is required.');
  assert(logGroupName, 'Parameter logGroupName is required.');
  awsParams = awsParams || {};
  
  var cloudwatchlogs = new AWS.ClodWatchLogs(awsParams);
  
  var ee = new EventEmitter();
  ee.log = function _log(obj) {
    obj.uuid = uuid.v4();
    
    cloudwatchlogs.describeLogStreams({
      logGroupName: logGroupName
    }, function (err, data) {
      if (err) {
        ee.emit('error', err);
        return;
      }
      
      var logStream = data.logStreams.find(function (stream) {
        return stream.logStreamName === logStreamName;
      });
      var sequenceToken = logStream.uploadSequenceToken;
      
      cloudwatchlogs.putLogEvents({
        logStreamName: logStreamName,
        logGroupName: logGroupName,
        sequenceToken: sequenceToken,
        logEvents: [{
          message: JSON.stringify(obj),
          timestamp: Date.now()
        }]
      }, function (err) {
        if (err) {
          ee.emit('error', err);
          return;
        }
      });
    });
    
    return obj.uuid;
  };
 
  return ee; 
};

    
