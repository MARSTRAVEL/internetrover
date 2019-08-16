
let linkwrapper = $('.link');
let add_link = $('#addLink');

let languagewrapper = $('.language');
let add_language = $('#addLanguage');

let interestwrapper = $('.interest');
let add_interest = $('#addInterest');

let experiencewrapper = $('.experience');
let add_experience = $('#addExperience');

let projectwrapper = $('.project');
let add_project = $('#addProject');

let educationwrapper = $('.education');
let add_education = $('#addEducation');

// id_counter assign to input tag
let id_counter =0;

$(add_link).click(function(e){
  e.preventDefault();
  id_counter = id_counter + 1;
// give each input tag a unique ID,
  $(linkwrapper).append('<div class="row">'+
        '<div class="col-md-3 generatecv_link">'+
      '<input type="text" class="form-control" id="generatecv_linkLable' +String(id_counter)+ '"name="linkLable" placeholder="Lable"> '+
       '</div>'+
        '<div class="col-md-7">'+
          '<input type="text" class="form-control" id="link" name="link" placeholder="Link">'+
          '</div>'+
        '<div class="col-md-1">'+
          '<button class="btn form-control removeLink"><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');
      const  id = $("#generatecv_linkLable" + String(id_counter));
// bind change event on each input tag
      $('.generatecv_link').on('change', "#"+ id[0].id, function(){
// check unique ID input tag exit or not; if does not exit, append() new one;if exit, change content(html) according to user's input
      if ($('#cv_websites').find("#"+ id[0].id).length==0) {
        $('#cv_websites').append('<li><a href ="" id='+id[0].id +'>'+$(this).val()+
        '</a></li>');
      }else {
        $('#cv_websites').find("#"+ id[0].id).html($(this).val());
      }
      });

});
$(linkwrapper).on('click', '.removeLink', function(e){
  e.preventDefault();
  const id_to_delete = $(this).parent().parent()[0].firstChild.firstChild.id;
  $(this).parent().parent().remove();
  $('#cv_websites').find("#"+ id_to_delete).parent().remove();
});

$(add_language).click(function(e){
  e.preventDefault();
  id_counter = id_counter + 1;
  $(languagewrapper).append('<div class="row generatecv_language">'+
        '<div class="col-md-3 ">'+
      '<input type="text" class="form-control" id="generatecv_languageLable' +String(id_counter) + '"name="languageLable" placeholder="Language"> '+
       '</div>'+
        '<div class="col-md-7">'+
          '<input type="text" class="form-control" id="generatecv_languageLevel'+ String(id_counter+1) + '"name="languageLevel" placeholder="Level">'+
          '</div>'+
        '<div class="col-md-1">'+
          '<button class="btn form-control removeLanguage"><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');
      const id1 = $("#generatecv_languageLable" + String(id_counter));
      const id2 = $("#generatecv_languageLevel" + String(id_counter+1));

     $('.generatecv_language').on('change', "#"+ id1[0].id, function(){
      if ($('#cv_language').find("#"+ id1[0].id).length==0) {
        $('#cv_language').append('<li id='+id1[0].id +'>'+$(this).val()+'('+$("#"+ id2[0].id).val()+')'+
        '</li>');
      }else {
        $('#cv_language').find("#"+ id1[0].id).html($(this).val()+'('+$("#"+ id2[0].id).val()+')');
      }
      });

      $('.generatecv_language').on('change', "#"+ id2[0].id, function(){
        console.log('chnaging!!');
       if ($('#cv_language').find("#"+ id1[0].id).length==0) {

         $('#cv_language').append('<li id='+id1[0].id +'>'+ $("#"+ id1[0].id).val() + '(' + $(this).val() + ')'+
         '</li>');
       }else {
         $('#cv_language').find("#"+ id1[0].id).html($("#"+ id1[0].id).val() + '(' + $(this).val() + ')');
       }
       });

});
$(languagewrapper).on('click', '.removeLanguage', function(e){
  e.preventDefault();
  const id_to_delete = $(this).parent().parent()[0].firstChild.firstChild.id;
  $(this).parent().parent().remove();
  $('#cv_language').find("#"+ id_to_delete).remove();
});

