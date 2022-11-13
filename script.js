let firstApi;
let secondApi;
let firstData;
let secondData;

$(document).ready(function(){
    firstApi = `https://v6.exchangerate-api.com/v6/0973a20702a8facb1c0a5ec1/latest/USD`;
    secondApi = `https://v6.exchangerate-api.com/v6/0973a20702a8facb1c0a5ec1/latest/USD`;
    firstBox();
    secondBox();
    // Selected Code Change
    $("#first_keyCode").on("change",function(){
        let firstSelectedcode = $("#first_keyCode option:selected").text();
        firstApi = `https://v6.exchangerate-api.com/v6/0973a20702a8facb1c0a5ec1/latest/${firstSelectedcode}`;
        firstBox();
    })
    $("#second_keyCode").on("change",function(){
        let secondSelectedcode = $("#second_keyCode option:selected").text();
        secondApi = `https://v6.exchangerate-api.com/v6/0973a20702a8facb1c0a5ec1/latest/${secondSelectedcode}`;
        secondBox();
    })
    // Input Value
    $("#firstInput").keyup(function(){
        let secondValue = $("#second_keyCode option:selected").text();
        let result = 
        Number($(this).val()) * Number(firstData.conversion_rates[secondValue] );
        $("#secondInput").val(`${result}`);
    })
    $("#secondInput").keyup(function(){
        let firstValue = $("#first_keyCode option:selected").text();
        let result = Number($(this).val()) * Number(secondData.conversion_rates[firstValue] );
        $("#firstInput").val(`${result}`);
    })
});

function firstBox(){
 fetch(`${firstApi}`)
 .then(res=>res.json())
    .then(data=>{
        firstData = data ;
        $("#first_keyCode").text("");
    for (const key in data.conversion_rates) {
        $("#first_keyCode").append(`<option value="${data.conversion_rates[key]}">${key}</option>`);
    }
 })
}
function secondBox(){
    fetch(`${secondApi}`)
    .then(res=>res.json())
    .then(data=>{
        secondData = data ;
        $("#second_keyCode").text("");
       for (const key in data.conversion_rates) {
        $("#second_keyCode").append(`<option value="${data.conversion_rates[key]}">${key}</option>`);
       }
    })
   }