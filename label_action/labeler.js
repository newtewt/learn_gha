const token = process.env.GHATOKEN
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: token });

const issue = async (issueNumber) => {
  const issue = await octokit.rest.issues.get({
    owner: 'newtewt',
    repo: 'learn_gha',
    issue_number: issueNumber,
  });
  
  return issue.data
}

const labelsByPattern = (issueBody, pattern, endingPattern) => {
  let sliced
  if(pattern === ''){
    return
  }
  const splitLines = issueBody.split("\n");
  const beginIdx = splitLines.findIndex((line) => line.includes(pattern))
  if (endingPattern) {
    const endIdx = splitLines.findIndex((line) => line.includes(endingPattern))
    sliced = splitLines.slice(beginIdx + 1, endIdx)
    
  } else {
   sliced = splitLines.slice(beginIdx + 1)
  }

  const filtered = sliced.filter((line) => line !== '' && line !== '\r' )
  return filtered.map((label) => label.trim())
}

const repoLabels = async () => {
  const labels = await octokit.rest.issues.listLabelsForRepo({
    owner: 'newtewt',
    repo: 'learn_gha',
  })
  return labels.data.map((label) => label.name)
}

const filterLabels = (repoLabels, labelsToAdd) => {
  return labelsToAdd.filter((label) => repoLabels.includes(label))
}

const addLabelsToIssue = (issueNumber, labels) => {
  octokit.rest.issues.addLabels({
    owner: 'newtewt',
    repo: 'learn_gha',
    issue_number: issueNumber,
    labels: labels
  })
}


module.exports = {
  issue,
  labelsByPattern,
  addLabelsToIssue,
  filterLabels,
  repoLabels
}