const worker = document.getElementById('applicant');
const employer = document.getElementById('employer');
const worker_input = document.getElementById('worker_input');
const employer_input = document.getElementById('employer_input');
let nowOnWorker = true;

worker.addEventListener('click', (e) => {
  console.log('wo');
  nowOnWorker = true;
  worker_input.style.display = 'block';
  employer_input.style.display = 'none';
});

employer.addEventListener('click', (e) => {
  console.log('em');
  nowOnWorker = false;
  worker_input.style.display = 'none';
  employer_input.style.display = 'block';
});

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

SubmitButton = document.getElementById('RegistrationButton');

const check = (elementNames, output) => {
  const incorrect = [];
  elementNames.forEach((elName) => {
    const element = document.getElementById(elName);
    if (element.value === '') {
      // валидация
      incorrect.push(element.placeholder);
      element.style.backgroundColor = '#fda2a2';
      checked = false;
    } else {
      element.style.backgroundColor = '#ededed';
    }
    output[element.id] = element.value;
  });
  const incorrectFields = incorrect.reduce(function (currentstr, currentelement) {
    return currentstr + ', ' + currentelement;
  }, '');
  if (incorrect.length > 1) {
    alert(`Поля ${incorrectFields.slice(2)} не заполнены`);
  } else if (incorrect.length != 0) {
    alert(`Поле ${incorrectFields.slice(2)} не заполнено`);
  }
  return incorrect.length == 0;
};

SubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let allOk = true;
  const output = {};
  if (nowOnWorker) {
    allOk = check(
      ['WorkerName', 'WorkerLastName', 'WorkerBirthDate', 'WorkerEmail', 'WorkerPassword'],
      output,
    );
    console.log(output);
  } else {
    allOk = check(
      [
        'EmployerName',
        'EmployerLastName',
        'EmployerPosition',
        'CompanyName',
        'CompanyDescription',
        'Website',
        'EmployerEmail',
        'EmployerPassword',
      ],
      output,
    );
    console.log(output);
  }

  console.log(JSON.stringify(output));
  if (allOk) {
    ajax('POST', 'http://127.0.0.1:5501/registration/worker', { output }, (status) => {
      if (status === 200) {
        // переход в профиль
        return;
      }
      alert('Неверные данные');
    });
  }
});
