import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component{

  state ={
    todayDate: '',
    response: 0,
    holiday: [],
    upcomingHolidays: [],
    passedHolidays: []
  };

  componentDidMount(){
    // console.log("component did mount");
    fetch("https://calendarific.com/api/v2/holidays?country=IN&year=2019&api_key=2b1fb94d06bf4d4659b4de58c2c66e87751d53a4", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        var passedHolidays =[];
        var holiday =[];
        var upcomingHolidays =[];
        const respCode=data.meta.code;
        const holidayArray = data.response.holidays;
        console.log(holidayArray[0]);
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        holidayArray.forEach(element => {
          // console.log(element.date.datetime.month);
          if(month<element.date.datetime.month){
            passedHolidays.push(element);
          }
          if(month === element.date.datetime.month)
          {
            if(date<element.date.datetime.day)
            {
              passedHolidays.push(element);
            }
            if(date === element.date.datetime.day)
            {
              holiday.push(element);
            }
            if(date>element.date.datetime.day)
            {
              upcomingHolidays.push(element);
            }
          }
          if(month > element.date.datetime.month)
          {
            upcomingHolidays.push(element);
          }
          
        });
        
        this.setState({
          response: respCode,
          todayDate: date + '/' + month + '/' + year,
          holiday : holiday,
          passedHolidays:passedHolidays,
          upcomingHolidays:upcomingHolidays
        });
      });
  }

  render(){

    const arr1 = this.state.passedHolidays.map( item => {
      return <li>{item.date.datetime.day + " " + item.date.datetime.month}</li>
    });
    const arr2 = this.state.upcomingHolidays.map( item => {
      return <li>{item.date.datetime.day + " " + item.date.datetime.month}</li>
    });
    if(this.state.holiday.length === 0)
    {

    }
    return(          
      <div>
        <div>
          {/* Holiday Status:: */}
          
        </div>
        <div>
          {/* Two button area */}
          <button>Upcoming Holidays</button>
          <button>Passed Holidays</button>
        </div>
        <div>
          {/* Date list block */}
          <h3>date list block division</h3>
        </div>
      </div>
    );
  }
}

export default App;
