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


};

function getTasks () {
    console.log('getting tasks')

    $.ajax({
        method: 'GET',
        url: '/tasks',
    }).then(function (response) {
        console.log('in getTasks GET', response);

        $('#taskTable').empty();

        
    }).catch(function (error) {
        console.log('problem getting tasks', error);
    })
};