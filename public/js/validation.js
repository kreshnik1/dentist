$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


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
    createPatient.addEventListener("click",function(event){
      if(document.querySelector("input[name='amza']").value.length ===0){
        console.log("Hey");
      }
      else if(document.querySelector("input[name='amza']").value.length < 9 ){
        document.querySelector("input[name='amza']").setAttribute("class","form-control  is-invalid")
        document.querySelector(".invalid-feedback").innerHTML="Numri i amzes duhet te ket vetem 13 numra , provoje perseri "
        event.preventDefault();
      }
    })

}
if(document.querySelector(".navbar-toggler")){
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
                console.log(oldpassword.value.length+" "+newpassword.value.length+" "+repassword.value.length)
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
                console.log(oldpassword.value.length+" "+newpassword.value.length+" "+repassword.value.length)
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
                console.log(oldpassword.value.length+" "+ newpassword.value.length+" "+repassword.value.length)
                passwordButton.disabled = false;
            }
        }
    })
    passwordButton.addEventListener("click",function(event){
        if(newpassword.value!==repassword.value){
            event.preventDefault();
            repassword.setAttribute("class","form-control is-invalid")
            document.querySelector(".repassword_feedback").innerHTML="new password and re-password do not match";
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
  console.log(pjesa_e_dhembeve1[1]);
  for(let i=11 ; i <= 18 ; i++){
    if(i>pjesa_e_dhembeve1[0]){
      console.log(i);
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
  modal.find('.modal-title').text("Save information")
  modal.find('.modal-body input').val(recipient)
})

function onMouse(i){

    $('.tooth-'+i.toString()+'-parent').mouseleave(function(){
      console.log("tooth-"+i);
      $('.tooth-'+i.toString()+'-parent').css('fill', "#EEECF5");
    });
    $('.tooth-'+i.toString()+'-parent').mouseover(function(){
      console.log("tooth-"+i);
      $('.tooth-'+i.toString()+'-parent').css('fill', color1);
    });

}

if(document.querySelector(".proteza")){
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
      console.log(source[selectedIndex].value);
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
/*
if(document.querySelector('.type')){
  var list = new Array();
  var list1 = new Array();
  document.querySelectorAll(".type").forEach(function(i){
    list.push((i.getAttribute('id')));
  })
  document.querySelectorAll(".toothRegion1").forEach(function(i){
    list1.push(i.getAttribute('id'));
  })
  document.querySelectorAll(".toothRegion2").forEach(function(i){
    list1.push(i.getAttribute('id'));
  })

  list.forEach(function(i,index){
    var source1 = document.getElementById(""+i.toString());
    var target1 = document.getElementById(""+list1[index].toString());
    console.log(target1);
    function display() {
        var selectedIndex = source1.selectedIndex;
        console.log(source1[selectedIndex].value);
        if (source1[selectedIndex].value === "Mbushje") {
            target1.classList.remove("toothRegion1");

        } else {
            target1.classList.add("toothRegion1");
        }
    }
    source1.addEventListener("change", function () {
        display();
    }, false);
  })
}
*/


if(document.querySelector("#protezaSiper11")){
  var pjesa_siper = document.querySelector("input[name='protezaS']").value.split("-");
  var pjesa_posht = document.querySelector("input[name='protezaP']").value.split("-");

  document.getElementById("protezaSiper11").value = pjesa_siper[0];
  document.getElementById("protezaSiper12").value = pjesa_siper[1];

  document.getElementById("protezaPosht11").value = pjesa_posht[0];
  document.getElementById("protezaPosht12").value = pjesa_posht[1];
}
