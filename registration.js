const root = document.getElementById('root');
const worker = document.createElement('button');
worker.type = 'button'
worker.id="worker"
worker.textContent = "Я контентмейкер"
worker.style.marginLeft = '1vw';
worker.style.marginTop = '2vh';
root.appendChild(worker);
const employer = document.createElement('button');
employer.type = 'button'
employer.id="employer"
employer.textContent = "Я работодатель"
employer.style.marginLeft = '1vw';
employer.style.marginTop = '2vh';
root.appendChild(employer);
const mainElem = document.createElement('div');
root.appendChild(mainElem);

worker.addEventListener('click', (e) => {
    e.preventDefault();
    worker.style.backgroundColor='#50E68E'
    employer.style.backgroundColor='#efefef'
    addWorkerFields()
});

employer.addEventListener('click', (e) => {
    e.preventDefault();
    employer.style.backgroundColor='#50E68E'
    worker.style.backgroundColor='#efefef'
    addEmployerFields()
});


worker.className = 'roboto-thin-italic buttonClass'
employer.className = 'roboto-thin-italic buttonClass'

function makeElem(mainType, type, id, placeholder, addTo=mainElem){
    const someElement = document.createElement(mainType);
    someElement.type = type;
    someElement.id = id;
    someElement.placeholder = placeholder;
    addTo.appendChild(someElement);
    someElement.className = 'inputElem'
    return someElement
}

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function submitReg(){
    const SubmitButton = document.createElement('button');
    SubmitButton.type = 'submit';
    SubmitButton.textContent = 'Зарегистрироваться'
    SubmitButton.id = 'RegistrationButton';
    SubmitButton.className = 'buttonClass'
    SubmitButton.style.display = 'flex'
    mainElem.appendChild(SubmitButton);
    SubmitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const elementsIn = mainElem.getElementsByTagName('input');
        const output = {

        };
        let allOk = true
        for (const el of elementsIn){
            output[el.id] = el.value
            console.log(el.value)
            if (el.value===''){
                alert(`Поле ${el.placeholder} не заполнено`);
                allOk = false
                break
            }
        }
        console.log(JSON.stringify(output))
        if (allOk){
            ajax('POST', 'http://127.0.0.1:5501/registration/worker', {output}, (status) => {
                if (status === 200) {
                    // переход в профиль
                    return;
                }

                alert('Неверные данные');
            });
        }
        
    });
}

function addWorkerFields(){
    mainElem.innerHTML='';
    makeElem('input', 'txt', 'WorkerName', 'Имя')
    makeElem('input', 'txt', 'WorkerLastName', 'Фамилия')
    makeElem('input', 'date', 'WorkerBirthDate', 'Дата рождения')
    makeElem('input', 'email', 'WorkerEmail', 'email')
    makeElem('input', 'password', 'WorkerPassword', 'password')
    submitReg()
}



function addEmployerFields(){
    mainElem.innerHTML='';
    makeElem('input', 'txt', 'EmployerName', 'Имя')
    makeElem('input', 'txt', 'EmployerLastName', 'Фамилия')
    makeElem('input', 'txt', 'EmployerPosition', 'Должность')
    makeElem('input', 'txt', 'CompanyName', 'Название компании')
    const discr = makeElem('input', 'txt', 'CompanyDescription', 'Опишите чем занимается компания')
    discr.style.height = '6vh'
    discr.style.width = '15vw'
    makeElem('input', 'txt', 'Website', 'Сайт комании')
    makeElem('input', 'email', 'EmployerEmail', 'email')
    makeElem('input', 'password', 'EmployerPassword', 'password')
    submitReg()
    
}

