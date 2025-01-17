var skillStack = [];

var skills = [
/*0*/	{question:"Can they use a search engine?",
		 hint:"finding something new, help with a problem, somewhere to shop, somewhere to visit, contact details off something"},

/*1*/	{question:"Can they send a email or instant message?",
		 hint:"to keep in contact with family, or friends, using Outlook, Gmail, WhatsApp, Facebook messenger"},

/*2*/	{question:"Can they buy something online?",
		 hint:"weekly shopping, general purchases, bargains/offers, specialist goods"},

/*3*/	{question:"Can they fill out a form with personal details?",
		 hint:"online banking, set up online accounts i.e social media, applications for government services"},
]

var questions = [
/*0*/	{question:"Have they ever used the internet?",
		//  hint:"",
		 yDest:1, nDest:2},


/*1*/	{question:"Do they still use the internet?",
		//  hint:"",
		 yDest:3, nDest:2},

/*2*/	{question:"Do they want to be online?",
		 hint:"There are barriers stopping them being online, for example it's too expensive, they lack of confidence or aren't physically able",
		 yDest:-3, nDest:5},
		 //If no to 0 and 2 = Never have, never will
		 //If yes to 0, then no to 1 and 2 = Was online, but no longer
		 //Yes = Willing but unable
/*3*/	{question:"Do they like using the internet?",
		//  hint:"They are positive about the benefits of being online and learning digital skills",
		//Yes, mostly
		//Not really, it's a chore
		 yDest:4, nDest:-4},

/*4*/	{question:"Do they need help completing tasks online?",
		//  hint:"",
		//Often = Learning the ropes
		//Only with new or unfamiliar tasks = 5
		//Rarely or never = 5

		 yDest:-5, nDest:5},

/*5*/	{question:"Can they:",
			//<ol> list
			//use email
			//use search engines
			//set up an account (eg an online bank account)
			//buy things online
		 hint:"",
		 //Yes = if 5 = 'only with new tasks' then Basic digital
		 //No, they'd need help
		 yDest:6, nDest:-5},
		 //Y =

/*6*/	{question:"Do they have advanced digital skills?",
		 hint:"They work in tech, can code or have specialist digital knowledge",
		 yDest:-9, nDest:-8},
		 //Y = Expert
		 //N = Confident

// /*7*/	{question:"Do they still use the internet?",
// 		 hint:"is actively using the internet currently, and will continue to do so in future",
// 		 yDest:8, nDest:-2},
//
// /*8*/	{question:"Do they see how the internet has benefited them?",
// 		 hint:"\"yes, and if I had more skill the sky would be the limit\"",
// 		 yDest:-6, nDest:-4},
//
// /*9*/	{question:"Do they enjoy to using the internet?",
// 		 hint:"uses the internet recreationally - social media, videos/streaming, news, shopping",
// 		 yDest:-3, nDest:6}
];


function eval(name, value){

	$(".question :input").each(function(index){//Delete any un-needed questions (to account for changing minds)
		if(parseInt($(this).attr('name').charAt(0)) > parseInt(name.charAt(0))){
			$(this).parent().parent().remove();
			for (var i=0;i<skillStack.length; i++)
			{
				if (skillStack[i].name === name){
					skillStack.splice(i,1);//Remove the exsisting answer
					break;//as it will only appear once
				}
			}
		}
	});
	$(".level").each(function(index){
		if(parseInt($(this).attr('name').charAt(0)) >= parseInt(name.charAt(0))){
			$(this).remove();//Delete any level decisions
		}
	});

	var n = 0;

	switch (parseInt(name.charAt(0)))
	{
		case 2://Skills question
			skillStack.push({name:name, value:value});
			if (skillStack.length == skills.length)
			{//If all the skills Q's have been answered evaluate them
				var yes = 0;
				for (var i = 0; i < skillStack.length; i++)
				{
					if (skillStack[i].value == -1)
					{
						yes++;
					}
				}
				if (yes == skillStack.length)
				{//Yes (all)
					n = questions[parseInt(name.charAt(0))].yDest;
				}
				else
				{//No (sub-set)
					n = questions[parseInt(name.charAt(0))].nDest;
				}
			}
			break;

		default:
			if (value == 1)
			{//Yes
				n = questions[parseInt(name.charAt(0))].yDest;
			}
			else
			{//No
				n = questions[parseInt(name.charAt(0))].nDest;
			}
			break;
	}

	if (n>0)
	{//Its a new question
		q = questions[n].question;
		h = questions[n].hint;

		appendQuestion(n,q,h);
	}
	else if (n<0)
	{//Its a level decision
		appendLevel(n, name);
	}
}

