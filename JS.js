/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var today;
var reg = [];
var details = {};
var no = 0;
var timestamp;
function selectBlock(id)
{
    var home = document.getElementById('Home');
    var register = document.getElementById('Register');
    var Sregister = document.getElementById('ShowRegistrations');
    
    home.style.display='none';
    register.style.display='none';
    Sregister.style.display='none';
    
    var homebutton = document.getElementById('HomeButton');
    var registerbutton = document.getElementById('RegisterButton');
    var Sregisterbutton = document.getElementById('SRegisterButton');
   
    homebutton.style.backgroundColor= "#F4F6F7";
    registerbutton.style.backgroundColor= "#F4F6F7";
    Sregisterbutton.style.backgroundColor= "#F4F6F7";
    switch (id)
    {
        case "Home":
            homebutton.style.backgroundColor= "#BDC3C7";
            break;
            
        case "Register":
            registerbutton.style.backgroundColor= "#BDC3C7";
            break;
            
        case "ShowRegistrations":
            Sregisterbutton.style.backgroundColor= "#BDC3C7";
            break;
    }
    document.getElementById(id).style.display= 'block';
    
}

function validateForm()
{
    var today = new Date();
    resetForm();
    var name = document.regform.Name.value;
    var email = document.regform.Email.value;
    var password = document.regform.Password.value;
    var cpassword = document.regform.Cpassword.value;
    var mobile = document.regform.Mobile.value;
    var eventtype = document.regform.Eventtype;
    var cbox1 = document.getElementById('Requirement1').checked;
    var cbox2 = document.getElementById('Requirement2').checked;
    var cbox3 = document.getElementById('Requirement3').checked;
    var cbox4 = document.getElementById('Requirement4').checked;
    var otherrequirements = document.regform.Otherrequirements.value;
    var eventdate = document.regform.Eventdate.value;
    
    eventdate = eventdate.split('-');
    
    var starttime = document.regform.StartTime.value;
    starttime = starttime.split(':');
    var endtime = document.regform.EndTime.value;
    endtime = endtime.split(':');
    var check = 0;
    var mess="";
    var emailregexp = /^\w+([\.]?\w+)*@\w+([\.]?\w+)*(\.\w{2,5})+$/;
    var passregexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var mobregexp = /^(\+91-|\+91|0)?[6-9]\d{9}$/;
    if (name==="")
    {
        mess = "Name cannot be empty.";
        check =1;
        document.getElementById('name').innerHTML=mess;
    }
    else if (name.search(/[^a-zA-Z\s]/)>-1)
    {
        mess = "Name should contain only alphabets.";
        check=1;
        document.getElementById('name').innerHTML=mess;
    }
    else if (name.length<3 || name.length>30)
    {
        mess = "Name should contain 3-30 characters.";
        check=1;
        document.getElementById('name').innerHTML=mess;
    }
    
    if (email=="")
    {
        mess = "Email cannot be empty.";
        check = 1;
        document.getElementById('email').innerHTML=mess;
    }
    else if (emailregexp.test(email)==false)
    {
        mess = "Email is invalid.";
        check = 1;
        document.getElementById('email').innerHTML=mess;
    }
    
    if (password == "")
    {
        mess = "Password cannot be empty.";
        check = 1;
        document.getElementById('password').innerHTML=mess;
    }
    else if (passregexp.test(password)==false)
    {
        mess = "Password is invalid.";
        check = 1;
        document.getElementById('password').innerHTML=mess;
    }
    else if (cpassword!=password)
    {
        mess = "Confirm Password should match with Password.";
        check = 1;
        document.getElementById('cpassword').innerHTML=mess;
    }
    
    if (mobile=="")
    {
        mess = "Contact number cannot be empty.";
        check = 1;
        document.getElementById('mobile').innerHTML=mess;
    }
    else if (mobregexp.test(mobile)==false)
    {
        mess = "Contact number is invalid.";
        check = 1;
        document.getElementById('mobile').innerHTML=mess;
    }
    
    if (eventtype.selectedIndex==0)
    {
        mess = "Select any one event type.";
        check = 1;
        document.getElementById('eventtype').innerHTML=mess;
    }
    
    if (!(cbox1 || cbox2 || cbox3 || cbox4 ))
    {
        mess = "Select atleast one requirement.";
        check = 1;
        document.getElementById('requirement').innerHTML=mess;
    }
    
    if (otherrequirements.length>100)
    {
        mess = "Chracter limit exceeded.";
        check = 1;
        document.getElementById('otherrequirements').innerHTML=mess;
    }
    
    if (!(document.getElementById('radiooption1').checked || document.getElementById('radiooption2').checked))
    {
        mess = "Select any one option.";
        check = 1;
        document.getElementById('eventspace').innerHTML=mess;
    }
    if (parseInt(eventdate[0])!= today.getFullYear() ||  parseInt(eventdate[1])<(today.getMonth+1))
    {
        mess = "Select a valid date.";
        check = 1;
        document.getElementById('eventdate').innerHTML=mess;
    }
    else if ((parseInt(eventdate[1])== (today.getMonth()+1) && parseInt(eventdate[2])<(today.getDate()+7)))
    {
        mess = "Event date should be post 1 week from today.";
        check = 1;
        document.getElementById('eventdate').innerHTML=mess;
    }
    if (starttime=="" || endtime== "")
    {
        mess = "Select time slot.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    else if (parseInt(starttime[0])>parseInt(endtime[0]))
    {
        mess = "Invalid time slot.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    else if (parseInt(starttime[0])==parseInt(endtime[0]))
    {
        mess = "Time slot has to be atleast of 1 hour.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    if (check==0)
    {
        timestamp = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() + ", " + today.getHours() + ":" + today.getMinutes() +":" + today.getSeconds();
        updateTable();
        return true;
    }
    return false;
}

function resetForm()
{
    document.getElementById('name').innerHTML="";
    document.getElementById('email').innerHTML="";
    document.getElementById('password').innerHTML="";
    document.getElementById('cpassword').innerHTML="";
    document.getElementById('mobile').innerHTML="";
    document.getElementById('eventtype').innerHTML="";
    document.getElementById('requirement').innerHTML="";
    document.getElementById('otherrequirements').innerHTML="";
    document.getElementById('eventspace').innerHTML="";
    document.getElementById('eventdate').innerHTML="";
    document.getElementById('time').innerHTML="";
}
updateTable();
function updateTable()
{
    var name = document.regform.Name.value;
    var email = document.regform.Email.value;
    var password = document.regform.Password.value;
    var cpassword = document.regform.Cpassword.value;
    var mobile = document.regform.Mobile.value; 
    var eventtype = document.regform.Eventtype;
    eventtype = eventtype.options[eventtype.selectedIndex].text;
    var requirements="";
    if (document.getElementById('Requirement1').checked)
    {
        requirements= requirements + document.regform.Requirement1.value;
    }
    if (document.getElementById('Requirement2').checked)
    {
        requirements= requirements +"," +document.regform.Requirement2.value;
    }
    if (document.getElementById('Requirement3').checked)
    {
        requirements= requirements +"," +document.regform.Requirement3.value;
    }
    var otherrequirements = document.regform.Otherrequirements.value;
    if (otherrequirements == "")
    {
        otherrequirements = "No other requirements.";
    }
    var eventspace;
    if (document.getElementById('radiooption1').checked)
    {
        eventspace = document.getElementById('radiooption1').value;
    }
    else if (document.getElementById('radiooption2').checked)
    {
        eventspace = document.getElementById('radiooption2').value;
    }
    
    var eventdate = document.regform.Eventdate.value;
    
    eventdate = eventdate.split('-');
    eventdate = eventdate[2] + "/" + eventdate[1] + "/" + eventdate[0];
    
    var starttime = document.regform.StartTime.value;
    var endtime = document.regform.EndTime.value;
    var timeslot = starttime + " - " + endtime;
    no= no+1;
    if (no>0)
    {
        document.getElementById('smess').style.visibility = 'hidden';
        document.getElementById('registertable').style.visibility = 'visible';
    }
    detail ={no,timestamp,name,email,password,mobile,eventtype,requirements,otherrequirements,eventspace,eventdate,timeslot};
    reg.push(detail);
    var tab = document.getElementById('regdata');
    var table =document.getElementById('regdata').getElementsByTagName('tbody')[0];
    var row = table.insertRow();
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    var c3 = row.insertCell(2);
    var c4 = row.insertCell(3)
    var c5 = row.insertCell(4);
    var c6 = row.insertCell(5);
    var c7 = row.insertCell(6);
    var c8 = row.insertCell(7);
    var c9 = row.insertCell(8);
    var c10 = row.insertCell(9);
    var c11= row.insertCell(10);
    c1.innerHTML = no;
    c2.innerHTML = timestamp;
    c3.innerHTML = name;
    c4.innerHTML = email;
    c5.innerHTML = mobile;
    c6.innerHTML = eventtype;
    c7.innerHTML = requirements;
    c8.innerHTML = otherrequirements;
    c9.innerHTML = eventspace;
    c10.innerHTML = eventdate;
    c11.innerHTML = timeslot;
    /*if (no==0)
    {
        var body= document.getElementById('registertable')[0];
        var tbl = document.createElement("table");;
        var tblBody =  document.createElement("tbody");
        var tblhead =  document.createElement("thead");
        var tblrow =   document.createElement("tr");
        var tbldata1 = document.createElement("th");
        tbldata1.appendChild('Sr. No');
        tblrow.appendChild(tbldata1);
        var tbldata2 = document.createElement("th");
        tbldata2.appendChild('Timestamp');
        tblrow.appendChild(tbldata2);
        var tbldata3 = document.createElement("th");
        tbldata3.appendChild('Name');
        tblrow.appendChild(tbldata3);
        var tbldata4 = document.createElement("th");
        tbldata4.appendChild('Email id');
        tblrow.appendChild(tbldata4);
        var tbldata5 = document.createElement("th");
        tbldata5.appendChild('Contact No');
        tblrow.appendChild(tbldata5);
        var tbldata6 = document.createElement("th");
        tbldata6.appendChild('Event type');
        tblrow.appendChild(tbldata6);
        var tbldata7 = document.createElement("th");
        tbldata7.appendChild('Requirement/s');
        tblrow.appendChild(tbldata7);
        var tbldata8 = document.createElement("th");
        tbldata8.appendChild('Other requirement/s');
        tblrow.appendChild(tbldata8);
        var tbldata9 = document.createElement("th");
        tbldata9.appendChild('Event space');
        tblrow.appendChild(tbldata9);
        var tbldata10 = document.createElement("th");
        tbldata10.appendChild('Event date');
        tblrow.appendChild(tbldata10);
        var tbldata11 = document.createElement("th");
        tbldata11.appendChild('Time-slot');
        tblrow.appendChild(tbldata11);
        tblhead.appendChild(tblrow);
        tblBody.appendChild(tblhead);
        tbl.appendchild(tblBody);
        body.appendChild(tbl);
        
        tblrow =   document.createElement("tr");
        tbldata1 = document.createElement("td");
        tbldata1.appendChild(no+1);
        tblrow.appendChild(tbldata1);
        tbldata2 = document.createElement("td");
        tbldata2.appendChild(timestamp);
        tblrow.appendChild(tbldata2);
        tbldata3 = document.createElement("td");
        tbldata3.appendChild(name);
        tblrow.appendChild(tbldata3);
        tbldata4 = document.createElement("td");
        tbldata4.appendChild(email);
        tblrow.appendChild(tbldata4);
        tbldata5 = document.createElement("td");
        tbldata5.appendChild(mobile);
        tblrow.appendChild(tbldata5);
        tbldata6 = document.createElement("td");
        tbldata6.appendChild(eventtype);
        tblrow.appendChild(tbldata6);
        tbldata7 = document.createElement("td");
        tbldata7.appendChild(requirements);
        tblrow.appendChild(tbldata7);
        tbldata8 = document.createElement("td");
        tbldata8.appendChild(otherrequirements);
        tblrow.appendChild(tbldata8);
        tbldata9 = document.createElement("td");
        tbldata9.appendChild(eventspace);
        tblrow.appendChild(tbldata9);
        tbldata10 = document.createElement("td");
        tbldata10.appendChild(eventdate);
        tblrow.appendChild(tbldata10);
        tbldata11 = document.createElement("td");
        tbldata11.appendChild(timeslot);
        tblrow.appendChild(tbldata11);
        tblhead.appendChild(tblrow);
        tblBody.appendChild(tblhead);
        tbl.appendchild(tblBody);
        body.appendChild(tbl);
        no=no + 1;
        detail = {no,timestamp,name,email,password,mobile,eventtype,requirements,otherrequirements,eventspace,eventdate,timeslot};
        reg.push(detail);
        detail={};
    }
    else
    {
        tblrow =   document.createElement("tr");
        tbldata1 = document.createElement("td");
        tbldata1.appendChild(no+1);
        tblrow.appendChild(tbldata1);
        tbldata2 = document.createElement("td");
        tbldata2.appendChild(timestamp);
        tblrow.appendChild(tbldata2);
        tbldata3 = document.createElement("td");
        tbldata3.appendChild(name);
        tblrow.appendChild(tbldata3);
        tbldata4 = document.createElement("td");
        tbldata4.appendChild(email);
        tblrow.appendChild(tbldata4);
        tbldata5 = document.createElement("td");
        tbldata5.appendChild(mobile);
        tblrow.appendChild(tbldata5);
        tbldata6 = document.createElement("td");
        tbldata6.appendChild(eventtype);
        tblrow.appendChild(tbldata6);
        tbldata7 = document.createElement("td");
        tbldata7.appendChild(requirements);
        tblrow.appendChild(tbldata7);
        tbldata8 = document.createElement("td");
        tbldata8.appendChild(otherrequirements);
        tblrow.appendChild(tbldata8);
        tbldata9 = document.createElement("td");
        tbldata9.appendChild(eventspace);
        tblrow.appendChild(tbldata9);
        tbldata10 = document.createElement("td");
        tbldata10.appendChild(eventdate);
        tblrow.appendChild(tbldata10);
        tbldata11 = document.createElement("td");
        tbldata11.appendChild(timeslot);
        tblrow.appendChild(tbldata11);
        tblhead.appendChild(tblrow);
        tblBody.appendChild(tblhead);
        tbl.appendchild(tblBody);
        body.appendChild(tbl);
        no=no + 1;
        detail = {no,timestamp,name,email,password,mobile,eventtype,requirements,otherrequirements,eventspace,eventdate,timeslot};
        reg.push(detail);
        detail={};
    }*/
    resetForm();
}

