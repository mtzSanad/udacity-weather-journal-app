/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=4cfc4dcdb8fcb2a99a1a30a3cbe67a22&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//Sending request
const postData = async (url = "", zip, apiKey) => {
  const response = await fetch(url + zip + apiKey);

  try {
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.error("error", e);
  }
};

//Creating event listener for button
//Selecting button element
const generateBtn = document.querySelector("#generate");

//Adding on click event listener
generateBtn.addEventListener("click", async () => {
  //Surrounding the block of code in a try catch
  try {
    //Getting the content data
    const content = document.querySelector("#feelings").value;

    //Getting zip code data
    const zip = document.querySelector("#zip").value;

    //Calling the api to get weather data
    const data = await postData(baseUrl, zip, apiKey);
    const temp = data.main.temp;

    //Constructing the object data that will be sent to the server
    //Hint: new object short object syntax is used
    const projectData = {
      temp,
      date: newDate,
      content,
    };

    //Sending the data to the server using post method
    const response = await fetch("/addData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    //These are the data that is coming from post but we will not use it we will use the one getting from get request
    const serverData = await response.json();

    //Calling get request to get data
    const getResponse = await fetch("/getData");
    //Here we are having the object data
    const allData = await getResponse.json();
    console.log(allData);
    //Populating html with the data
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.error(error);
  }
});
