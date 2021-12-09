const core = require('@actions/core');
const github = require('@actions/github');
const labeler = require('./labeler')

const doWork = async () => {
  console.log(`The event payload: ${JSON.stringify(github.context.payload)}`);
  const issue = JSON.stringify(github.context.payload.issue, undefined, 2)
  const labels = labeler.labelsByPattern(issue.body, 'What platform to execute')
  const repoLabels = await labeler.repoLabels()
  const filteredLabels = labeler.filterLabels(repoLabels, labels)
  labeler.addLabelsToIssue(issueNum, filteredLabels)
  
}

try {
  doWork()
} catch (error) {
  core.setFailed(error.message);
}