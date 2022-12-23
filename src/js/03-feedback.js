import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');

const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formData = {email: email.value, message: message.value };
onDownloadPage();

// 1. Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
form.addEventListener('input', throttle(evn => {
  formData[evn.target.name] = evn.target.value;
  //   console.log(formData);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}, 500));

// 2. Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
function onDownloadPage() {
  const saveMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (saveMessage) {
      console.log("Збережені данні", saveMessage);
      email.value = saveMessage.email;
  message.value = saveMessage.message;
        ;
    // formData[name] = Object.assign(saveMessage);
  }
}

// 3. Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
form.addEventListener('submit', onSubmit);

function onSubmit(evn) {
  evn.preventDefault();
  console.log('Поточні значення полів форми:', formData);
    evn.currentTarget.reset();
    
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

//4. Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
