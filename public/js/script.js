//
// You should NOT have to modify this file for the assignment!
//

(() => {
    async function onSubmit(event) {
      event.preventDefault();
      
      method = "GET";
  
      const info = getParameters();
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();

      const app=new App(dateID);
      
      const resultsDiv = document.querySelector('.text');
      resultsDiv.value = '';
      texture = json[0].content;
      resultsDiv.value = texture;
      
      const tomorrow = document.querySelector('.tomorrow');
      const yesterday = document.querySelector('.yesterday');
      tomorrow.addEventListener('click',tom);
      yesterday.addEventListener('click',yest);

    }
    async function yest(e){
      e.preventDefault();
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
    async function tom(e){
      e.preventDefault();
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
      const resultsContainer = document.querySelector('#results');
      bodyObj["content"]=resultsContainer.value;
      //const bodySize = Object.keys(bodyObj).length;
      const bodySize = resultsContainer.value.length;
      if (bodySize > 0) {
        options.body = JSON.stringify(bodyObj);
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
  
    let delta = 0;
    let today =new Date();
    today.setDate(today.getDate());
    const limit = { month: 'long', day: 'numeric' };
    console.log(today.toLocaleDateString('en-US', limit));
    let dateID = today.toLocaleDateString('en-US', limit);


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
  