$(add_interest).click(function(e){
  e.preventDefault();
  id_counter = id_counter + 1;
  $(interestwrapper).append('<div class="row">'+
        '<div class="col-md-6 generatecv_interest">'+
      ' <input type="text" class="form-control" id="generatecv_interestLable' +String(id_counter)+ '"name="interestLable" placeholder="Interest"> '+
       '</div>'+
        '<div class="col-md-1">'+
        '<button class="btn form-control removeInterest"><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');
      const  id = $("#generatecv_interestLable" + String(id_counter));

      $('.generatecv_interest').on('change', "#"+ id[0].id, function(){
// check unique ID input tag exit or not; if does not exit, append() new one;if exit, change content(html) according to user's input
      if ($('#cv_interest').find("#"+ id[0].id).length==0) {
        $('#cv_interest').append('<li id='+id[0].id +'>'+$(this).val()+
        '</li>');
      }else {
        $('#cv_interest').find("#"+ id[0].id).html($(this).val());
      }
      });

});
$(interestwrapper).on('click', '.removeInterest', function(e){
  e.preventDefault();
  const id_to_delete = $(this).parent().parent()[0].firstChild.firstElementChild.id;
  $(this).parent().parent().remove();
  $('#cv_interest').find("#"+ id_to_delete).remove();
});

$(add_experience).click(function(e){
  e.preventDefault();
  id_counter = id_counter + 1;
  $(experiencewrapper).append('<div class="row generatecv_exp">'+
        '<div class="col-md-6">'+
      '<input type="text" class="form-control" id="experienceLable' +String(id_counter)+ '" name="experienceLable" placeholder="experienceLable"> '+
       '</div>'+
        '<div class="col-md-6">'+
          '<input type="text" class="form-control" id="experiencePeriod' +String(id_counter)+ '" name="experiencePeriod" placeholder="experiencePeriod">'+
          '</div>'+
          '<div class="col-md-11">'+
             '<textarea class="form-control" id="experienceDescription' +String(id_counter)+ '" name="experienceDescription" rows="3" placeholder="experienceDescription"></textarea>'+
          '</div>'+
        '<div class="col-md-1 align-self-center">'+
          '<button class="btn form-control removeExperience" id="experienceLable'+ String(id_counter) +'"><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');
      const id1 = $("#experienceLable" + String(id_counter));
      const id2 = $("#experiencePeriod" + String(id_counter));
      const id3 = $("#experienceDescription" + String(id_counter));

      $('.generatecv_exp').on('change', "#"+id1[0].id, function(){
       if ($('#generatecv_experiences').find('#'+id1[0].id).length==0) {
         $('.generatecv_experiences').append('<div id="'+ id1[0].id +'">'+
           '<div class="d-flex flex-row">'+
             '<div class="p-2"><h4>'+ $(this).val() +'</h4></div>'+
             '<div class="p-2 ml-auto"><p></p></div>'+
           '</div>'+
           '<p>'+
             '</p>'+
         '</div>');
       }else {
         $('#generatecv_experiences').find("#"+ id1[0].id).find('h4').html($(this).val());
       }
       });
      $('.generatecv_exp').on('change', "#"+id2[0].id, function(){
        if ($('#generatecv_experiences').find('#'+id1[0].id).length==0) {
          $('.generatecv_experiences').append('<div id="'+ id1[0].id +'">'+
            '<div class="d-flex flex-row">'+
              '<div class="p-2"><h4></h4></div>'+
              '<div class="p-2 ml-auto"><p>'+ $(this).val() +'</p></div>'+
            '</div>'+
            '<p>'+
              '</p>'+
          '</div>');
        }else {
          $('#generatecv_experiences').find("#"+ id1[0].id).find('p')[0].innerHTML= $(this).val();
        }
        });
      $('.generatecv_exp').on('change', "#"+id3[0].id, function(){
         if ($('#generatecv_experiences').find('#'+id1[0].id).length==0) {
           $('.generatecv_experiences').append('<div id="'+ id1[0].id +'">'+
             '<div class="d-flex flex-row">'+
               '<div class="p-2"><h4></h4></div>'+
               '<div class="p-2 ml-auto"><p></p></div>'+
             '</div>'+
             '<p>'+$(this).val()+
               '</p>'+
           '</div>');
         }else {
           $('#generatecv_experiences').find("#"+ id1[0].id).find('p')[1].innerHTML = $(this).val();
         }
         });

});
$(experiencewrapper).on('click', '.removeExperience', function(e){
  e.preventDefault();
  $(this).parent().parent().remove();
  $('#generatecv_experiences').find("#"+ $(this)[0].id).remove();
});

