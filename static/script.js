document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");

    taskList.addEventListener("dragstart", function(event) {
        const draggedItem = event.target;
        draggedItem.style.opacity = "0.5"; // Reduce opacity during drag
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", draggedItem.dataset.index);
    });

    taskList.addEventListener("dragend", function(event) {
        const draggedItem = event.target;
        draggedItem.style.opacity = "1"; // Restore opacity after drag
    });

    taskList.addEventListener("dragover", function(event) {
        event.preventDefault();
        const targetItem = event.target.closest("li");
        if (targetItem) {
            targetItem.style.backgroundColor = "lightgray"; // Add visual feedback
        }
    });

    taskList.addEventListener("dragleave", function(event) {
        const targetItem = event.target.closest("li");
        if (targetItem) {
            targetItem.style.backgroundColor = ""; // Remove visual feedback
        }
    });

    taskList.addEventListener("drop", function(event) {
        event.preventDefault();
        const fromIndex = event.dataTransfer.getData("text/plain");
        const toIndex = event.target.dataset.index;
        if (fromIndex !== toIndex) {
            const tasks = document.getElementById("task-list");
            const taskItems = tasks.getElementsByTagName("li");
            const fromTask = taskItems[fromIndex];
            const toTask = event.target.closest("li");
            tasks.insertBefore(fromTask, toTask.nextSibling); // Insert after the target item
            fromTask.style.opacity = "1"; // Restore opacity after drop
        }
    });
});
