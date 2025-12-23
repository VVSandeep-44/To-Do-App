document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const taskCount = document.getElementById('task-count');
    const completedCount = document.getElementById('completed-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    
    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    // Initialize the app
    renderTasks();
    updateTaskCount();
    
    // Event Listeners
    taskForm.addEventListener('submit', addTask);
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // Filter tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentFilter = button.dataset.filter;
            updateActiveFilterButton();
            renderTasks();
        });
    });
    
    // Functions
    function addTask(e) {
        e.preventDefault();
        
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        
        taskInput.value = '';
        taskInput.focus();
    }
    
    function renderTasks() {
        // Filter tasks based on current filter
        let filteredTasks = [];
        
        switch (currentFilter) {
            case 'active':
                filteredTasks = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = tasks.filter(task => task.completed);
                break;
            default:
                filteredTasks = [...tasks];
        }
        
        // Clear the task list
        taskList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            let message = '';
            switch (currentFilter) {
                case 'active':
                    message = 'No active tasks. Add some tasks or check completed ones!';
                    break;
                case 'completed':
                    message = 'No completed tasks yet. Keep working!';
                    break;
                default:
                    message = 'No tasks yet. Add your first task above!';
            }
            emptyState.textContent = message;
            taskList.appendChild(emptyState);
            return;
        }
        
        // Sort tasks by completion status and creation date
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // Render each task
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item p-4 hover:bg-gray-50 flex items-center justify-between group';
            taskItem.dataset.id = task.id;
            
            const taskLeft = document.createElement('div');
            taskLeft.className = 'flex items-center gap-3';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
            
            const taskText = document.createElement('span');
            taskText.className = task.completed ? 'line-through text-gray-400' : 'text-gray-700';
            taskText.textContent = task.text;
            
            taskLeft.appendChild(checkbox);
            taskLeft.appendChild(taskText);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(task.id);
            });
            
            taskItem.appendChild(taskLeft);
            taskItem.appendChild(deleteBtn);
            
            taskList.appendChild(taskItem);
        });
    }
    
    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
    
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
    
    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
    
    function updateActiveFilterButton() {
        filterButtons.forEach(button => {
            if (button.dataset.filter === currentFilter) {
                button.classList.remove('bg-gray-200', 'text-gray-700');
                button.classList.add('bg-indigo-600', 'text-white');
            } else {
                button.classList.remove('bg-indigo-600', 'text-white');
                button.classList.add('bg-gray-200', 'text-gray-700');
            }
        });
    }
    
    function updateTaskCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        
        taskCount.textContent = totalTasks;
        completedCount.textContent = completedTasks;
        
        // Show/hide clear completed button
        if (completedTasks > 0) {
            clearCompletedBtn.classList.remove('hidden');
        } else {
            clearCompletedBtn.classList.add('hidden');
        }
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
