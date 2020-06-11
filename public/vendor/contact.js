
$('#addNewContacts').click(function(){
    $('#addContactPopUp').css('display', 'block');
});
$('#formDelete').click(function(){
    $('#addContactPopUp').css('display', 'none');
});

$.get('/allContacts', function(data){
    $.each(data.results, function(i, contactObj){
    $tr = $('<tr></tr>');
    $('<th></th>').html(i).appendTo($tr);
    $('<td></td>').html(contactObj.firstName).appendTo($tr);
    $('<td></td>').html(contactObj.lastName).appendTo($tr);
    $('<td></td>').html(contactObj.nationality).appendTo($tr);
    $('<td></td>').html(contactObj.description).appendTo($tr);
    $('<td></td>').html(contactObj.gender).appendTo($tr);
    $('<td><button type="button" class="btn btn-outline-danger delete_button" firstName='+contactObj.firstName+'>Delete</button><button type="button" class="btn btn-outline-warning motify_button" firstName='+contactObj.firstName+'>Motify</button></td>').appendTo($tr);
    $tr.appendTo($('#contact_tbody'));
    });
  });

  $('#contact_tbody').delegate('.delete_button', 'click', function(){
    const firstName = $(this).attr('firstName');
    const $this = $(this);

    // ajax request to delete contact
    $.ajax({
      type: "delete",
      url: "/contact/" + firstName,
      success: function(data){
        if (data.result === 1) {
          alert(' deleted successfully!');
          $this.parents('tr').remove();
        }else {
          alert('Server error');
        }
      }
    });

  });

  $('#contact_tbody').delegate('.motify_button', 'click', function(){
    const firstName = $(this).attr('firstName');
    window.location = '/contact/' + firstName;
  });

  $('#submitForm').click(function(){
    // send post to save form in database
    $.post('/addNewContact', {
      firstName: $( "input[name=firstName]" ).val(),
      lastName: $( "input[name=lastName]" ).val(),
      nationality: $( "input[name=nationality]" ).val(),
      description: $( "input[name=description]" ).val(),
      gender: $("input:radio[name='sex']:checked").val(),
    }, function(data){
      if (data.result === 1) {
        alert('saved!');
        // clean all input field
        $('input[type=text]').val('');
      }else if (data.result === -1) {
          alert('Alreay exit!');
      }else if (data.result === -2) {
        alert('server error!');
      }
    });
  });

// propfind request to check firstName
  $("input[name=firstName]").blur(function(){
    const alphaExp = /^[a-zA-Z]+$/;
    const firstName = $("input[name=firstName]").val();
    if (!firstName || !firstName.match(alphaExp)) {
      $('#submitForm').attr('disabled', true);
      $('#firstName_warning').removeClass('alert-success').addClass('alert-danger').html('type correct firstName here').show();
    }else {
      $('#submitForm').attr('disabled', false);
      $('#firstName_warning').removeClass('alert-danger').addClass('alert-success').html('Good typing!').show();
    }
/*
  $.ajax({
      type: "propfind",
      url: "/" + $("input[name=firstName] ").val(),
    });
    */
  });

// focus on input field, empty input
  $("input[name=firstName]").focus(function(){
      $('#firstName_warning').html('type correct firstName here').hide();
  });
