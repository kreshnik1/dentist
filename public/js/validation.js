$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function isANumber(str){
  return !/\D/.test(str);
}

if(document.querySelector(".registerButton")){
    let registerButton = document.querySelector(".registerButton");

    document.querySelector("input[name='password']").addEventListener('keyup', function (event) {
        if(document.querySelector("input[name='password']").value.length<6){
            document.querySelector("input[name='password']").setAttribute("class","form-control  is-invalid")
            registerButton.disabled = true;
        }
        else{
            document.querySelector("input[name='password']").setAttribute("class","form-control is-valid ")
            if(document.querySelector("input[name='password']").value.length>5 && document.querySelector("input[name='repassword']").value.length>5){
                registerButton.disabled = false;
            }
        }
    });
     document.querySelector("input[name='repassword']").addEventListener('keyup', function (event) {
        if(document.querySelector("input[name='repassword']").value.length<6){
            document.querySelector("input[name='repassword']").setAttribute("class","form-control  is-invalid")
            registerButton.disabled = true;
        }
        else{
            document.querySelector("input[name='repassword']").setAttribute("class","form-control is-valid ")
            if(document.querySelector("input[name='password']").value.length>5 && document.querySelector("input[name='repassword']").value.length>5){
                registerButton.disabled = false;
            }
        }
    });
     registerButton.addEventListener("click",function(event){
         if(document.querySelector("input[name='password']").value !== document.querySelector("input[name='repassword']").value){
             event.preventDefault();
             document.querySelector("input[name='repassword']").setAttribute("class","form-control  is-invalid")
             document.querySelector(".doesnt_match").innerHTML = "Password and repassword don't match , please try again";
         }

     })
}

if(document.querySelector(".createPatient")){
    let createPatient = document.querySelector(".createPatient");

   document.querySelector("input[name='endTime']").addEventListener('keyup', function (event) {
     if(Date.parse("01/01/2011 "+document.querySelector("input[name='startTime']").value) > Date.parse("01/01/2011 "+document.querySelector("input[name='endTime']").value) || Date.parse("01/01/2011 "+document.querySelector("input[name='startTime']").value) === Date.parse("01/01/2011 "+document.querySelector("input[name='endTime']").value) ) {
       console.log("Jo"+document.querySelector("input[name='startTime']").value)
        document.querySelector(".createPatient").disabled=true;
     } else {
        console.log("Po"+document.querySelector("input[name='endTime']").value)
        document.querySelector(".createPatient").disabled=false;
     }
  });
    createPatient.addEventListener("click",function(event){
      console.log("Heyy")
      if(document.querySelector("input[name='amza']").value.length ===0){
      }
      else if(document.querySelector("input[name='amza']").value.length !== 13 || !isANumber(document.querySelector("input[name='amza']").value)){
        document.querySelector("input[name='amza']").setAttribute("class","form-control  is-invalid")
        document.querySelector("input[name='amza']").focus();
        document.querySelector(".invalid-feedback").innerHTML="Numri i amzes eshte gabim , duhet te ket vetem 13 numra , provoje perseri "
        event.preventDefault();
      }
    })
}

if(document.querySelector(".nrAmzesButt")){
  let nrAmzesB = document.querySelector(".nrAmzesButt");
  nrAmzesB.addEventListener("click",function(event){
    if(document.querySelector("input[name='nrAmza']").value.length ===0){
    }
    if(document.querySelector("input[name='nrAmza']").value.length !== 13 || !isANumber(document.querySelector("input[name='nrAmza']").value)){
      document.querySelector("input[name='nrAmza']").setAttribute("class","form-control  is-invalid")
      document.querySelector("input[name='nrAmza']").focus();
      document.querySelector(".invalid-feedback").innerHTML="Numri i amzes eshte gabim , duhet te ket vetem 13 numra , provoje perseri "
      event.preventDefault();
    }
  })
}

