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
var interval1 = setInterval(myTimer1,100);

function myTimer1() {

    if(document.querySelector(".mce-close") || document.querySelector(".mce-notification-inner") ){
        let all = document.querySelectorAll(".mce-close");
        all.forEach(function(i){
            i.click();
        })
        setTimeout(function(){ 
            clearInterval(interval1); 
        }, 3000);
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
if(document.querySelector("textarea")){
    tinymce.init({
        selector: "#mytextarea",
        height: 200,
        forced_root_block: "",
        setup: function (editor) {
            editor.on('change', function () {
                tinymce.triggerSave();
            });
        },
        plugins: "textcolor colorpicker ",
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        toolbar: 'forecolor backcolor fontsizeselect link unlink | image | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | undo redo | code | formatselect',
        style_formats: [
            { title: 'Bold text', inline: 'strong' },
            { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
            { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
            { title: 'Badge', inline: 'span', styles: { display: 'inline-block', border: '1px solid #2276d2', 'border-radius': '5px', padding: '2px 5px', margin: '0 2px', color: '#2276d2' } },
            { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
        ]

    }); 
}
if(document.querySelector(".my_textarea")){
    document.querySelectorAll(".my_textarea").forEach(function(i){
        tinymce.init({
            selector: "#"+i.id,
            height: 200,
            forced_root_block: "",
            setup: function (editor) {
                editor.on('change', function () {
                    tinymce.triggerSave();
                });
            },
            plugins: "textcolor colorpicker ",
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            toolbar: 'forecolor backcolor fontsizeselect link unlink | image | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | undo redo | code | formatselect',
            style_formats: [
                { title: 'Bold text', inline: 'strong' },
                { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
                { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
                { title: 'Badge', inline: 'span', styles: { display: 'inline-block', border: '1px solid #2276d2', 'border-radius': '5px', padding: '2px 5px', margin: '0 2px', color: '#2276d2' } },
                { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' }
            ]
        });
    })
}
if(document.querySelector(".tags_update")){
    $(".tm-input").each(function(){
        var tags_array = []
        var tags = document.querySelectorAll(".tag_hidden");
        tags.forEach(function(i){
            tags_array.push(i.getAttribute("value"));
        })
        console.log(tags_array);
        $(this).tagsManager({
             prefilled: tags_array
        })
    })
}
else{
    $(".tm-input").each(function(){
        $(this).tagsManager()
    })
}
if(document.querySelector(".answer")){
    let answer = document.querySelectorAll(".answer");
    console.log(answer.length);
    answer.forEach(function(i){
      i.innerHTML = document.querySelectorAll(".comments").length + " Answers"                 
    })
    //answer.innerHTML = document.querySelectorAll(".comments").length + " Answers"
}
if(document.querySelector(".hidden_tags")){
    let tags = document.querySelectorAll(".hidden_tags");
    
}
if(document.querySelector(".comment_User")){
    let username = document.querySelector(".comment_User").value;
    let allCommentsUsername = document.querySelectorAll(".commentUsername");
    allCommentsUsername.forEach(function(i){
        i.setAttribute("value",username);
    })
}
let post_answer = document.querySelectorAll(".submit");
post_answer.forEach(function(i){
    i.addEventListener("click",function(){
        document.querySelector("#hidden_loading").id="loading";
    })       
})
/*$('.delete_button').on('click', function() {
        $(this).val("Disabled").attr('class', 'btn btn-danger disabled');
});
*/
if(document.querySelector(".createButton")){
    let createButton = document.querySelector(".createButton");
    
    document.querySelector("#validateTitle").addEventListener('keyup', function (event) {
        if(document.querySelector("#validateTitle").value.length<15){
            document.querySelector("#validateTitle").setAttribute("class","form-control  is-invalid")
            createButton.disabled = true;
        }
        else{
            document.querySelector("#validateTitle").setAttribute("class","form-control is-valid ")
            if(document.querySelector("input[name='hidden-tags']").value.length>0 && document.querySelector("#validateTitle").value.length>14){
                createButton.disabled = false;
            }
        }
    });
    document.querySelector(".tm-input").addEventListener('keyup', function (event) {
        if(document.querySelector(" input[name='hidden-tags']").value.length<1){
            document.querySelector(".tm-input-info").setAttribute("class","tm-input form-control tm-input-info is-invalid");
            createButton.disabled = true;
        } 
        else{
            document.querySelector(".tm-input-info").setAttribute("class","tm-input form-control tm-input-info  is-valid");
            if(document.querySelector("input[name='hidden-tags']").value.length>0 && document.querySelector("#validateTitle").value.length>14){
                createButton.disabled = false;            
             }
        }
    })
     createButton.addEventListener("click",function(event){
         if(document.querySelector(" input[name='hidden-tags']").value.length<1){
             event.preventDefault();
             document.querySelector(".tm-input-info").setAttribute("class","tm-input form-control tm-input-info is-invalid");
         }
         if(tinymce.activeEditor.getContent({format: 'text'}).length<30){
             event.preventDefault();
             document.querySelector("#passwordHelpBlock").setAttribute("class","form-text text-muted red_color");
         }
         if(document.querySelector("#validateTitle").value.length<15){
             event.preventDefault();
             document.querySelector(".tm-input-info").setAttribute("class","tm-input form-control tm-input-info is-invalid");
         }
         if(document.querySelector(" input[name='hidden-tags']").value.length>0 && document.querySelector("#validateTitle").value.length>14){
             if(tinymce.activeEditor.getContent({format: 'text'}).length>29){
                 document.querySelector("#hidden_loading").id="loading";
             }
         }
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
 