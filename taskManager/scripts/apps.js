const iconImportant = "iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;

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
    console.log("hidden");
    $("#form").addClass(hide);
    inputPanel = false;
  } else {
    console.log("revealing");
    $("#form").removeClass(hide);
    inputPanel = true;
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
}

function init() {
  console.log("Task manager page");
  $("#saveBtn").click(saveTask);

  $("#Important").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#Important").click(saveTask);
}

window.onload = init;
