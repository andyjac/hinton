$(function() {

// ============ CONFIG VARS ===============

  var hourNodes = [
  {id:'mon_open',time:'closed'},{id:'mon_close',time:'closed'},
  {id:'tue_open',time:'11:00'},{id:'tue_close',time:'10:00'},
  {id:'wed_open',time:'11:00'},{id:'wed_close',time:'10:00'},
  {id:'thu_open',time:'11:00'},{id:'thu_close',time:'10:00'},
  {id:'fri_open',time:'11:00'},{id:'fri_close',time:'11:30'},
  {id:'sat_open',time:'11:00'},{id:'sat_close',time:'11:30'},
  {id:'sun_open',time:'11:00'},{id:'sun_close',time:'10:00'}
  ];

// ========================================

  $('.search input').prop('readonly', true);
  getGenres();
  getVenues();
  fillTimes();

  $('#buttonSave').click(function() {
    var requestBody = buildRequest();
    postData(requestBody);
  });

  $('#buttonClear').click(function() {
    if (confirm('this will delete all data on this form')) {
      resetForm($('#admin_main'));
      //location.reload(true);
    }
  });

  $('#buttonNew').click(function() {
    var requestBody = buildRequest();
    postData(requestBody);
    //resetForm($('#form1'));
    location.reload(true);
  });

  $('#buttonEdit').click(function()  {
    // clear form;
    getVenues(makeVenueList); // constructs and builds venues combo
  });

  $('#buttonDelete').click(function() {
    // clear form;
    location.reload(true);
  });

  $('#search-box').focus(function () {
    $('.search input').prop('readonly', false);
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

  google.maps.event.addListener(searchBox, 'place_changed', function() {
    fillInAddress();
  });

  function getGenres() {
    $.ajax({
      url: '/api/restaurant/genre/all',
      type: 'GET',
      dataType: 'text',
        success: function(response) {
        var res = jQuery.parseJSON(response);
        res.sort();
        console.log(res);
        $('#lblResponse').html(res);
        fillGenres(res);

      },
      error: function(xhr, status, error) {
        console.log(xhr);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });
  }

  function getVenues() {
    $.ajax({
      url: '/api/restaurant/all',
      type: 'GET',
      dataType: 'text',
      success: function(response) {
        var res = jQuery.parseJSON(response);
        res.sort(function(a,b) {
          return a.map.caption - b.map.caption;
        });
        $('#lblResponse').html(res);
        fillVenues(res);

      },
      error: function(xhr, status, error) {
        console.log(error);
        $('#lblResponse').html('Error connecting to the server.');
      }
    });
  }

function fillTimes() {
  var times = ['6:00','6:15','6:30','6:45','7:00','7:15','7:30','7:45','8:00','8:15','8:30','8:45','9:00','9:15','9:30','9:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','1:00','1:15','1:30','1:45','2:00','2:15','2:30','2:45','3:00','3:15','3:30','3:45','4:00','4:15','4:30','4:45','5:00','5:15','5:30','5:45','6:00','closed'];
  for ( var i = 0, len = hourNodes.length; i < len; i++) {
    sel = document.getElementById(hourNodes[i].id);
    for ( var j = 0, len2 = times.length; j < len2; j++) {
      var opt = document.createElement('option');
      if (times[j] === hourNodes[i].time) opt.selected = true;
      opt.innerHTML = times[j];
      opt.value = times[j];
      sel.appendChild(opt);
    }
  }
}

  function fillVenues(data) {
    data.forEach(function(el) {
      var sel = document.getElementById('r_name');
      var option = document.createElement('option');
      //console.log(el.map.caption);
      option.innerHTML = el.map.caption;
      option.value = el._id;
      //console.log(option);
      sel.appendChild(option);
    });
    $('#r_name').combobox();
  }

  function fillGenres(data) {
    data.forEach(function(value, index) {
      var sel = document.getElementById('r_genre');
      var option = document.createElement('option');
      option.innerHTML = value;
      option.value = value;
      //console.log(option);
      sel.appendChild(option);
    });
    $('#r_genre').combobox();
  }


  function postData(data) {
    $.ajax({
      url: '/hinton/user/restaurant',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(response) {
        alert('Save Successful');
      },
      error: function(xhr, status, error) {
        console.log(error);
        alert('Could not save to database');
      }
    });
  }

  function buildRequest() {
    return {
      eat: window.location.search.split('=')[1],
      map: {
        loc: {
          lat: $('#lat').val(),
          long: $('#lng').val()
        },
        caption: $('#r_name').val(),
        marker: ''
      },
      restaurant: {
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
      }
    };
  }

});
