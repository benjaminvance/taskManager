const iconImportant = "iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

function toggleImportance() {
  if (important) {
    $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  } else {
    $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
    important = true;
  }
}

function togglePanel() {
  if (panelVisible) {
    $("#form").hide();
    panelVisible = false;
    $("btnTogglePanel").text("< Show");
  } else {
    $("#form").show();
    panelVisibile = true;
    $("btnTogglePanel").text("Hide >");
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let dueDate = $("#selDate").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#selColor").val();
  let frequency = $("#selFrequency").val();
  let status = $("#selStatus").val();

  console.log(
    title,
    desc,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status
  );

  let task = new Task(
    important,
    title,
    desc,
    dueDate,
    location,
    invites,
    color,
    frequency,
    status
  );

  console.log(task);

  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Task saved", res);
      displayTask(task);
      clearForm();
      total += total;
      $("#headCount").text("You have " + total + " tasks.");
    },
    error: function (errorDetails) {
      console.log("Save failed", errorDetails);
    },
  });
}

function clearForm() {
  $("input").val("");
  $("textarea").val("");
  $("select").val("0");
  $("#txtLocation").val("");
  $("#selColor").val("#000000");
  important = true;
  toggleImportance();
}

function getStatusText(status) {
  switch (status) {
    case `1`:
      return "Pending";
    case `2`:
      return "In Progress";
    case `3`:
      return "Paused";
    case `4`:
      return "Completed";
    case `5`:
      return "Abandoned";

    default:
      return "Other";
  }
}

function getFrequencyText(frequency) {
  switch (frequency) {
    case `1`:
      return "Daily";
    case `2`:
      return "Weekly";
    case `3`:
      return "Monthly";
  }
}

function displayTask(task) {
  let iconClass = iconNonImportant;
  if (task.important) {
    iconClass = iconImportant;
  }

  let syntax = `<div class="task-item" style="border: 1px solid ${task.color};">
  <div class="icon">
  <i class="${iconClass}"></i>
  </div>
  <div class="info-1">
  <h5>${task.title}</h5>
  <h5>${task.description}</h5>
  </div>
  <div class="info-2">
  <h5>${task.dueDate}</h5>
  <h5>${task.location}</h5>
  </div>
  <div class="info-3">
  <h5>${task.invites}</h5>
  <h5>${task.location}</h5>
  </div>
  <div class="info-4">
  <h5>${getStatusText(task.status)}</h5>
  <h5>${getFrequencyText(task.frequency)}</h5>
  </div>
  </div>`;

  $("#tasks").append(syntax);
}

function fetchTasks() {
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      let data = JSON.parse(res);
      total = 0;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let task = data[i];
        if (task.name == "Ben") {
          total += 1;
          displayTask(task);
        }
      }

      $("#headCount").text("You have " + total + " tasks.");
    },
    error: function (err) {
      console.error("Error retrieving data", err);
    },
  });
}

function clearAllTasks() {
  $.ajax({
    type: "delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Ben",
    success: function () {
      location.reload();
    },
    error: function (err) {
      console.log("Error clearing tasks", err);
    },
  });
}

function init() {
  console.log("Task manager page");

  $("#Important").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);
  $("btnClearAll").click(clearAllTasks);

  fetchTasks();
}

window.onload = init;
