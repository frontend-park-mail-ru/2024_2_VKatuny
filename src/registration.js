const worker = document.getElementById('applicant');
const employer = document.getElementById('employer');
const workerInput = document.getElementById('worker-input');
const employerInput = document.getElementById('employer-input');
let nowOnWorker = true;

worker.addEventListener('click', (e) => {
  console.log('worker function start');
  nowOnWorker = true;
  workerInput.style.display = 'block';
  employerInput.style.display = 'none';
});

employer.addEventListener('click', (e) => {
  console.log('employer function start');
  nowOnWorker = false;
  workerInput.style.display = 'none';
  employerInput.style.display = 'block';
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

const submitButton = document.getElementById('registration-button');

const check = (elementNames, output) => {
  const incorrect = [];
  elementNames.forEach((elName) => {
    const element = document.getElementById(elName);
    if (!element.value) {
      // валидация
      incorrect.push(element.placeholder);
      element.style.backgroundColor = '#fda2a2';
    } else {
      element.style.backgroundColor = '#ededed';
    }
    output[element.id] = element.value;
  });
  const incorrectFields = incorrect.reduce(function (currentstr, currentelement) {
    return currentstr + ', ' + currentelement;
  }, '');

  if (incorrect.length != 0) {
    const errorMessage = document.getElementById('error-message');
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
    errorMessage.style.display = 'block';
    errorMessage.innerText = `Требуется заполнить ${incorrectFields.slice(2)}`;
  }

  return incorrect.length == 0;
};

submitButton.addEventListener('click', (e) => {
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
    });
  }
});
