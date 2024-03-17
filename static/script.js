document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");
    
    taskList.addEventListener("dragstart", function(event) {
        drag(event);
    });

    taskList.addEventListener("dragover", function(event) {
        allowDrop(event);
    });

    taskList.addEventListener("drop", function(event) {
        drop(event);
    });

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.index);
    }

    function drop(event) {
        event.preventDefault();
        const fromIndex = event.dataTransfer.getData("text/plain");
        const toIndex = event.target.dataset.index;
        if (fromIndex !== toIndex) {
            const tasks = document.getElementById("task-list");
            const taskItems = tasks.getElementsByTagName("li");
            const fromTask = taskItems[fromIndex];
            const toTask = taskItems[toIndex];
            tasks.insertBefore(fromTask, toTask);
        }
    }
});
