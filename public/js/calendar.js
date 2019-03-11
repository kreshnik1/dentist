let allReservationDate = []

$.get( '/reservation/data', function(data) {
  document.querySelector("#hidden_loading").id="loading";
    data.forEach(function(i){
      allReservationDate.push({
        id:i._id,
        title:i.name,
        surname:i.surname,
        start:moment(i.date).format("YYYY-MM-DD")+"T"+i.startTime,
        end:moment(i.date).format("YYYY-MM-DD")+"T"+i.endTime,
        description:i.description
      })
    })
  }).then(function(){
    // Time Picker Initialization

    console.log(allReservationDate);
    document.querySelector("#loading").id="hidden_loading";
    document.querySelector(".calendar_card").removeAttribute("id");
    document.querySelector(".todaysInfo").removeAttribute("id");
    $(document).ready(function(){
      $('.datetimepicker').datepicker({
          language: 'en',
          minDate: new Date(),
    		});
        $('.datetimepicker1').datepicker({
            language: 'en'
          });
      $("#add-event").submit(function(){
          alert("Submitted");
          var values = {};
          $.each($('#add-event').serializeArray(), function(i, field) {
              values[field.name] = field.value;
          });
          console.log(
            values
          );
      });
      });
      $(function() {
    		// page is ready
    		$('#calendar').fullCalendar({
    			themeSystem: 'bootstrap4',
          minTime:'07:00',
          maxTime:'23:00',
    			// emphasizes business hours
    			businessHours: false,
    			defaultView: 'month',
           navLinks: true,
           allDayText:"Ora",
           eventLimit: 3,
           displayEventTime:true,
           displayEventEnd:true,
           slotEventOverlap:false,
    			// header
          timeFormat: 'HH(:mm)',
          axisFormat: 'HH:mm',
    			header: {
    				left: 'today prev,next',
    				center: 'title',
    				right: 'month,agendaWeek,agendaDay,listDay'
    			},
    			events:
          allReservationDate
          ,
    			dayClick: function(date,event,view) {
             console.log(Date.now())
            if(moment(date.format()).isAfter(moment(Date.now()))){
              $('#modal-view-event-add').modal();
              let getDate = date.format();
              console.log(getDate);
              let onlyDate = moment(getDate).format("MM/DD/YYYY")
              let onlyHour ;
              if(getDate.includes('T')){
                  onlyHour = moment(getDate).format('HH:mm')
              }
              let convertedDate = moment(onlyDate).format("MM/DD/YYYY");
              $('.datetimepicker').datepicker().data('datepicker').selectDate(new Date(convertedDate));
              document.querySelector("#startTime").value=onlyHour;
            }

    			},
    			eventClick: function(event, jsEvent, view) {
              console.log(event);
              let a =new Date( moment(event.start._i).format("DD/MM/YYYY"))
              console.log(moment(event.start._i).from(moment(Date.now())));

    					$('.event-title').html(event.title + " " + event.surname);
              $('.event-date').html(moment(event.start._i).format("DD/MM/YYYY"));
              $('.event-time').html(moment(event.start._i).format("HH:mm")+"-"+moment(event.end._i).format("HH:mm"));
    				  $(".event-description").html(event.description);
              document.querySelector(".more_information").setAttribute("href","/pacientet/"+event.id)
    					$('#modal-view-event').modal();
    			}
    		})
        document.querySelector(".fc-listDay-button ").innerHTML="today list"

    	});

  })


/*
{
  title:i.name,
  start:moment(i.date).format('YYYY-MM-DD'))+"T"+i.startTime,
  end:moment(i.date).format('YYYY-MM-DD'))+"T"+i.endTime
}*/
