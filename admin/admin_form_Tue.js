// admin_form.js

$(function() {

    //populate bound form data - Names...  populate state dropdown...

    // $('#buttonAdd').click(function {
    //     //on click opens the form for adding a new entry, positions & focus, etc.
    //     //enables save button...
    //     // if form is dirty, ask...
    //     // clear inputs

    // });


    // POST SUBMIT
    $('#buttonSave').click(function() {

        var requestBody = {a:"b"};//buildRequest();
        postData(requestBody); // return handled in ajax request
        //alert( "Handler for .click() called." );
    });



    function postData(data) {
        $.ajax({
            url: 'http://httpbin.org/post',      //'http://localhost:3000/api/restaurant',
            contentType:'application/json',
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


    // function buildRequest() {
    //     var Request = {
    //     name: $('#r_name').value,
    //     address: {
    //       number: $('#r_number').value, //regex?
    //       street: $('#r_street'),
    //       city: $('#r_city'), //combo?
    //       state: $('#r_state'), //verified by input box
    //       zip: $('#r_zip'), // regex here
    //     },
    //     hours: {
    //       // mon: $('#mon_open').value + $('#mon_am').value + '-' + $('#mon_close').value + $('#mon_pm').value;
    //       // tue: $('#tue_open').value + $('#tue_am').value + '-' + $('#tue_close').value + $('#tue_pm').value;
    //       // wed: $('#wed_open').value + $('#wed_am').value + '-' + $('#wed_close').value + $('#wed_pm').value;
    //       // thu: $('#thu_open').value + $('#thu_am').value + '-' + $('#thu_close').value + $('#thu_pm').value;
    //       // fri: $('#fri_open').value + $('#fri_am').value + '-' + $('#fri_close').value + $('#fri_pm').value;
    //       // sat: $('#sat_open').value + $('#sat_am').value + '-' + $('#sat_close').value + $('#sat_pm').value;
    //       // sun: $('#sun_open').value + $('#sun_am').value + '-' + $('#sun_close').value + $('#sun_pm').value;
    //     },
    //     phone: checkTel$('#r_phone').value, //do regex match here
    //     genre: $('#r_genre').value, //verified in dropdown
    //     price: calcPrice($('#r_price').value),
    //     blog_link: checkUrl($('#r_blog').value),
    //     r_site: checkUrl($('#r_site').value),
    //     menu_link: checkUrl($('#r_menu').value),
    //     menu_item: checkUrl($('#r_item').value),
    //     photos: [],
    //     other: {}
    //     }
    //     return request;
    //}

    // // temporary logic for daily hours strings
    // function openTime(day) {
    //     var r_mon = $('#mon_open') + $('#mon_am') + '-' + $('#mon_close') + $('#mon_pm');
    //     return
    // }
    // // calculate price to price category
    // var incAmt = 10;
    // function calcPrice(p) {
    //     for (var i=1; i<4; i++) {
    //         if (p <= incAmt*i) {
    //             return i;
    //         }
    //     }
    //     return 4;
    // }
});