function appendQuestion(n, question, hint){
	var html = " ";
	if (n == 2)
	{//Skill question
		for (var i = 0; i < skills.length; i++){
			html += "<fieldset class='form-group inline question'><legend class='form-label-bold' for='2:"+i+"'>"+skills[i].question+"</legend><p class='form-hint'>E.g. "+skills[i].hint+"</p><label class='block-label'><input id='2:"+i+"Y' name='2:"+i+"' type='radio' data-storage='-1'/>Yes</label><label class='block-label'><input id='2:"+i+"N' name='2:"+i+"' type='radio' data-storage='-2'/>No</label></fieldset>";
		}
	}
	else
	{//Normal questions
		html = "<fieldset class='form-group inline question' name='set"+n+"'><legend class='form-label-bold' for='"+n+"'>"+question+"</legend><p class='form-hint'> E.g. "+hint+"</p><label class='block-label'><input id='"+n+"Y' name='"+n+"' type='radio' data-storage='1'/>Yes</label><label class='block-label'><input id='"+n+"N' name='"+n+"' type='radio' value='0'/>No</label></fieldset>";
	}
	$('.form').append(html)
	var latestElement = document.getElementsByName('set'+n);
	latestElement[0].scrollIntoView();
}

function appendLevel(level, name){

	var plot = '';
	var colour = '';

	switch(level){
		case -1: plot += '1:</br>Never have, never will'; colour = '#DA7357'; break;
		case -2: plot += '2:</br>Was online but no longer'; colour = '#EA8C5C'; break;
		case -3: plot += '3:</br>Willing and unable'; colour = '#EC9E5A'; break;
		case -4: plot += '4:</br>Reluctantly online'; colour = '#F4C15B'; break;
		case -5: plot += '5:</br>Learning the ropes'; colour = '#F9D45E'; break;
		case -6: plot += '6:</br>Task specific'; colour = '#EAE05F'; break;
		case -7: plot += '7:</br>Basic digital skills'; colour = '#D6DA5D'; break;
		case -8: plot += '8:</br>Confident'; colour = '#B0CC5B'; break;
		case -9: plot += '9:</br>Expert'; colour = '#9CC55A'; break;
	}
	var html = "<div class='level' name='"+name+"'><p class='heading-large panel-indent' style='background-color: "+colour+";'>They are a category " + plot + "</p> <a class='button' href='routing.html'>Continue</a></div>";
	$('.form').append(html);
}






function unWrapPlaceholder(){
  $(this).contents().unwrap();
  $("#proposition-name").html("Digital Inclusion Plotter");
}




$( document ).ready(function() {
  $('[data-includefile]').each(function(){
    var file = $(this).attr("data-includefile");
    $(this).load("includes/"+$(this).attr("data-includefile")+".html", unWrapPlaceholder)
  });

  //write to local storage
  //$('form').storeForm();
  //play back from local storage
  //$('.playback-container').getForm();

  //toggle stuff by Ed Horsford @ GDS
  $('body').on('change', 'input', function(){
    var $this = $(this);
    /* toggle optional sections
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
    }*/
    eval($this.attr('name'),parseInt($this.attr('data-storage')));
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
