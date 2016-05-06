function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").load("service-name.txt");
}

function eval(e,l){
	var level = l;

	e.preventDefault();
	var form = JSON.parse(localStorage.getItem('after-form'));
  var total = 0;
  var correct = 0;

  for (var question in form) {
      if (form.hasOwnProperty(question)) {
          if (parseInt(form[question])==1){
            correct++;
          }
          total++;
      }
  }

	if (correct == total){
		form.message = "We confirm your choise of "+ level +"</br></br>Please choose a persona you think fits the next participant";
	}else{
		form.message = "We suggest your choice doesn't fit the profile of "+ level +"</br></br>Please choose again";
	}
	localStorage.setItem('after-form', JSON.stringify(form));
	window.location.replace('after-index.html');    
}

$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });

  //write to local storage
  $('form').storeForm();
  //play back from local storage
  $('.playback-container').getForm();
  
  //toggle stuff by Ed Horsford @ GDS
  $('body').on('change', 'input', function(){
    var $this = $(this);
    // toggle optional sections
    if ($this.is(':checkbox')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      if ($toggleTarget.length){
        $toggleTarget.toggle($this.is(':checked') && $this.val() == $toggleTarget.attr('data-toggle-value'));
      }
    } else if ($this.is(':radio')){
      var $toggleTarget = $('.optional-section-'+$this.attr('name'));
      console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
      $toggleTarget.each(function(){
        $(this).toggle($this.val() == $(this).attr('data-toggle-value'));
      });
    }
  });

  $('[data-button-page]').change(function(){
    var buttonid = $(this).attr("data-button-id");
    var url = $(this).attr("data-button-page");
    if ($(this).is(':checked')) {
      $(buttonid).attr("href", url);
    }
  });

  $('.clearStorage').click(function(){
    localStorage.clear();
    $(this).html('&#10003; Data cleared');
  });



});
