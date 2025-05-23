import  html  from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';
import { Filters } from '../store/todo.store';
import { renderPending } from './use-cases/render-pending';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    FiltersLIs: '.filtro',
    TodosPendingCount: '#pending-count',
    ToggleButtonPlus: '#toggle-all'
}


/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
        

    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.TodosPendingCount );
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();

    // Referencias
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted ); 
    const filtersLIs = document.querySelectorAll( ElementIDs.FiltersLIs );
 

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return
        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', ( event ) =>{
        const element = event.target.closest( '[data-id]' );
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) =>{
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest( '[data-id]' );
        if (!element || !isDestroyElement ) return;
        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', ( event ) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( ( element ) => {

        element.addEventListener('click', ( element ) => {
            filtersLIs.forEach( el => el.classList.remove('selected') );
            element.target.classList.add('selected');
            // console.log(element.target.textContent);
            
            switch ( element.target.textContent ) {
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }
            displayTodos();
        });
        

    });

};



