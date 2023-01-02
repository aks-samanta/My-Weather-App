

let form=document.querySelector("form");
form.addEventListener("submit",search );


function search(){
    event.preventDefault();
    let city = form.city.value;
   console.log(city)
    if (city==""){
       alert("Enter City to see Weather");
       getLocation()
    }
    else{
        document.querySelector("#temp").innerHTML=null;
        document.querySelector("#extra").innerHTML=null;
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a6673e03852e912bbcdea71e4ce7a92`;
        
       displayWeather(url);
        // console.log(city);
    }

   
}


function displayWeather(url){
    fetch(url)
    .then(function(res){
        // console.log(res)
     return res.json();
       
    })
    .then(function(res){
      
        console.log(res);
        
        
        append(res);
    //    res=res.body.json()
    })
    .catch(function(err){
        console.log(err);
        alert("Not a City");
        getLocation();
    });
 }




    function getLocation() {
        navigator.geolocation.getCurrentPosition(success);
      
        function success(pos) {
          const crd = pos.coords;
      
          
          let lat =crd.latitude;
          let lon=crd.longitude;
            
         let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a6673e03852e912bbcdea71e4ce7a92`;

         displayWeather(url);
        
        }
      }

   window.onload=getLocation();

      
 function append(res){
    
    let icon=document.querySelector("#icon");
    icon.src=`http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    icon.style.height="20vh"
    
   

    document.querySelector("#temp").innerHTML=`Temperature:- ${toCelcius(res.main.temp)} |`;

    let btnc=document.createElement("span");
    btnc.innerText=" °C |";
    
    btnc.style.backgroundColor="transparent";
    btnc.style.border="0px";
    btnc.style.cursor="pointer";
    btnc.style.fontWeight="600";

      btnc.addEventListener("click",function(){

        document.querySelector("#temp").innerHTML=`Temperature:- ${toCelcius(res.main.temp)} | `

        btnf.style.textDecoration=null;
        btnf.style.fontWeight=null;
        btnc.style.textDecoration="underline";
        btnc.style.fontWeight="600";

        div1.innerHTML=`Min Temp:- ${toCelcius(res.main.temp_min-2)}`
        div2.innerHTML=`Max Temp:- ${toCelcius(res.main.temp_max+3)}`

        document.querySelector("#temp").append(btnc,btnf,div1,div2,div3,div4);

    });

    let btnf=document.createElement("span");
    btnf.innerHTML= `|  °F`;

    btnf.style.backgroundColor="transparent"
    btnf.style.border="0px";
    btnf.style.cursor="pointer";

    btnf.addEventListener("click",function(){

        document.querySelector("#temp").innerHTML=`Temperature:- ${toFaren(res.main.temp)} | `

        btnc.style.textDecoration=null;
        btnc.style.fontWeight=null;
        btnf.style.fontWeight="600";
        btnf.style.textDecoration="underline";

    div1.innerHTML=`Min Temp:- ${toFaren(res.main.temp_min-2)}`
    div2.innerHTML=`Max Temp:- ${toFaren(res.main.temp_max+3)}`

    document.querySelector("#temp").append(btnc,btnf,div1,div2,div3,div4);

  })

    let div1=document.createElement("div");
    div1.innerHTML=`Min Temp:- ${toCelcius(res.main.temp_min-2)}`;

    let div2=document.createElement("div");
    div2.innerHTML=`Max Temp:- ${toCelcius(res.main.temp_max+3)}`;


    // var sec = ;
    var daterise = new Date(res.sys.sunrise * 1000);
    var timerise = daterise.toLocaleTimeString();
    let div3=document.createElement("div");
    div3.innerHTML=`Sunrise:- ${timerise}`

    var dateset = new Date(res.sys.sunset * 1000);
    var timeset = dateset.toLocaleTimeString();
    let div4=document.createElement("div");
    div4.innerHTML=`Sunset:- ${timeset}`;
    
    
   

    let p1=document.createElement("p").innerHTML=`${res.weather[0].main}` ;
  let date= new Date(res.dt*1000);
    let divdate=document.createElement("div");
    divdate.innerHTML=date
    let p2=document.createElement("p").innerHTML=`| Wind Speed:- ${res.wind.speed} Km/hr \n`;

    let p3=document.createElement("p");
    p3.innerHTML=`Humidity:- ${res.main.humidity} %`
    document.querySelector("#extra").innerHTML=null;
    document.querySelector("#extra").append(divdate,p2,p3,p1);
    let br=document.createElement("br");

  
    let mapurl=`https://maps.google.com/maps?q=${res.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    let iframe= document.querySelector("#gmap_canvas");
    iframe.src=mapurl;
    document.querySelector("#temp").append(btnc,btnf,br,div1,div2,div3,div4);
    
}

function toCelcius(x){
   return Math.floor(x-273);
}
function toFaren(x){
   return Math.floor(Math.floor(x-273.5)*9/5)+32;
}


// let lat=res.coord.lat
//         let lon=res.coord.lon
        // let url=`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=5a6673e03852e912bbcdea71e4ce7a92`;
        // fetch(url)
        // .then(function(resp){
        //     // console.log(res);
        //     return resp.json();
        // })
        // .then(function(res){
        //     // nextdays(res);
           
        //     console.log(res);
        // })
        // .catch(function(err){
        //     console.log(err);
        // })



// src="https://maps.google.com/maps?q=singrauli&t=&z=13&ie=UTF8&iwloc=&output=embed"