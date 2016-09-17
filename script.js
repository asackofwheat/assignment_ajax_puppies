$(document).ready(function() {
  puppyList();
  $('#refresh-link').click(function(e) {
    e.preventDefault();
    puppyList();
  });
  $('#puppy-form').submit(function(e) {
    e.preventDefault();
    addPuppy($( "#puppy-form" ).serialize());
  });
  $(document).on("click", ".pup-listing", function(e) {
    $target = $(e.target);
    var id = $target.attr("data-id");
    adoptPuppy(id);
  });
  notify();
  
});

var puppyList = function() {
                  $.ajax({
                  method: "GET",
                  url: "https://ajax-puppies.herokuapp.com/puppies.json",
                  dataType: "json",
                  success: function(data) { update(data); },
                  error: function(xhr, error) { console.log(error); }
                  });
                };

var addPuppy = function(data) {
                  $.ajax({
                  method: "POST",
                  url: "http://ajax-puppies.herokuapp.com/puppies.json",
                  data: data,
                  contentType: "application/x-www-form-urlencoded",
                  dataType: "json",
                  success: function(data) { returnPuppy(data); },
                  error: function(xhr, error) { console.log(error); }
                  });
                };

var adoptPuppy = function(id) {
                  $.ajax({
                  method: "DELETE",
                  url: "http://ajax-puppies.herokuapp.com/puppies/" + id + ".json",
                  data: '',
                  contentType: "application/x-www-form-urlencoded",
                  dataType: "json",
                  success: function(data) { removePuppy(data); },
                  error: function(xhr, error) { console.log(error); }
                  });
                };

var update = function(data) {
  // console.log(data);
  var pupList = $('.puppy-list');
  pupList.text("");
  for (var i = 0; i < data.length; i++) {
    var name = data[i].name;
    var breed = data[i].breed.id;
    var id = data[i].id
    var pup = $('<li class="pup-listing">')
                .text(name + " (" + id + ")")
                .attr("data-id", id);
    pupList.append(pup);
  }
};

var returnPuppy = function(data) {
  var pupList = $('.puppy-list');
  var name = data.name;
  var breed = data.breed_id;
  var pup = $('<li>').text(name + " (" + breed + ")");
  pupList.prepend(pup);
};

var removePuppy = function(data) {
  var id = data.id;
  var $puppy = $('[data-id=' + id + ']')
  $puppy.remove();
};

var notify = function() {
  $(document).on("ajaxStart", function(e) {
    $('#notify').addClass('waiting').text("waiting");
  });
  $(document).on("ajaxComplete", function(e) {
    $('#notify').removeClass('waiting').text("");
  });
  $(document).on("ajaxSuccess", function(e) {
    $('#notify').addClass('success');
    setTimeout(function() {
      $('#notify').removeClass('success');
    }, 1000);
  });
};

