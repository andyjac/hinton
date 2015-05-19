// admin_form.js

$(function() {

    // POST SUBMIT
    $('#buttonSave').click(function() {

        var requestBody = buildRequest();
        postData(requestBody); // return handled in ajax request
        alert( "Handler for .click() called." );
    });

     // CLEAR FORM
    $('#buttonClear').click(function() {
        $('#form1')[0].reset();
    });

    function postData(data) {
        $.ajax({
            //url: 'http://httpbin.org/post',
            url: 'http://localhost:3000/api/restaurant',
            dataType:'json',
            data: JSON.stringify(data),
            type: 'POST',
            context: document.body.form1,
            success: function (data) {
                var res = jQuery.parseJSON(data);
                $('#lblResponse').html(res.msg);
                console.log('Success: ');
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
                $('#lblResponse').html('Error connecting to the server.');
            }
        });
    }

    function buildRequest() {
        var request = {
        name: $('#r_name').val(),
        address: {
          number: $('#r_addr').val(), //regex?
          street: $('#r_street').val(),
          city: $('#r_city').val(), //combo?
          state: $('#r_state').val(), //verified by input box
          zip: $('#r_zip').val() // regex here
        },
        hours: {
          mon: $('#mon_open').val() + $('#mon_am').val() + '-' + $('#mon_close').val() + $('#mon_pm').val(),
          tue: $('#tue_open').val() + $('#tue_am').val() + '-' + $('#tue_close').val() + $('#tue_pm').val(),
          wed: $('#wed_open').val() + $('#wed_am').val() + '-' + $('#wed_close').val() + $('#wed_pm').val(),
          thu: $('#thu_open').val() + $('#thu_am').val() + '-' + $('#thu_close').val() + $('#thu_pm').val(),
          fri: $('#fri_open').val() + $('#fri_am').val() + '-' + $('#fri_close').val() + $('#fri_pm').val(),
          sat: $('#sat_open').val() + $('#sat_am').val() + '-' + $('#sat_close').val() + $('#sat_pm').val(),
          sun: $('#sun_open').val() + $('#sun_am').val() + '-' + $('#sun_close').val() + $('#sun_pm').val()
        },
        phone: $('#r_tel').val(), //do regex match here
        genre: $('#r_genre').val(), //verified in dropdown
        price: $('#r_price').val(),
        blog_link: $('#r_blog').val(),
        r_site: $('#r_site').val(),
        menu_link: $('#r_menu').val(),
        menu_item: $('#r_item').val(),
        photos: [],
        other: {}
        }
        //console.log($('#r_site'));
        //console.log(request);
    return request;
    }
});
