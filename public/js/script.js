//
// You should NOT have to modify this file for the assignment!
//

(() => {
    async function onSubmit(event) {
      event.preventDefault();
        
      const tomorrow = document.createElement('button');
        tomorrow.classList.add('tomorrow');
        const yesterday = document.createElement('button');
        yesterday.classList.add('yesterday');




      const resultsDiv = document.querySelector('#results');
      resultsDiv.value = '';
  
      const info = getParameters();
  
      const response = await fetch(info.path, info.options);
      const json = await response.json();
      resultsDiv.value = JSON.stringify(json, null, 2);
  
      const resultsContainer = document.querySelector('#results-container');
      resultsContainer.classList.remove('hidden');
    }
  
    function addKeyValueInput() {
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
    }
  
    function getParameters() {
      const path = "/api/"+dateID;//path
  
      const index = methodInput.selectedIndex;
      const method = methodInput.options[index].value;//
      const options = {
        method: method
      };
  
      const bodyDataContainer = document.querySelector('#key-values');
      const allRows = bodyDataContainer.querySelectorAll('.body-row');
      const bodyObj = {};
      for (let i = 0; i < allRows.length; i++) {
        const row = allRows[i];
        const keyInput = row.querySelector('.key').value.trim();
        const valueInput = row.querySelector('.value').value.trim();
        if (keyInput && valueInput) {
          bodyObj[keyInput] = valueInput;
        }
      }
      const bodySize = Object.keys(bodyObj).length;
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
  
    const today =new Date();
    let dateID = new Date();
    dateID.setDate(today.getDate());
    const options = { month: 'long', day: 'numeric' };
    console.log(dateID.toLocaleDateString('en-US', options));
    dateID = dateID.toLocaleDateString('en-US', options);


    const pathInput = document.querySelector('#path-input');//path
    pathInput.addEventListener('keyup', createRequestPreview);//path change
    const methodInput = document.querySelector('#method-input');
    methodInput.addEventListener('change', createRequestPreview);//method
  
    const addButton = document.querySelector('#add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      addKeyValueInput();
    });
  
    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit);
    createRequestPreview();
  
  })();
  