if(document.querySelector(".updatePacient")){

  let updatePacient = document.querySelector(".updatePacient");
  updatePacient.addEventListener("click",function(event){
    if(document.querySelector("input[name='nrAmzes']").value.length ===0){
    }
    else if(document.querySelector("input[name='nrAmzes']").value.length !== 13 ||  !isANumber(document.querySelector("input[name='nrAmzes']").value)){
      document.querySelector("input[name='nrAmzes']").setAttribute("class","form-control  is-invalid");
        document.querySelector("input[name='nrAmzes']").focus();
      document.querySelector(".invalid-feedback").innerHTML="Numri i amzes eshte gabim , duhet te ket vetem 13 numra , provoje perseri "
      document.querySelector(".invalid-feedback").style.display="block";
      event.preventDefault();
    }
  })
}

if(document.querySelector(".navbar-toggler")){
 if($('.navbar-toggler').is(':visible'))
        {
          if(document.querySelector(".calendar_card")){
            document.querySelector(".calendar_card").classList.remove("animated");
            document.querySelector(".calendar_card").classList.remove("fadeInLeft");
            document.querySelector(".todaysInfo").classList.remove("animated");
            document.querySelector(".todaysInfo").classList.remove("fadeInRight");
          }

            var menus = document.querySelectorAll(".menus");
            menus.forEach(function(i){
                 i.style.display="flex";
            })

            var buttons = document.querySelectorAll(".buttonnone")
            buttons.forEach(function(i){
                i.style.display="none";
            })
            document.querySelector(".navbar-brand").style.background="#343a40";
        }
    else{

        var menus = document.querySelectorAll(".menus");
            menus.forEach(function(i){
                 i.style.display="none";
            })
        var buttons = document.querySelectorAll(".buttonnone")
        buttons.forEach(function(i){
            i.style.display="flex";
        })
        document.querySelector(".navbar-brand").style.background="rgba(0, 0, 0, .25)";
    }
}
var interval = setInterval(myTimer,2000);

function myTimer() {

	if(document.querySelector(".mesazh")!=null){
		let element = document.getElementById("alert");
		element.parentNode.removeChild(element);
		clearInterval(interval);
	}
}

feather.replace()

if(document.querySelector("#hidden")){
	var csurf = document.querySelector("#hidden").innerHTML;
	var elements = document.querySelectorAll(".csrf");
	elements.forEach(function(i) {
        i.setAttribute("value", csurf);
	});
}

if(document.querySelector(".loading_click")){
  document.querySelector(".loading_click").addEventListener('click',function(){
    document.querySelector("#hidden_loading").id="loading";
  })
}
if(document.querySelector(".passwordButton")){
    let passwordButton = document.querySelector(".passwordButton");
    let oldpassword = document.querySelector(" input[name='oldpassword']")
    let newpassword = document.querySelector("input[name='newpassword']")
    let repassword = document.querySelector(" input[name='repassword']")
    oldpassword.addEventListener('keyup', function (event) {
        if(oldpassword.value.length<6){
            oldpassword.setAttribute("class","form-control is-invalid")
            passwordButton.disabled = true;
        }
        else{
            oldpassword.setAttribute("class","form-control is-valid")
            if(oldpassword.value.length>5 && newpassword.value.length>5 && repassword.value.length>5){
                passwordButton.disabled = false;
            }
        }
    })
    newpassword.addEventListener('keyup', function (event) {
        if(newpassword.value.length<6){
            newpassword.setAttribute("class","form-control is-invalid")
            passwordButton.disabled = true;
        }
        else{
            newpassword.setAttribute("class","form-control is-valid")
            if(oldpassword.value.length>5 && newpassword.value.length>5 && repassword.value.length>5){
                passwordButton.disabled = false;
            }
        }
    })
    repassword.addEventListener('keyup', function (event) {
        if(repassword.value.length<6){
            repassword.setAttribute("class","form-control is-invalid")
            passwordButton.disabled = true;
        }
        else {
            repassword.setAttribute("class","form-control is-valid")
            if(oldpassword.value.length>5 && newpassword.value.length>5 && repassword.value.length>5){
                passwordButton.disabled = false;
            }
        }
    })
    passwordButton.addEventListener("click",function(event){
        if(newpassword.value!==repassword.value){
            event.preventDefault();
            repassword.setAttribute("class","form-control is-invalid")
            document.querySelector(".repassword_feedback").innerHTML="Fjalëkalimi dhe ri-fjalëkalimi i ri nuk përputhen";
        }
        else{
            document.querySelector("#hidden_loading").id="loading";
        }
    })
};

