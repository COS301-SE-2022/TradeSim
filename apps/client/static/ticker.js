 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data:{
          'Apple':null,
          'Microsoft':null,
          'Amazon':null,
          'Nike':null,
          'Bing':null,
        },
    });
  });