$(add_project).click(function(e){
  e.preventDefault();
    id_counter = id_counter + 1;
  $(projectwrapper).append('<div class="row generatecv_pro">'+
        '<div class="col-md-2">'+
      '<input type="text" class="form-control" id="projectLable' +String(id_counter)+ '" name="projectLable" placeholder="experienceLable"> '+
       '</div>'+
          '<div class="col-md-7">'+
             '<textarea class="form-control" id="projectDescription' +String(id_counter)+ '" name="projectDescription" rows="1" placeholder="Short Project Description"></textarea>'+
          '</div>'+
          '<div class="col-md-2">'+
             '<input class="form-control" id="projectLink" name="projectLink" rows="1" placeholder="link"></input>'+
          '</div>'+
        '<div class="col-md-1">'+
          '<button class="btn form-control removeProject" id="projectLable'+ String(id_counter) +'"><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');
      const id1 = $("#projectLable" + String(id_counter));
      const id2 = $("#projectDescription" + String(id_counter));

      $('.generatecv_pro').on('change', "#"+id1[0].id, function(){
        if ($('.generatecv_projects').find('#'+id1[0].id).length==0) {
          $('.generatecv_projects').append('<div class="d-flex flex-row" id ="'+ id1[0].id +'">'+
                                '<div class="p-2">'+
                                  '<h4><a href="">'+ $(this).val() +'</a></h4>'+
                                '</div>'+
                                '<div class="p-2"><p></p></div>'+
                              '</div>');
        }else {
          $('.generatecv_projects').find("#"+ id1[0].id).find('a').html($(this).val());
        }
       });
      $('.generatecv_pro').on('change', "#"+id2[0].id, function(){
        if ($('.generatecv_projects').find('#'+id1[0].id).length==0) {
           $('.generatecv_projects').append('<div class="d-flex flex-row" id ="'+ id1[0].id +'">'+
                                 '<div class="p-2">'+
                                   '<h4><a href=""></a></h4>'+
                                 '</div>'+
                                 '<div class="p-2"><p>'+ $(this).val() +'</p></div>'+
                               '</div>');
         }else {
           $('.generatecv_projects').find("#"+ id1[0].id).find('p').html($(this).val());
         }
        });
});
$(projectwrapper).on('click', '.removeProject', function(e){
  e.preventDefault();
  $(this).parent().parent().remove();
  $('.generatecv_projects').find("#"+ $(this)[0].id).remove();
});

$(add_education).click(function(e){
  e.preventDefault();
  id_counter = id_counter + 1;
  $(educationwrapper).append('<div class="row generatecv_edu">'+
        '<div class="col-md-2">'+
      '<input type="text" class="form-control" id="educationPeriod' +String(id_counter)+ '" name="educationPeriod" placeholder="Education Period"> '+
       '</div>'+
          '<div class="col-md-5">'+
             '<input class="form-control" id="instituionName' +String(id_counter)+ '" name="instituionName" rows="1" placeholder="instituion Name"></input>'+
          '</div>'+
          '<div class="col-md-4">'+
             '<input class="form-control" id="major' +String(id_counter)+ '" name="major" rows="1" placeholder="Major"></input>'+
          '</div>'+
        '<div class="col-md-1">'+
          '<button class="btn form-control removeEducation" id="educationPeriod' +String(id_counter)+ '" ><i class= "fas fa-trash-alt" style= "font-size:30px;color:red"></i></button>'+
        '</div>'+
      '</div>');

      const id1 = $("#educationPeriod" + String(id_counter));
      const id2 = $("#instituionName" + String(id_counter));
      const id3 = $("#major" + String(id_counter));

      $('.generatecv_edu').on('change', "#"+id1[0].id, function(){
        if ($('.generatecv_educations').find('#'+id1[0].id).length==0) {
          $('.generatecv_educations').append('<div class="d-flex flex-row" id="'+ id1[0].id +'">'+
            '<div class="p-2"><p>'+ $(this).val() +'</p></div>'+
            '<div class="p-2"><p> </p></div>'+
            '<div class="p-2"><p> </p></div>'+
          '</div>');
        }else {
          $('.generatecv_educations').find("#"+ id1[0].id).find('p')[0].innerHTML=$(this).val();
        }
       });
      $('.generatecv_edu').on('change', "#"+id2[0].id, function(){
         if ($('.generatecv_educations').find('#'+id1[0].id).length==0) {
           $('.generatecv_educations').append('<div class="d-flex flex-row" id="'+ id1[0].id +'">'+
             '<div class="p-2"><p></p></div>'+
             '<div class="p-2"><p> </p></div>'+
             '<div class="p-2"><p> '+ $(this).val() +'</p></div>'+
           '</div>');
         }else {
           $('.generatecv_educations').find("#"+ id1[0].id).find('p')[2].innerHTML=$(this).val();
         }
        });
      $('.generatecv_edu').on('change', "#"+id3[0].id, function(){
           if ($('.generatecv_educations').find('#'+id1[0].id).length==0) {
             $('.generatecv_educations').append('<div class="d-flex flex-row" id="'+ id1[0].id +'">'+
               '<div class="p-2"><p></p></div>'+
               '<div class="p-2"><p> '+ $(this).val() +'</p></div>'+
               '<div class="p-2"><p> </p></div>'+
             '</div>');
           }else {
             $('.generatecv_educations').find("#"+ id1[0].id).find('p')[1].innerHTML=$(this).val();
           }
          });
});
$(educationwrapper).on('click', '.removeEducation', function(e){
  e.preventDefault();
  $(this).parent().parent().remove();
  $('.generatecv_educations').find("#"+ $(this)[0].id).remove();
});

