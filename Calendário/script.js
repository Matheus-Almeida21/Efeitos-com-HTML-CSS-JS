const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.days');
const prevNextIcon = document.querySelectorAll('.icons span');

//Pegando a data atual, ano e mês
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const renderCalendar = () => {
  // Pegando o total de dias do mês atual
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  // Pegando os primeiros dias do mês
  let firstDaysOfMonth = new Date(currYear, currMonth, 1).getDay();
  // Pegando os ultimos dias do mês anterior
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  // Pegando os ultimos dias do mês
  //let lastDaysOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay() + 6;

  //cria um array que ira receber os dias do mês
  const arrayDays = new Array(41)

  // Cria <li> para os ultimos dias do mês anterior e adiciona ao array
  let count = 0;
  for (let i = firstDaysOfMonth; i > 0; i--) {
    arrayDays[count++] = `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  // cria <li> para os dias do mês atual
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // Adiciona a class 'active' à <li> se o ano, mês e dia forem os atuais
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active' : '';
    arrayDays[count++] = `<li class="${isToday}">${i}</li>`;
  }

  // cria <li> para os primeiros dias do proximo mês
  let daysNextMonth = Math.abs(lastDateOfMonth - arrayDays.length)
  for (let i = 1; i <= daysNextMonth + 1; i++) {
    if (arrayDays.length == 41) {
      arrayDays[count++] = `<li class="inactive">${i}</li>`;
    }
  }
  
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  //convertendo array com os dias em string e incorporando ao HTML do <ul>
  daysTag.innerHTML = arrayDays.toString().replace(/[,]+/g, '');
}
renderCalendar();

//Adiconando evento de click aos botões de next e prev
prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    //Se o icone clicado possuir o ID prev então decrementa 1 senão incrementa 1
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {// Verifica se o mês é menor que 0 ou maior que 11
      // verifica se estamos voltando para o mês anterior e se o ano atual coincide com o ano que vamos
      if (currMonth === -1 && currYear - 1 === new Date().getFullYear()){
        date = new Date();
      } else {
        // cria uma nova data do ano e mês atual passando eles como valores para o metodo
        date = new Date(currYear, currMonth);
      }
      currYear = date.getFullYear(); // Atualizando o ano
      currMonth = date.getMonth(); // Atualizando o mês
    } else { // Senão define o date como uma novo valor
      date = new Date();
    }
    renderCalendar();
  });
});