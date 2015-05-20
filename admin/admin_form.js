$(function() {
  $('#buttonSave').click(function() {
    var requestBody = buildRequest();
    postData(requestBody);
  });

  $('#buttonClear').click(function() {
    $('#admin_main')[0].reset();
  });

  $('#search-box').blur(function() {
    fillInAddress();
  });

  var searchBox = new google.maps.places.Autocomplete((document.getElementById('search-box')),
      { types: ['geocode'] });

  var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
  };

  function fillInAddress() {
    var place = searchBox.getPlace();
    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
    document.getElementById('lat').value = place.geometry.location.lat();
    document.getElementById('lng').value = place.geometry.location.lng();
  }

  function postData(data) {
    $.ajax({
      url: '/api/restaurant',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(response) {
        var res = jQuery.parseJSON(response);
        alert(response);
        $('#lblResponse').html(res.msg);

      },
      error: function(xhr, status, error) {
        console.log(error);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });
  }

  function buildRequest() {
    var request = {
      name: $('#r_name').val(),
      address: {
        number: $('#street_number').val(),
        street: $('#route').val(),
        city: $('#locality').val(),
        state: $('#administrative_area_level_1').val(),
        zip: $('#postal_code').val()
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
      phone: $('#r_tel').val(),
      genre: $('#r_genre').val(),
      price: $('#r_price').val(),
      blog_link: $('#r_blog').val(),
      r_site: $('#r_site').val(),
      menu_link: $('#r_menu').val(),
      menu_item: $('#r_item').val(),
      photos: [],
      other: {}
    };

    return request;
  }
});