if(document.querySelector(".answerButton")){
    answerButton = document.querySelector(".answerButton");
    answerButton.addEventListener("click",function(event){
        if(tinymce.activeEditor.getContent({format: 'text'}).length<29){
            event.preventDefault();
            document.querySelector("#passwordHelpBlock").setAttribute("class","form-text text-muted red_color");
        }
        else{
            document.querySelector("#hidden_loading").id="loading";
        }
    })
}
if(document.querySelector(".delete_button")){
    delete_buttons = document.querySelectorAll(".delete_button");
    delete_buttons.forEach(function(i){
        i.addEventListener("click",function(event){
            document.querySelector("#hidden_loading").id="loading";
            i.addEventListener("click",function(event){
                event.preventDefault();
            })
        })
    })
}

if(document.querySelector(".navbar-toggler")){
    setInterval(function(){
    if($('.navbar-toggler').is(':visible'))
        {
            var menus = document.querySelectorAll(".menus");
            menus.forEach(function(i){
                 i.style.display="flex";
            })

            var buttons = document.querySelectorAll(".buttonnone")
            buttons.forEach(function(i){
                i.style.display="none";
            })
            document.querySelector(".navbar-brand").style.background="#343a40";
        }
    else{
        var menus = document.querySelectorAll(".menus");
            menus.forEach(function(i){
                 i.style.display="none";
            })
        var buttons = document.querySelectorAll(".buttonnone")
        buttons.forEach(function(i){
            i.style.display="flex";
        })
        document.querySelector(".navbar-brand").style.background="rgba(0, 0, 0, .25)";
    }
    },0.1)
}

let color1 = '#ffa4a2';


if(document.querySelector(".proteza")){
  let pjesa_siper1 = document.querySelector(".mr-auto").getAttribute('id');
  let pjesa_e_dhembeve1 = pjesa_siper1.split('-');
  for(let i=11 ; i <= 18 ; i++){
    if(i>pjesa_e_dhembeve1[0]){
      $('.tooth-'+i).mouseover(function(){
        $('.tooth-'+i+'-parent').css('fill', color1);
      });
      $('.tooth-'+i).mouseleave(function(){
        $('.tooth-'+i+'-parent').css('fill', 'none');
      });
    }
  }
  for(let i=21 ; i <= 28 ; i++){
    if(i>pjesa_e_dhembeve1[1]){
      $('.tooth-'+i).mouseover(function(){
        $('.tooth-'+i+'-parent').css('fill', color1);
      });
      $('.tooth-'+i).mouseleave(function(){
        $('.tooth-'+i+'-parent').css('fill', 'none');
      });
    }
  }
  for(let i=31 ; i <= 38 ; i++){
    if(i>pjesa_e_dhembeve1[2]){
      $('.tooth-'+i).mouseover(function(){
        $('.tooth-'+i+'-parent').css('fill', color1);
      });
      $('.tooth-'+i).mouseleave(function(){
        $('.tooth-'+i+'-parent').css('fill', 'none');
      });
    }
  }
  for(let i=41 ; i <= 48 ; i++){
    if(i>pjesa_e_dhembeve1[3]){
      $('.tooth-'+i).mouseover(function(){
        $('.tooth-'+i+'-parent').css('fill', color1);
      });
      $('.tooth-'+i).mouseleave(function(){
        $('.tooth-'+i+'-parent').css('fill', 'none');
      });
    }
  }

}

