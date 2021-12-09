const labeler = require('../labeler')
var expect = require('chai').expect

describe('Label Splitter', function() {
    it('should return 1 when there is only a begin pattern and 1 label', function() {
      const body = '### Provide test case steps\n' +
      '\n' +
      'Step 1 Navigate to website\r\n' +
      'Step 2 Do some clicky\r\n' +
      'Step 3 Do some other clicky\r\n' +
      'Expected Result -  Some action occured\r\n' +
      '\n' +
      '\n' +
      '### What platform to execute the test on.\n' +
      '\n' +
      'iOS'
      expect(labeler.getLabelsByPattern(body, 'What platform to execute').length === 1)
    });

    it('should return 1 when there is begin and end pattern', function() {
      const body = '### Provide test case steps\n' +
      '\n' +
      'Step 1 Navigate to website\r\n' +
      'Step 2 Do some clicky\r\n' +
      'Step 3 Do some other clicky\r\n' +
      'Expected Result -  Some action occured\r\n' +
      '\n' +
      '\n' +
      '### What platform to execute the test on.\n' +
      '\n' +
      'iOS' +
      '\n' +
      'Android' +
      '\n' +
      '### What is the environment.\n' +
      '\n' +
      'staging'


      const labels = labeler.getLabelsByPattern(body, 'What platform to execute','What is the environment')
      expect(labels.length === 2)      
    });
});