$('#profilePhoto').on('change',function(){
  if (this.files[0].size >=60000) {
    alert(this.files[0].size);
  }
  else {
  $('#submitButton').attr('disabled', false);
  }
});

$('#generatecv_firstname').on('change', function(){
  const name = $(this).val() + '&nbsp' + $('#generatecv_lastname').val();
  $('.cv_name').html(name);
});
$('#generatecv_lastname').on('change', function(){
  const name = $('#generatecv_firstname').val()+ '&nbsp' + $(this).val();
  $('.cv_name').html(name);
});
$('#generatecv_phone').on('change', function(){

  $('.cv_phone a').html($(this).val());
});
$('#generatecv_email').on('change', function(){
  $('.cv_email a').html($(this).val());
});

$('#generatecv_linkLable').on('change',function(){

  if ($('#cv_websites').find('#generatecv_linkLable').length==0) {
    $('#cv_websites').append('<li><a href ="" id="generatecv_linkLable"'+$(this).val()+
    '</a></li>');
  }else {

    $('#cv_websites').find('#generatecv_linkLable').html($(this).val());
  }
});

$('#languageLable').on('change',function(){

  if ($('#cv_language').find('#generatecv_languageLable').length==0) {
    $('#cv_language').append('<li id="generatecv_languageLable">'+$(this).val()+'('+$('#languageLevel').val()+')'+
    '</li>');
  }else {
    $('#cv_language').find('#generatecv_languageLable').html($(this).val()+'('+$('#languageLevel').val()+')');
  }
});

$('#languageLevel').on('change',function(){
  if ($('#cv_language').find('#generatecv_languageLable').length==0) {
    $('#cv_language').append('<li id="generatecv_languageLable">'+'('+$('#languageLable').val()+')'+$(this).val()+
    '</li>');
  }else {
    $('#cv_language').find('#generatecv_languageLable').html($('#languageLable').val()+'('+$(this).val()+')');
  }
});

$('#interestLable').on('change', function(){
  if ($('#cv_interest').find('#generatecv_interestLable').length==0) {
    $('#cv_interest').append('<li id="generatecv_interestLable">'+$(this).val()+
    '</li>');
  }else {
    $('#cv_interest').find('#generatecv_interestLable').html($(this).val());
  }
});

$('.experience').on('change','#experienceLable', function(){
  if ($('.generatecv_experiences').find('#generatecv_experience').length==0) {
    $('#generatecv_experiences').append('<div id="generatecv_experience">'+
      '<div class="d-flex flex-row">'+
        '<div class="p-2"><h4>'+ $(this).val() +'</h4></div>'+
        '<div class="p-2 ml-auto"><p>'+ $('#experiencePeriod').val() + '</p></div>'+
      '</div>'+
      '<p>'+
        '</p>'+ $('#experienceDescription').val()+
    '</div>');
  }else {
    $('#generatecv_experiences').find('#generatecv_experience').find('h4').html($(this).val());
    $('#generatecv_experiences').find('#generatecv_experience').find('p')[0].innerHTML=$('#experiencePeriod').val();
    $('#generatecv_experiences').find('#generatecv_experience').find('p')[1].innerHTML = $('#experienceDescription').val();
  }
});

