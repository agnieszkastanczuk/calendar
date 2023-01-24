let calendar = document.querySelector('.calendar')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//Is the year a leap year?

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

//longer: 
// function isLeapYear(year)  {
//     if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)) {
//         return true;
//         } else {
//         return false;
//         }
// };



//number of days in February

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}


//longer: 
// function getFebDays(year) {
//     if(isLeapYear(year)){
//         return 29;
//     }else{
//         return 28;
//     }
// }



generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')


    //number of days in each month:
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    //currentDate
    let currentDate = new Date()
    
    //Checking if the month and year are specified. If they aren't, assing them currents.
    if (!month) month = currentDate.getMonth()
    if (!year) year = currentDate.getFullYear()

    //Creating stings in HTML
    let current_month = `${months[month]}`;
    month_picker.innerHTML = current_month;
    calendar_header_year.innerHTML = year;


    // get first day of month
    
    let first_day = new Date(year, month, 1)

    //loop ot generate divs with days of the month:
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                day.classList.add('current-date')
            }
        }
        calendar_days.appendChild(day)
    }
}


//creating month-list:

let month_list = calendar.querySelector('.month-list')

months.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        current_month.value = index;
        generateCalendar(index, current_year.value);
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

let currentDate = new Date()

let current_month = {value: currentDate.getMonth()}
let current_year = {value: currentDate.getFullYear()}

generateCalendar(current_month.value, current_year.value)

document.querySelector('#prev-year').onclick = () => {
    --current_year.value
    generateCalendar(current_month.value, current_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++current_year.value
    generateCalendar(current_month.value, current_year.value)
}



//toggle button
let retro_mode_toggle = document.querySelector('.toggle')

retro_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('classic');
    document.querySelector('body').classList.toggle('retro');
    let toggleText = retro_mode_toggle.querySelector(".text"); 
    if (toggleText.innerHTML === "Retro Mode"){
        toggleText.innerHTML = "Classic Mode";
    }else{
        toggleText.innerHTML = "Retro Mode";
    }
}