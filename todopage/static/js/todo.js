buildList();
let list_snapshot = [];
function buildList() {
  let task = document.getElementById("todo-list");
  let url = "http://127.0.0.1:8000/api/todo-list/";
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      let list = data;
      for (let i in list) {
        try {
          document.getElementById(`task-${i}`).remove();
        } catch (err) {
          console.log(err);
        }

        let task_class = "task";
        if (list[i].Completed == true) {
          task_class = "task-suc";
        }
        let item = `
            <div id="task-${i}" class=${task_class}>
                <div class="text-todo">
                    ${list[i].title}
                </div>
                <span class="close" onclick="">&#215;</span>
            </div>
          `;
        task.innerHTML += item;
      }
      if (list_snapshot.length > list.length) {
        for (var i = list.length; i < list_snapshot.length; i++) {
          document.getElementById(`task-${i}`).remove();
        }
      }

      list_snapshot = list;

      for (var i in list) {
        let deleteBtn = document.getElementsByClassName("close")[i];
        deleteBtn.addEventListener(
          "click",
          (function (item) {
            return function (ev) {
              if (ev.target.tagName === "SPAN") {
                deleteTask(item);
              }
            };
          })(list[i])
        );

        let divTask = document.getElementById(`task-${i}`);
        divTask.addEventListener(
          "click",
          (function (item) {
            return function (ev) {
              if (ev.target.tagName === "DIV") {
                changeStatus(item);
              }
            };
          })(list[i])
        );
      }
    });
}

let form = document.getElementById("header");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form Submit");
  let url = "http://127.0.0.1:8000/api/task-create/";
  let title = document.getElementById("title").value;
  console.log(JSON.stringify({ title: title }));
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ title: title }),
  }).then(function (res) {
    buildList();
    document.getElementById("form").reset();
  });
});

function changeStatus(task) {
  console.log("Task", task);
  let completed = !task.Completed;
  let url = `http://127.0.0.1:8000/api/task-updates/${task.id}`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ title: task.title, Completed: completed }),
  }).then(function () {
    buildList();
  });
}

function deleteTask(task) {
  console.log("delete", task);
  let url = `http://127.0.0.1:8000/api/task-delete/${task.id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  }).then(function () {
    buildList();
  });
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");