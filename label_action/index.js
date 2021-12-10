const core = require('@actions/core');
const github = require('@actions/github');
const labeler = require('./labeler')

const doWork = async () => {
  console.log(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);
  console.log(`The event issue: ${JSON.stringify(github.context.payload.issue, undefined, 2)}`);
  console.log(`The event issue body: ${JSON.stringify(github.context.payload.issue.body, undefined, 2)}`);
  const issue = JSON.stringify(await github.context.payload.issue, undefined, 2)
  console.log(`The event issue: ${JSON.stringify(github.context.payload.issue, undefined, 2)}`);
  const labels =  await labeler.labelsByPattern(github.context.payload.issue.body, 'What platform to execute')
  const repoLabels = await labeler.repoLabels()
  const filteredLabels = labeler.filterLabels(repoLabels, labels)
  await labeler.addLabelsToIssue(github.context.payload.issue.number, filteredLabels)
  
}

try {
  doWork()
} catch (error) {
  core.setFailed(error.message);
}