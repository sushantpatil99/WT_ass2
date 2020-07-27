/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var today;
var reg = [];
var details = {};
var num = 0;
var timestamp;
var name;
var email;
var password;
var cpassword;
var mobile;
var eventtype;
var requirements='';
var otherrequirements;
var eventspace;
var eventdate;
var timeslot;
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
            /*document.getElementById('smess').style.display = 'none';
            document.getElementById('registertable').style.display = 'block';*/
            break;
    }
    document.getElementById(id).style.display= 'block';
    
}

function validateForm()
{
    requirements='';
    today = new Date();
    resetForm();
    name = document.regform.Name.value;
    email = document.regform.Email.value;
    password = document.regform.Password.value;
    cpassword = document.regform.Cpassword.value;
    mobile = document.regform.Mobile.value;
    eventtype = document.regform.Eventtype;
    var cbox1 = document.getElementById('Requirement1').checked;
    var cbox2 = document.getElementById('Requirement2').checked;
    var cbox3 = document.getElementById('Requirement3').checked;
    var cbox4 = document.getElementById('Requirement4').checked;
    otherrequirements = document.regform.Otherrequirements.value;
    eventdate = document.regform.Eventdate.value;
    
    var eventdate1 = eventdate.split('-');
    
    var starttime = document.regform.StartTime.value;
    var starttime1 = starttime.split(':');
    var endtime = document.regform.EndTime.value;
    var endtime1 = endtime.split(':');
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
    else
    {
        eventtype = eventtype.options[eventtype.selectedIndex].text;
    }
    
    if (!(cbox1 || cbox2 || cbox3 || cbox4 ))
    {
        mess = "Select atleast one requirement.";
        check = 1;
        document.getElementById('requirement').innerHTML=mess;
    }
    else
    {
        if (cbox1)
        {
            requirements = document.getElementById('Requirement1').value;
        }
        if (cbox2)
        {
            if (requirements=="")
            {
                requirements = document.getElementById('Requirement2').value;
            }
            else
            {
                requirements = requirements +","+ document.getElementById('Requirement2').value;
            }
        }
        if (cbox3)
        {
            if (requirements=="")
            {
                requirements = document.getElementById('Requirement3').value;
            }
            else
            {
                requirements = requirements +","+ document.getElementById('Requirement3').value;
            }
        }
        if (cbox4)
        {
            if (requirements=="")
            {
                requirements = document.getElementById('Requirement4').value;
            }
            else
            {
                requirements = requirements +","+ document.getElementById('Requirement4').value;
            }
        }
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
    else
    {
        if (document.getElementById('radiooption1').checked)
        {
            eventspace = document.getElementById('radiooption1').value;
        }
        else if (document.getElementById('radiooption2').checked)
        {
            eventspace = document.getElementById('radiooption2').value;
        }
    }
    if (parseInt(eventdate1[0])!= today.getFullYear() ||  parseInt(eventdate1[1])<(today.getMonth+1))
    {
        mess = "Select a valid date.";
        check = 1;
        document.getElementById('eventdate').innerHTML=mess;
    }
    else if ((parseInt(eventdate1[1])== (today.getMonth()+1) && parseInt(eventdate1[2])<(today.getDate()+7)))
    {
        mess = "Event date should be post 1 week from today.";
        check = 1;
        document.getElementById('eventdate').innerHTML=mess;
    }
    if (starttime1=="" || endtime1== "")
    {
        mess = "Select time slot.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    else if (parseInt(starttime1[0])>parseInt(endtime1[0]))
    {
        mess = "Invalid time slot.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    else if (parseInt(starttime1[0])==parseInt(endtime1[0]))
    {
        mess = "Time slot has to be atleast of 1 hour.";
        check = 1;
        document.getElementById('time').innerHTML=mess;
    }
    else
    {
        timeslot = starttime + "-" + endtime;
    }
    if (check===0)
    {
        timestamp = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() + ", " + today.getHours() + ":" + today.getMinutes() +":" + today.getSeconds();
        num = num +1;
        detail={num,timestamp,name,email,password,mobile,eventtype,requirements,otherrequirements,eventspace,eventdate,timeslot};
        reg.push(detail);
        updateTable();
        document.getElementById('rform').reset();
        selectBlock('ShowRegistrations');
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

function updateTable()
{
    
    var tab = document.getElementById('regdata');
    var table =document.getElementById('regdata').getElementsByTagName('tbody')[0];
    
    
        document.getElementById('smess').style.display = 'none';
        document.getElementById('regdata').style.display = 'block';
    
    var row = table.insertRow();
    var c1 = row.insertCell(0);
    var c2 = row.insertCell(1);
    var c3 = row.insertCell(2);
    var c4 = row.insertCell(3);
    var c5 = row.insertCell(4);
    var c6 = row.insertCell(5);
    var c7 = row.insertCell(6);
    var c8 = row.insertCell(7);
    var c9 = row.insertCell(8);
    var c10 = row.insertCell(9);
    var c11= row.insertCell(10);
    c1.innerHTML = num;
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
    resetForm();
}

