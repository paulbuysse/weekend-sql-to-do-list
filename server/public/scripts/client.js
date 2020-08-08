$(document).ready(onReady);

function onReady () {
    console.log('js jq');

    addClickers();
    getTasks();
};

function addClickers() {
    $('header').on('click', '#addTaskBtn', addTask);
    $('#taskTable').on('click', '.markDoneBtn', markDone);
    $('#taskTable').on('click', '.deleteBtn', deleteTask);
}

function deleteTask() {
    console.log('deleting...');

    let idToDelete = $(this).closest('tr').data('id');
    
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToDelete}`
    }).then(function (response) {
        console.log(response);
        getTasks();
    }).catch( function (error) {
        console.log('error in deleteTask DELETE', error);
    })
};

function markDone() {
    console.log('marked done!');

    let taskToMark = $(this).closest('tr').data('id');
    let successfulTask = $(this).closest('tr');
    console.log(taskToMark);
    console.log(successfulTask);

    $(this).closest('tr').addClass('isGreen');

    let taskObject = {};

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
            let newTask = response[i];

            if (newTask.id === taskToMark) {
                let taskObject = {
                    status: 'true'
                };
            };
            $.ajax({
                method: 'PUT',
                url: `/tasks/${taskToMark}`,
                data: taskObject
            }).then(function (response) {
                getTasks();
                console.log('PUT request worked!', response);
            }).catch(function (error) {
                console.log('error in markDone PUT', error);
            });
        };
    });
};

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
    $('#taskIn').val('');
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
            let greenStatus = ''
            let checkBtn = ''

            if (task.completed === false) {
                completedStatus = 'X'
                greenStatus = ''
                checkBtn = `<td><button class="markDoneBtn">&check;</button></td>`
            } else if (task.completed === true) {
                completedStatus = '&check;'
                greenStatus = `class="table-success"`
                checkBtn = `<td></td>`
            };

            $('#taskTable').append(`<tr data-id="${task.id}" ${greenStatus}>
            ${checkBtn}
            <td>${task.task}</td>
            <td>${completedStatus}</td>
            <td><button class="deleteBtn">&#x1f5d1;</button></td>
            </tr>
            `)
        }
    }).catch(function (error) {
        console.log('problem getting tasks', error);
    });
};