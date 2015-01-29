
var AWS = require('aws-sdk');
var uuid = require('uuid');
var _ = require('lodash');
var assert = require('assert');
var util = require('util');
var EventEmitter = require('events').EventEmitter;


module.exports = function (logGroupName, logStreamName, awsParams) {
  assert(logGroupName, 'Parameter logGroupName is required.');
  assert(logStreamName, 'Parameter logStreamName is required.');
  awsParams = awsParams || {};
  
  var cloudwatchlogs = new AWS.CloudWatchLogs(awsParams);
  
  var ee = new EventEmitter();
  ee.log = function _log() {
    var _id = uuid.v4();
    var message = _squash(arguments);
    message.push(_id);
    
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
          message: JSON.stringify(message),
          timestamp: Date.now()
        }]
      }, function (err) {
        if (err) {
          ee.emit('error', err);
          return;
        }
      });
    });
    
    return _id;
  };
 
  return ee; 
};

    
function _squash() {
  var x = _.map(arguments, function (val) {
    if (typeof val === 'string' || typeof val === 'number') {
      return val;
    } else {
      return util.inspect(val, { depth: 10 });
    }
  });
  return x;
}

