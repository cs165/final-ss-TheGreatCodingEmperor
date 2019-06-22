<<<<<<< HEAD
class App{
    constructor(id){
        const main = document.querySelector('.main');
        main.classList.add('hide');

        //window.location.href = "localhost:3000/id/"+id;
        const body = document.querySelector('body');

        const container = document.createElement('div');
        container.classList.add('.main');
        body.appendChild(container);

        const diary = document.createElement('div');
        diary.classList.add('title');
        diary.textContent=id;
        container.appendChild(diary);

        const textarea = document.createElement('textarea');
        textarea.classList.add('text');
        container.appendChild(textarea);

        const yesterday = document.createElement('button');
        yesterday.classList.add('yesterday');
        yesterday.textContent="yesterday";
        container.appendChild(yesterday);

        const home = document.createElement('button');
        home.classList.add('home');
        home.textContent="update";
        container.appendChild(home);

        const tomorrow = document.createElement('button');
        tomorrow.classList.add('tomorrow');
        tomorrow.textContent="tomorrow";
        container.appendChild(tomorrow);
    }
=======
class App{
    constructor(id){
        const main = document.querySelector('.main');
        main.classList.add('hide');

        //window.location.href = "localhost:3000/id/"+id;
        const body = document.querySelector('body');

        const container = document.createElement('div');
        container.classList.add('.main');
        body.appendChild(container);

        const diary = document.createElement('div');
        diary.classList.add('title');
        diary.textContent=id;
        container.appendChild(diary);

        const textarea = document.createElement('textarea');
        textarea.classList.add('text');
        container.appendChild(textarea);

        const yesterday = document.createElement('button');
        yesterday.classList.add('yesterday');
        yesterday.textContent="yesterday";
        container.appendChild(yesterday);

        const tomorrow = document.createElement('button');
        tomorrow.classList.add('tomorrow');
        tomorrow.textContent="tomorrow";
        container.appendChild(tomorrow);
    }
>>>>>>> 3baf76fd1c84acdc764b1d64c68043d23dc8b1d3
}