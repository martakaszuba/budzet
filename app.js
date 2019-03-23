

var monthDOM = document.querySelector("#month");
var yearDOM = document.querySelector("#getYear");
var date = new Date();
var numbermonth = date.getMonth();
var fullYear = date.getFullYear();
var arrmonths =["Styczeń","Luty","Marzec","Kwiecień", "Maj", "Czerwiec","Lipiec","Sierpień",
"Wrzesień", "Październik","Listopad","Grudzień"];
var month = arrmonths[numbermonth];
monthDOM.innerHTML = month+" ";
yearDOM.innerHTML = fullYear+" :";
var selectday = document.querySelector("#day");

var objdays = {
Styczeń: 31,
Luty:28,
Marzec:31,
Kwiecień:30,
Maj:31,
Czerwiec:30,
Lipiec:31,
Sierpień:31,
Wrzesień:30,
Październik:31,
Listopad:30,
Grudzień:31
};

for (var i=1; i<=objdays[month]; i++)
{
var option= document.createElement("option");
option.innerHTML = i;
selectday.appendChild(option);
}
var err = document.querySelector("#error");
var divIncome = document.querySelector("#divIncome");
var divExp =document.querySelector("#divExpenses");
var btn = document.querySelector("#btn");
var budgetValue = document.querySelector("#budgetValue");
var incomearr = JSON.parse(localStorage.getItem("incomearr")) || [];
var exparr = JSON.parse(localStorage.getItem("exparr")) || [];
var budgetDOM = JSON.parse(localStorage.getItem("budgetStorage")) || 0;
var incvar = JSON.parse(localStorage.getItem("incomeStorage")) || 0;
var expvar = JSON.parse(localStorage.getItem("expStorage")) || 0;

document.addEventListener("DOMContentLoaded", function(){
budgetValue.innerHTML = budgetDOM;
document.querySelector("#incomespan").innerHTML = incvar;
document.querySelector("#expensesspan").innerHTML = expvar;
if (incomearr.length >0)
{
incomearr.forEach(function(val)
{
	var div = document.createElement("div");
	div.className="divclassnew";
	div.id = val.id;
div.innerHTML =`
<p class="left">${val.day +" "+month} &nbsp;- &nbsp;${val.desc}<p>
<p class="right"><b>${val.price} zł</b>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></p>
`
divIncome.appendChild(div);
})
}

if (exparr.length >0)
{
exparr.forEach(function(val)
{
	var div2 = document.createElement("div");
	div2.className="divclassnew";
	div2.id = val.id;
div2.innerHTML =`
<p class="left">${val.day +" "+month} &nbsp;- &nbsp;${val.desc}<p>
<p class="right"><b>${val.price} zł</b>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></p>
`
divExp.appendChild(div2);
})
}
})

function randomId(){
var alpha ="abcdefghijklmnopqrstuvwxyz";
var str ="";
while (str.length<4)
{
var rand = Math.floor(Math.random()*alpha.length);
str +=alpha[rand];	
}
return str;
}

btn.addEventListener("click", function(){
var day = document.querySelector("#day").value;
var incorexp = document.querySelector("#incomeorexp").value;
var desc = document.querySelector("#description").value.trim("");
var numval = document.querySelector("#numbervalue").value;
if (day === "Dzień" || day === "")
{
err.innerHTML = "Wybierz dzień !";
}
else if (desc.length === 0)
{
err.innerHTML ="Wpisz opis !";	
}
else if (desc.length>30)
{
err.innerHTML ="Wpisz krótszy opis !";	
}
else if(Number(numval) <=0)
{
err.innerHTML ="Wpisz prawidłową liczbę!";	
}

else {
err.innerHTML="";
if (incorexp ==="Dochód")
{
	var div = document.createElement("div");
	div.className="divclassnew"
	div.id = randomId();
div.innerHTML =`
<p class="left">${day +" "+month} &nbsp;- &nbsp;${desc}<p>
<p class="right"><b>${numval} zł</b>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></p>
`
var obj ={
id:div.id,
day:day,
desc:desc,
price:numval
};

incomearr.push(obj);
localStorage.setItem("incomearr", JSON.stringify(incomearr));
divIncome.appendChild(div);
var currentInc = Number(numval);
incvar = Number((incvar + currentInc).toFixed(2));
document.querySelector("#description").value="";
document.querySelector("#numbervalue").value ="";
document.querySelector("#incomespan").innerHTML = incvar +" ";
budgetDOM = Number((budgetDOM + currentInc).toFixed(2));
budgetValue.innerHTML = budgetDOM;
localStorage.setItem("budgetStorage", budgetDOM);
localStorage.setItem("incomeStorage", incvar);
document.querySelector("#day").value="Dzień";
}

else {
	var div2 = document.createElement("div");
	div2.className="divclassnew";
	div2.id = randomId();
div2.innerHTML =`
<p class="left">${day +" "+month} &nbsp;- &nbsp;${desc}<p>
	<p class="right"><b>${numval} zł</b>&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></p>
`
var obj2 ={
id:div2.id,
day:day,
desc:desc,
price:numval
};

exparr.push(obj2);
localStorage.setItem("exparr", JSON.stringify(exparr));
divExp.appendChild(div2);
var currentExp = Number(numval);
expvar = Number((expvar + currentExp).toFixed(2));
budgetDOM = Number((budgetDOM - currentExp).toFixed(2));
document.querySelector("#description").value="";
document.querySelector("#numbervalue").value ="";
document.querySelector("#expensesspan").innerHTML = expvar+" ";
budgetValue.innerHTML = budgetDOM;
localStorage.setItem("budgetStorage", budgetDOM);
localStorage.setItem("expStorage", expvar);
document.querySelector("#day").value="Dzień";
}
}
});

var bottom = document.querySelector("#bottom");
bottom.addEventListener("click", function(e){
	if(e.target.tagName ==="I"){
		var num =e.target.parentNode.querySelector("b").innerHTML.match(/[0-9]|\./g).join("");
		num = Number(num);
		if (e.target.parentNode.parentNode.parentNode.id === "divIncome"){
			incvar = Number((incvar - num).toFixed(2));
			document.querySelector("#incomespan").innerHTML = incvar +" ";
			budgetDOM = Number((budgetDOM - num).toFixed(2));
			budgetValue.innerHTML = budgetDOM;
			localStorage.setItem("budgetStorage", budgetDOM);
			localStorage.setItem("incomeStorage", incvar);
			var currentID = e.target.parentNode.parentNode.id;
			incomearr.forEach(function(val,index){

				if (val.id === currentID)
				{
				incomearr.splice(index,1);	
				}

			})
			localStorage.setItem("incomearr", JSON.stringify(incomearr));
			e.target.parentNode.parentNode.remove();
		}

		else {
			expvar = Number((expvar - num).toFixed(2));
			document.querySelector("#expensesspan").innerHTML = expvar+" ";
			budgetDOM = Number((budgetDOM + num).toFixed(2));
			budgetValue.innerHTML = budgetDOM;
			localStorage.setItem("budgetStorage", budgetDOM);
			localStorage.setItem("expStorage", expvar);
			var currentID = e.target.parentNode.parentNode.id;
			exparr.forEach(function(val,index){
				if (val.id === currentID)
				{
				exparr.splice(index,1);	
				}

			})
			localStorage.setItem("exparr", JSON.stringify(exparr));
			e.target.parentNode.parentNode.remove();
		}
	}
})