/*
for(let i=21 ; i <= 28 ; i++){
  $('.tooth-'+i).mouseover(function(){
    $('.tooth-'+i+'-parent').css('fill', color1);
  });
  $('.tooth-'+i).mouseleave(function(){
    $('.tooth-'+i+'-parent').css('fill', 'none');
  });
}
for(let i=31 ; i <= 38 ; i++){
  $('.tooth-'+i).mouseover(function(){
    $('.tooth-'+i+'-parent').css('fill', color1);
  });
  $('.tooth-'+i).mouseleave(function(){
    $('.tooth-'+i+'-parent').css('fill', 'none');
  });
}
for(let i=41 ; i <= 48 ; i++){
  $('.tooth-'+i).mouseover(function(){
    $('.tooth-'+i+'-parent').css('fill', color1);
  });
  $('.tooth-'+i).mouseleave(function(){
    $('.tooth-'+i+'-parent').css('fill', 'none');
  });
}
*/

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text("Ruaj te dhenat")
  modal.find('.modal-body input').val(recipient)
})

function onMouse(i){

    $('.tooth-'+i.toString()+'-parent').mouseleave(function(){
      $('.tooth-'+i.toString()+'-parent').css('fill', "#EEECF5");
    });
    $('.tooth-'+i.toString()+'-parent').mouseover(function(){
      $('.tooth-'+i.toString()+'-parent').css('fill', color1);
    });

}

