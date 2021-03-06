const token = process.env.GHATOKEN
console.log("token is " +  token)
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: token });

const issue = async (issueNumber) => {
  console.log(token)
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
  console.log(issueBody)
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
  console.log(token)
  const labels = await octokit.rest.issues.listLabelsForRepo({
    owner: 'newtewt',
    repo: 'learn_gha',
  })
  return labels.data.map((label) => label.name)
}

const filterLabels = (repoLabels, labelsToAdd) => {
  return labelsToAdd.filter((label) => repoLabels.includes(label))
}

const addLabelsToIssue = async (issueNumber, labels) => {
  console.log('add labels')
  console.log('issueNumber' + issueNumber)
  console.log('labels' + labels)
  const r = await octokit.rest.issues.addLabels({
    owner: 'newtewt',
    repo: 'learn_gha',
    issue_number: issueNumber,
    labels: labels
  })
  console.log(r)
}


module.exports = {
  issue,
  labelsByPattern,
  addLabelsToIssue,
  filterLabels,
  repoLabels
}