$('.experience').on('change','#experiencePeriod', function(){
  if ($('#generatecv_experiences').find('#generatecv_experience').length==0) {
    $('.generatecv_experiences').append('<div id="generatecv_experience">'+
      '<div class="d-flex flex-row">'+
        '<div class="p-2"><h4></h4></div>'+
        '<div class="p-2 ml-auto"><p>'+  + '</p></div>'+
      '</div>'+
      '<p>'+
        '</p>'+
    '</div>');
  }else {
    $('#generatecv_experiences').find('#generatecv_experience').find('p')[0].innerHTML=$('#experiencePeriod').val();
  }
});

$('.experience').on('change','#experienceDescription', function(){
  if ($('#generatecv_experiences').find('#generatecv_experience').length==0) {
    $('#generatecv_experiences').append('<div id="generatecv_experience">'+
      '<div class="d-flex flex-row">'+
        '<div class="p-2"><h4></h4></div>'+
        '<div class="p-2 ml-auto"><p></p></div>'+
      '</div>'+
      '<p>'+ $(this).val()+
        '</p>'+
    '</div>');
  }else {
    $('#generatecv_experiences').find('#generatecv_experience').find('p')[1].innerHTML = $('#experienceDescription').val();
  }
});

$('.project').on('change','#projectLable', function(){
  if ($('.generatecv_projects').find('#generatecv_project').length==0) {
    $('.generatecv_projects').append('<div class="d-flex flex-row" id ="generatecv_project">'+
                          '<div class="p-2">'+
                            '<h4><a href="">'+ $(this).val() +'</a></h4>'+
                          '</div>'+
                          '<div class="p-2"><p></p></div>'+
                        '</div>');
  }else {
    $('.generatecv_projects').find('#generatecv_project').find('a').html($(this).val());
  }
});

$('.project').on('change','#projectDescription', function(){
  if ($('.generatecv_projects').find('#generatecv_project').length==0) {
    $('.generatecv_projects').append('<div class="d-flex flex-row" id ="generatecv_project">'+
                          '<div class="p-2">'+
                            '<h4><a href=""></a></h4>'+
                          '</div>'+
                          '<div class="p-2"><p>'+ $(this).val() +'</p></div>'+
                        '</div>');
  }else {
    $('.generatecv_projects').find('#generatecv_project').find('p').html($(this).val());
  }
});

$('.education').on('change','#educationPeriod', function(){
  if ($('.generatecv_educations').find('#generatecv_education').length==0) {
    $('.generatecv_educations').append('<div class="d-flex flex-row" id="generatecv_education">'+
      '<div class="p-2"><p>'+ $(this).val() +'</p></div>'+
      '<div class="p-2"><p> </p></div>'+
      '<div class="p-2"><p> </p></div>'+
    '</div>');
  }else {
    $('.generatecv_educations').find('#generatecv_education').find('p')[0].innerHTML=$(this).val();
  }
});

$('.education').on('change','#instituionName', function(){
  if ($('.generatecv_educations').find('#generatecv_education').length==0) {
    $('.generatecv_educations').append('<div class="d-flex flex-row" id="generatecv_education">'+
      '<div class="p-2"><p></p></div>'+
      '<div class="p-2"><p> </p></div>'+
      '<div class="p-2"><p>'+ $(this).val() +'</p></div>'+
    '</div>');
  }else {
    $('.generatecv_educations').find('#generatecv_education').find('p')[2].innerHTML=$(this).val();
  }
});

$('.education').on('change','#major', function(){
  if ($('.generatecv_educations').find('#generatecv_education').length==0) {
    $('.generatecv_educations').append('<div class="d-flex flex-row" id="generatecv_education">'+
      '<div class="p-2"><p></p></div>'+
      '<div class="p-2"><p>' + $(this).val() + '</p></div>'+
      '<div class="p-2"><p></p></div>'+
    '</div>');
  }else {
    $('.generatecv_educations').find('#generatecv_education').find('p')[1].innerHTML=$(this).val();
  }
});
