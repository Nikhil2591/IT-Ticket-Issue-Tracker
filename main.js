//retrieve issues from the Local Storage

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issueList');
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var subject = issues[i].subject;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var raisedBy = issues[i].raisedBy;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
        '<h6>Issue ID: ' + id + '</h6>'+
        '<p><span class="label label-info">' + status + '</span></p>'+
        '<h3>' + subject + '</h3>'+
        '<h5>' + desc + '</h5>'+
        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
        '<p>Raised By ' + raisedBy + '</p>'+
        '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
        '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
        '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a> '+
        '<a href="#" onclick="setStatusOpen(\''+id+'\')" class="btn btn-warning">Re-Open</a>'+
        '</div>';
    }
}

//attach an event handler to the submit event of the form

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//The addEventListener method is called to attach the submit event of the form to the saveIssue event handler function

function saveIssue(e) {
    var issueId = chance.guid();
    var issueSubject = document.getElementById('issueSubjectInput').value;
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var raisedBy = document.getElementById('issueRaisedByInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        subject: issueSubject,
        description: issueDesc,
        severity: issueSeverity,
        raisedBy: raisedBy,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}
    //  Close the current issue item from the list and from Local Storage
    function setStatusClosed (id) {
        var issues = JSON.parse(localStorage.getItem('issues'));

        for(var i = 0; i < issues.length; i++) {
            if (issues[i].id == id) {
                issues[i].status = "Closed";
            }
        }
        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();

    }

    // Re-open the current issue item from the list and from Local Storage
    function setStatusOpen (id) {
        var issues = JSON.parse(localStorage.getItem('issues'));

        for(var i = 0; i < issues.length; i++) {
            if (issues[i].id == id) {
                issues[i].status = "Re-Open";
            }
        }
        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();

    }
//delete the current issue item from the list and from Local Storage

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
          issues.splice(i, 1);
        }
      }
      
      localStorage.setItem('issues', JSON.stringify(issues));
      
      fetchIssues();
}

function validate(){
    var issueSubject = document.getElementById('issueSubjectInput').value;
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var raisedBy = document.getElementById('issueRaisedByInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;

    if(issueSubject=="" || issueDesc=="" || raisedBy== "" || issueAssignedTo== ""){
        alert('please fill in all fields');
        return false;
    }
    else{
        return true;
    }
}

