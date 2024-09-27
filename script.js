// Clona o modelo da tarefa
const cloneTaskModel = () => {
    const taskModel = document.querySelector('.models .todo__listItem');
    const taskModelClone = taskModel.cloneNode(true); // Clona o modelo da tarefa
    return taskModelClone;
}

// Define o conteúdo da tarefa
const setTaskContent = (task, value) => {
    const textTask = task.querySelector('.todo__listText');
    textTask.textContent = value;
}

// Adiciona o botão de exclusão a cada tarefa
const addDeleteButton = (task, taskIndex) => {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('deleteButton');
    // Remove a tarefa ao clicar no botão e atualiza o LocalStorage
    deleteButton.addEventListener('click', () => {
        task.remove();
        removeTaskFromStorage(taskIndex);
    });
    task.appendChild(deleteButton); // Adiciona o botão de exclusão à tarefa
}

// Função para salvar as tarefas no LocalStorage
const saveTasksToStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do LocalStorage
const loadTasksFromStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Função para adicionar uma nova tarefa à tela
const setTaskOnScreen = (taskContent = null, taskIndex = null) => {
    const input = document.querySelector('.todo__searchInput');
    const value = taskContent || input.value.trim();
    if (value !== '') {
        const task = cloneTaskModel(); // Clona o modelo da tarefa
        setTaskContent(task, value); // Define o conteúdo da tarefa
        addDeleteButton(task, taskIndex); // Adiciona o botão de exclusão

        document.querySelector('.todo__list').appendChild(task); // Adiciona a tarefa na lista
        if (!taskContent) {
            const tasks = loadTasksFromStorage();
            tasks.push(value);
            saveTasksToStorage(tasks);
        }
        input.value = ''; // Limpa o campo de input
        addDoneTaskListener(task); // Adiciona o evento de marcar como concluída
    }
}

// Adiciona o comportamento de marcar a tarefa como concluída
const doneTaskListener = (item) => {
    const input = item.querySelector('.input');
    const text = item.querySelector('.todo__listText');
    input.addEventListener('change', (event) => {
        text.style.textDecoration = event.target.checked ? 'line-through' : 'none';
    });
}

// Adiciona o listener a todas as tarefas
const addDoneTaskListener = (task) => {
    doneTaskListener(task);
}

// Remove uma tarefa do LocalStorage ao excluí-la
const removeTaskFromStorage = (taskIndex) => {
    const tasks = loadTasksFromStorage();
    tasks.splice(taskIndex, 1); // Remove a tarefa pelo índice
    saveTasksToStorage(tasks);
}

// Carrega as tarefas salvas no LocalStorage quando a página é carregada
const loadTasksOnPageLoad = () => {
    const tasks = loadTasksFromStorage();
    tasks.forEach((taskContent, index) => setTaskOnScreen(taskContent, index));
}

// Adiciona a tarefa ao pressionar a tecla Enter
document.querySelector('.todo__searchInput').addEventListener('keyup', (event) => {
    if (event.code === 'Enter') setTaskOnScreen();
});

// Adiciona a tarefa ao clicar no ícone "+"
document.querySelector('.todo__searchIcon').addEventListener('click', setTaskOnScreen);

// Carrega as tarefas ao iniciar a página
window.onload = loadTasksOnPageLoad;