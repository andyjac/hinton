$(function() {
  $('#btnOk').click(function() {
    var requestBody = buildRequest();
    postUser(requestBody);
  });

  $('#btnCancel').click(function() {
    $('frmUser')[0].reset();
  });

  function postUser(data) {
    $.ajax({
      url: '/api/user/sign_in',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(response) {
        console.log('success!');
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }

  function buildRequest() {
    return {
      username: $('#u_name').val(),
      password: $('#u_pass').val()
    };
  }
});
