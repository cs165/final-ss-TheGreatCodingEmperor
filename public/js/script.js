//
// You should NOT have to modify this file for the assignment!
//

(() => {
    async function onSubmit(event) {
      event.preventDefault();
      doChange=false;
      method = "GET";
  
      const info = getParameters();
      init = false;
      console.log(dateID);
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();

      const app=new App(dateID);
      
      const resultsDiv = document.querySelector('.text');
      resultsDiv.value = '';
      texture = json[0].content;
      resultsDiv.value = texture;
      
      const tomorrow = document.querySelector('.tomorrow');
      const home =document.querySelector('.home');
      const yesterday = document.querySelector('.yesterday');
      const text = document.querySelector('.text');
      tomorrow.addEventListener('click',tom);
      home.addEventListener('click',hom);
      yesterday.addEventListener('click',yest);
      text.addEventListener('keyup',change);
    }
    function change(e){
      e.preventDefault();
      console.log("do change");
      doChange=true;
    }
    async function yest(e){
      e.preventDefault();
      doChange=false;
      method = "GET";
      delta=delta-1;
      await today.setDate(today.getDate()-1);
      dateID = today.toLocaleDateString('en-US', limit);
      const title = document.querySelector('.title');
      title.textContent=dateID;
      console.log(dateID);

      const info = getParameters();
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();


      const resultsDiv = document.querySelector('.text');
      resultsDiv.value = '';
      texture = json[0].content;
      resultsDiv.value = texture;
    }
    async function hom(e){
      e.preventDefault();
      doChange=true;
      method = "PATCH";
      const title = document.querySelector('.title');
      title.textContent=dateID;
      console.log(dateID);

      const info = getParameters();
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();

    }
    async function tom(e){
      e.preventDefault();
      doChange=false;
      method = "GET";
      delta=delta+1;
      await today.setDate(today.getDate()+1);
      dateID = today.toLocaleDateString('en-US', limit);
      console.log(dateID);
      const title = document.querySelector('.title');
      title.textContent=dateID;


      const info = getParameters();
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();


      const resultsDiv = document.querySelector('.text');
      resultsDiv.value = '';
      texture = json[0].content;
      resultsDiv.value = texture;
    }
  
    /*function addKeyValueInput() {
      const container = document.createElement('div');
      container.className = 'body-row';
  
      const key = document.createElement('input');
      key.type = 'text';
      key.className = 'key';
      key.placeholder = 'key';
      key.addEventListener('keyup', createRequestPreview);
  
      const value = document.createElement('input');
      value.type = 'text';
      value.className = 'value';
      value.placeholder = 'value';
      value.addEventListener('keyup', createRequestPreview);
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        container.remove();
        createRequestPreview();
      });
  
      container.append(key);
      container.append(' : ');
      container.append(value);
      container.append(removeButton);
      const keysContainer = document.querySelector('#key-values');
      keysContainer.append(container);
    }*/
  
    function getParameters() {
      const path = "/api/"+dateID;//path
  
      //const index = methodInput.selectedIndex;
      //const method = methodInput.options[index].value;//
      const options = {
        method: method
      };
  
      /*const bodyDataContainer = document.querySelector('#key-values');
      const allRows = bodyDataContainer.querySelectorAll('.body-row');*/
      const bodyObj = {};
      /*for (let i = 0; i < allRows.length; i++) {
        const row = allRows[i];
        const keyInput = row.querySelector('.key').value.trim();
        const valueInput = row.querySelector('.value').value.trim();
        if (keyInput && valueInput) {
          bodyObj[keyInput] = valueInput;
        }
      }*/
      let resultsContainer = document.querySelector('#results');
      if(init===false)resultsContainer = document.querySelector('.text');
      bodyObj['content']=resultsContainer.value;
      console.log("do change is ",doChange);
      if (doChange===true) {
        options.body = JSON.stringify(bodyObj);
        console.log(options.body);
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
      }
      return { path, options };
    }
  
    function createRequestPreview() {
      const info = getParameters();
      const optionsPretty = JSON.stringify(info.options, null, 2);
      const previewArea = document.querySelector('#preview-area');
      previewArea.innerHTML = `fetch('${info.path}', ${optionsPretty});`
    }

    let method;
    let init = true;
    let doChange =false;
  
    let delta = 0;
    let today =new Date();
    today.setDate(today.getDate());
    const limit = { month: 'long', day: 'numeric' };
    console.log(today.toLocaleDateString('en-US', limit));
    let dateID = today.toLocaleDateString('en-US', limit);
    const home = today;


    /*const pathInput = document.querySelector('#path-input');//path
    pathInput.addEventListener('keyup', createRequestPreview);//path change
    const methodInput = document.querySelector('#method-input');
    methodInput.addEventListener('change', createRequestPreview);//method*/
  
    /*const addButton = document.querySelector('#add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      addKeyValueInput();
    });*/
  
    const form = document.querySelector('#fetch-button');
    form.addEventListener('click', onSubmit);
    createRequestPreview();
  
  })();
  