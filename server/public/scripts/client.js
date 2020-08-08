$(document).ready(onReady);

function onReady () {
    console.log('js jq');

    addClickers();
    getTasks();
};

function addClickers() {
    $('#inputArea').on('click', '#addTaskBtn', addTask);
}

function addTask () {
    console.log('adding task');

    let newTask = $('#taskIn').val();

    let taskToSend = {
        toDo: newTask
    };

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then(function (response) {
        console.log('response from task-router', response);
        getTasks();
    }).catch(function (error) {
        console.log('error in addTask POST', error);
    });
};

function getTasks () {
    console.log('getting tasks')

    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function (response) {
        console.log('in getTasks GET', response);

        $('#taskTable').empty();

        for (let i = 0; i < response.length; i++) {
            let task = response[i];
            let completedStatus = ''

            if (task.completed === false) {
                completedStatus = 'Not done!'
            } else if (task.completed === true) {
                completedStatus = 'Done!'
            };

            $('#taskTable').append(`<tr>
            <th>${i + 1}</th>
            <td>${task.task}</td>
            <td>${completedStatus}</td>
            <td><button>&check;</button></td>
            <td><button>DELETE</button></td>
            </tr>
            `)
        }
    }).catch(function (error) {
        console.log('problem getting tasks', error);
    })
};