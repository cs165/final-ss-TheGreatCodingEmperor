class App{
    constructor(id){
        const main = document.querySelector('.main');
        main.classList.add('hide');

        //window.location.href = "localhost:3000/id/"+id;
        const body = document.querySelector('body');

        const container = document.createElement('div');
        container.classList.add('main');
        body.appendChild(container);

        const diary = document.createElement('div');
        diary.classList.add('title');
        diary.textContent=id;
        container.appendChild(diary);

        const textarea = document.createElement('textarea');
        textarea.classList.add('text');
        container.appendChild(textarea);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        container.appendChild(buttonContainer);

        const yesterday = document.createElement('button');
        yesterday.classList.add('yesterday');
        yesterday.textContent="yesterday";
        buttonContainer.appendChild(yesterday);

        const home = document.createElement('button');
        home.classList.add('home');
        home.textContent="update";
        buttonContainer.appendChild(home);

        const tomorrow = document.createElement('button');
        tomorrow.classList.add('tomorrow');
        tomorrow.textContent="tomorrow";
        buttonContainer.appendChild(tomorrow);
    }
}