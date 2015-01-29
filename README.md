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


### License

Copyright © 2015 Plastic Panda

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
