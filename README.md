logcloudwatch
=============

Logs stuff to [CloudWatch Logs](https://aws.amazon.com/cloudwatch/details/#log-monitoring) in JSON format

![](https://nodei.co/npm/logcloudwatch.png)


### Prerequisites

* Create a Log Group, e.g.: ```aws logs create-log-group --log-group-name my-log-group```
* Create a Log Stream inside that group
* Allow these Actions: ```logs:PutLogEvents``` and ```logs:DescribeLogStreams```


### Usage

```javascript
var logger = require('logcloudwatch')('my-log-group', 'log-stream-name', {
  /* ... optional params for aws-sdk ... */
});

// optional
logger.on('error', function (err) {
  console.error('Error while putting logs:', err);
});

var uuid = logger.log('a fatal error occurred!', { any: ['object', 'here', '400'] }, 'foo');
// if you whish, you can report your user the uuid,
// it will be included in the logged error message, so you can easily search for it

```

### Result

![Screenshot](http://i.imgur.com/t8pq7tD.png)