if(document.querySelector(".proteza")){

  document.querySelector(".protezaButton").disabled=true;
  let pjesa_siper = document.querySelector(".mr-auto").getAttribute('id');
  let pjesa_e_dhembeve = pjesa_siper.split('-');

  for(let i = 11 ; i<= pjesa_e_dhembeve[0];i++){

    $('.tooth-'+i.toString()+'-parent').css('fill', '#EEECF5');
    onMouse(i.toString());
  }
  for(let i = 21 ; i<= pjesa_e_dhembeve[1];i++){
      $('.tooth-'+i.toString()+'-parent').css('fill', '#EEECF5');
      onMouse(i.toString());
  }

  for(let i = 31 ; i<= pjesa_e_dhembeve[2];i++){
    $('.tooth-'+i.toString()+'-parent').css('fill', '#EEECF5');
      onMouse(i.toString());

  }
  for(let i = 41 ; i<= pjesa_e_dhembeve[3];i++){

      $('.tooth-'+i.toString()+'-parent').css('fill', '#EEECF5');
      onMouse(i.toString());
  }

}
else{
  $('.tooth-11').mouseover(function(){
  $('.tooth-11-parent').css('fill', color1);
});

$('.tooth-11').mouseleave(function(){
  $('.tooth-11-parent').css('fill', 'none');
});

$('.tooth-12').mouseover(function(){
  $('.tooth-12-parent').css('fill', color1);
});

$('.tooth-12').mouseleave(function(){
  $('.tooth-12-parent').css('fill', 'none');
});

$('.tooth-13').mouseover(function(){
  $('.tooth-13-parent').css('fill', color1);
});

$('.tooth-13').mouseleave(function(){
  $('.tooth-13-parent').css('fill', 'none');
});

$('.tooth-14').mouseover(function(){
  $('.tooth-14-parent').css('fill', color1);
});

$('.tooth-14').mouseleave(function(){
  $('.tooth-14-parent').css('fill', 'none');
});

$('.tooth-15').mouseover(function(){
  $('.tooth-15-parent').css('fill', color1);
});

$('.tooth-15').mouseleave(function(){
  $('.tooth-15-parent').css('fill', 'none');
});

$('.tooth-16').mouseover(function(){
  $('.tooth-16-parent').css('fill', color1);
});

$('.tooth-16').mouseleave(function(){
  $('.tooth-16-parent').css('fill', 'none');
});

$('.tooth-17').mouseover(function(){
  $('.tooth-17-parent').css('fill', color1);
});

$('.tooth-17').mouseleave(function(){
  $('.tooth-17-parent').css('fill', 'none');
});

$('.tooth-18').mouseover(function(){
  $('.tooth-18-parent').css('fill', color1);
});

$('.tooth-18').mouseleave(function(){
  $('.tooth-18-parent').css('fill', 'none');
});

/*Segundo Quadrante*/

$('.tooth-21').mouseover(function(){
  $('.tooth-21-parent').css('fill', color1);
});

$('.tooth-21').mouseleave(function(){
  $('.tooth-21-parent').css('fill', 'none');
});

$('.tooth-22').mouseover(function(){
  $('.tooth-22-parent').css('fill', color1);
});

$('.tooth-22').mouseleave(function(){
  $('.tooth-22-parent').css('fill', 'none');
});

$('.tooth-23').mouseover(function(){
  $('.tooth-23-parent').css('fill', color1);
});

$('.tooth-23').mouseleave(function(){
  $('.tooth-23-parent').css('fill', 'none');
});

$('.tooth-24').mouseover(function(){
  $('.tooth-24-parent').css('fill', color1);
});

$('.tooth-24').mouseleave(function(){
  $('.tooth-24-parent').css('fill', 'none');
});

$('.tooth-25').mouseover(function(){
  $('.tooth-25-parent').css('fill', color1);
});

$('.tooth-25').mouseleave(function(){
  $('.tooth-25-parent').css('fill', 'none');
});

$('.tooth-26').mouseover(function(){
  $('.tooth-26-parent').css('fill', color1);
});

$('.tooth-26').mouseleave(function(){
  $('.tooth-26-parent').css('fill', 'none');
});

$('.tooth-27').mouseover(function(){
  $('.tooth-27-parent').css('fill', color1);
});

$('.tooth-27').mouseleave(function(){
  $('.tooth-27-parent').css('fill', 'none');
});

$('.tooth-28').mouseover(function(){
  $('.tooth-28-parent').css('fill', color1);
});

$('.tooth-28').mouseleave(function(){
  $('.tooth-28-parent').css('fill', 'none');
});

/*Terceiro Quadrante*/

$('.tooth-31').mouseover(function(){
  $('.tooth-31-parent').css('fill', color1);
});

$('.tooth-31').mouseleave(function(){
  $('.tooth-31-parent').css('fill', 'none');
});

$('.tooth-32').mouseover(function(){
  $('.tooth-32-parent').css('fill', color1);
});

$('.tooth-32').mouseleave(function(){
  $('.tooth-32-parent').css('fill', 'none');
});

$('.tooth-33').mouseover(function(){
  $('.tooth-33-parent').css('fill', color1);
});

$('.tooth-33').mouseleave(function(){
  $('.tooth-33-parent').css('fill', 'none');
});

$('.tooth-34').mouseover(function(){
  $('.tooth-34-parent').css('fill', color1);
});

$('.tooth-34').mouseleave(function(){
  $('.tooth-34-parent').css('fill', 'none');
});

$('.tooth-35').mouseover(function(){
  $('.tooth-35-parent').css('fill', color1);
});

$('.tooth-35').mouseleave(function(){
  $('.tooth-35-parent').css('fill', 'none');
});

$('.tooth-36').mouseover(function(){
  $('.tooth-36-parent').css('fill', color1);
});

$('.tooth-36').mouseleave(function(){
  $('.tooth-36-parent').css('fill', 'none');
});

$('.tooth-37').mouseover(function(){
  $('.tooth-37-parent').css('fill', color1);
});

$('.tooth-37').mouseleave(function(){
  $('.tooth-37-parent').css('fill', 'none');
});

$('.tooth-38').mouseover(function(){
  $('.tooth-38-parent').css('fill', color1);
});

$('.tooth-38').mouseleave(function(){
  $('.tooth-38-parent').css('fill', 'none');
});

/*Quarto Quadrante*/

$('.tooth-41').mouseover(function(){
  $('.tooth-41-parent').css('fill',color1);
});

$('.tooth-41').mouseleave(function(){
  $('.tooth-41-parent').css('fill', 'none');
});

$('.tooth-42').mouseover(function(){
  $('.tooth-42-parent').css('fill', color1);
});

$('.tooth-42').mouseleave(function(){
  $('.tooth-42-parent').css('fill', 'none');
});

$('.tooth-43').mouseover(function(){
  $('.tooth-43-parent').css('fill', color1);
});

$('.tooth-43').mouseleave(function(){
  $('.tooth-43-parent').css('fill', 'none');
});

$('.tooth-44').mouseover(function(){
  $('.tooth-44-parent').css('fill', color1);
});

$('.tooth-44').mouseleave(function(){
  $('.tooth-44-parent').css('fill', 'none');
});

$('.tooth-45').mouseover(function(){
  $('.tooth-45-parent').css('fill', color1);
});

$('.tooth-45').mouseleave(function(){
  $('.tooth-45-parent').css('fill', 'none');
});

$('.tooth-46').mouseover(function(){
  $('.tooth-46-parent').css('fill', color1);
});

$('.tooth-46').mouseleave(function(){
  $('.tooth-46-parent').css('fill', 'none');
});

$('.tooth-47').mouseover(function(){
  $('.tooth-47-parent').css('fill', color1);
});

$('.tooth-47').mouseleave(function(){
  $('.tooth-47-parent').css('fill', 'none');
});

$('.tooth-48').mouseover(function(){
  $('.tooth-48-parent').css('fill', color1);
});

$('.tooth-48').mouseleave(function(){
  $('.tooth-48-parent').css('fill', 'none');
});

}

