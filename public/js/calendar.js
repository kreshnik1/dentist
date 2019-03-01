let allReservationDate = []




$.get( '/reservation/data', function(data) {
    data.forEach(function(i){
      allReservationDate.push({
        title:i.name,
        start:moment(i.date).format("YYYY-MM-DD")+"T"+i.startTime,
        end:moment(i.date).format("YYYY-MM-DD")+"T"+i.endTime,
        description:i.description
      })
    })
  }).then(function(){
    jQuery(document).ready(function(){
      jQuery('.datetimepicker').datepicker({
          language: 'en',
          minDate: new Date(),
    		});
      jQuery("#add-event").submit(function(){
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
    			// event dragging & resizing
    			editable: true,
           eventLimit: true,
    			// header
          timeFormat: 'H(:mm)',
    			header: {
    				left: 'today prev,next',
    				center: 'title',
    				right: 'month,agendaWeek,agendaDay'
    			},
    			events:
          allReservationDate
    			,
          eventRender: function(event, element) {
    				if(event.icon){
    					element.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
    				}
    			  },
    			dayClick: function(date,event,view) {
            if(moment(date.format()).isAfter(moment(Date.now()))){
              jQuery('#modal-view-event-add').modal();
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

    					jQuery('.event-title').html(event.title);
    					jQuery('.event-body').html(event.description);
    					jQuery('.eventUrl').attr('href',event.url);
    					jQuery('#modal-view-event').modal();
    			},
    		})
    	});

  })


/*
{
  title:i.name,
  start:moment(i.date).format('YYYY-MM-DD'))+"T"+i.startTime,
  end:moment(i.date).format('YYYY-MM-DD'))+"T"+i.endTime
}*/
