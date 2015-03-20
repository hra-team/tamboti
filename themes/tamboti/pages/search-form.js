$(function() {
    function tog(v) {
        return v?'addClass':'removeClass';
    }
    $(document).on('input', '.clearable', function() {
        $(this)[tog(this.value)]('x');
    }).on('mousemove', '.x', function( e ){
        $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
    }).on('click', '.onX', function() {
        $(this).removeClass('x onX').val('').change();
    });
    
    var selectedTabId = $("#query-history ul").data("selected-tab-id"); 
    selectedTabId = (selectedTabId != "") ? selectedTabId : "simple-search-tab";
    $( "#query-tabs" ).tabs({
        select: searchTabSelected,
        selected: $("#" + selectedTabId).index() - 1
    });

	$("#search-help").load("../../includes/search-help.xq");
    $("#about-tamboti").load("../../includes/about-tamboti.xq");
    $("#cluster-collections").load("../../includes/tamboti-collections.xq");
    
    $("#simple-search-form input[name = 'input1']").autocomplete({
        source: function(request, response) {
            var data = { term: request.term };
            autocompleteCallback($("#simple-search-form input[name = 'input1']"), data);
            $.ajax({
                url: "autocomplete.xql",
                dataType: "json",
   				data: data,
                success: function(data) {
                    response(data);
                }});
        },
        minLength: 3,
        delay: 700
    });
    
    $("#advanced-search-form input[name = 'input1']").autocomplete({
        source: function(request, response) {
            var data = { term: request.term };
            autocompleteCallback($("#advanced-search-form input[name = 'input1']"), data);
            $.ajax({
                url: "autocomplete.xql",
                dataType: "json",
   				data: data,
                success: function(data) {
                    response(data);
                }});
        },
        minLength: 3,
        delay: 700
    });            
    
    $('.search-form').repeat('#add-field', {
        deleteTrigger: '',
        onReady: repeatCallback}
    );
});