if(document.querySelector(".toast")){
  document.querySelectorAll(".mr-auto").forEach(function(i){
    let type = i.getAttribute('color');
    let color;
    if(type === "Mbushje"){
      color = "#2196f3";
    }
    else if(type === "Nxjerrje"){
      color = "#d50000";
    }
    else if(type === "Sherim"){
        color = "#aee571"
    }
    else if(type === "Tjeter"){
      color = "#CBDBFF"
    }
    else if(type="Implant"){
      color = "#59C3C3";
    }


    $('.'+i.getAttribute('id').toString()+'-parent').css("fill",color);


    $('.'+i.getAttribute('id').toString()).mouseleave(function(){

      $('.'+i.getAttribute('id').toString()+'-parent').css('fill', color);
    });

  })
}



if(document.querySelector('#select1')){
  var source = document.querySelector("#select1");
  var target = document.querySelector(".toothRegion");
  var target1 = document.querySelector(".protezaSiper");
  function display() {
      var selectedIndex = source.selectedIndex;
      if (source[selectedIndex].value === "Mbushje") {
          target.classList.remove("toothRegion");

      } else {
          target.classList.add("toothRegion");
      }
  }
  source.addEventListener("change", function () {
      display();
  }, false);

}
if(document.querySelector('.updatedate')){
  jQuery(document).ready(function(){
    jQuery('.datetimepicker').datepicker({
        language: 'en',
        minDate: new Date(),
  		});
  })

  $(function() {
  let date = document.querySelector('.datetimepicker').value;
  $('.datetimepicker').datepicker().data('datepicker').selectDate(new Date(date));
})
}


if(document.querySelector("#protezaSiper11")){
  var pjesa_siper = document.querySelector("input[name='protezaS']").value.split("-");
  var pjesa_posht = document.querySelector("input[name='protezaP']").value.split("-");

  document.getElementById("protezaSiper11").value = pjesa_siper[0];
  document.getElementById("protezaSiper12").value = pjesa_siper[1];

  document.getElementById("protezaPosht11").value = pjesa_posht[0];
  document.getElementById("protezaPosht12").value = pjesa_posht[1];
}
