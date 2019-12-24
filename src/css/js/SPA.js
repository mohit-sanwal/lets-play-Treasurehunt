var SPA = {
    appContainer: $("#app-loader"),
    init: function() {
        this.routeChange()
        window.onhashchange = this.routeChange;
    },
    routeChange: function() {
        SPA.history.push(window.location.hash)
        if (window.location.hash == '' || window.location.hash === '#/') {
            console.log("in if");
            window.location.hash = "/"; // home page, show the default view (user list)
            SPA.loadRoute("#/")
            //$(window).trigger( "hashchange" );
        } else {
            console.log("in else", window.location.hash);
            if (SPA.routes.hasOwnProperty(window.location.hash)) {
                SPA.loadRoute(window.location.hash)
            } else {
                SPA.loadRoute("#/")
            }
            //	$(window).trigger( "hashchange" );// user refreshed the browser, fire the appropriate function
        }

        SPA.onRouteChange()
    },
    appendToAppContainer: function(data) {
        this.appContainer.empty()
        this.appContainer.append(data)
    },
    updateHash: function(update) {
        window.location.hash = update
    },
    loadRoute: function(route) {

        var _this = this
        $.ajax({
            url: _this.routes[route],
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                _this.appendToAppContainer(data)
                console.log(4, window.location.hash);
                //  _this.updateHash(route)  _this.history.push(window.location.hash)   window.location.hash = route  window.history.pushState({},"", route);

            },
            error: function(xhr, status, err) {}
        });
    },
    history: [],
    location: function() {
        return window.location.hash
    },
    model: {
      binds:{}
    },
    getParameterName: function(name){
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    apply: function(){
      console.log("in apply function");
    },
    applyx:function(elem){
      elem.value = elem.data("x")
    },
    applyXById:function(id){
      var elem = $("#"+id)
      elem.value = elem.data("x")
    },
    applyXByClass:function(_class){
      var elem = $("."+_class)
      elem.value = elem.data("x")
    },
    get:function(url, callback){
      $.get(url, function(data, status){
          callback(data)
      });
    },
    post: function(url, data, callback){


      $.ajax({
        url:url,
        type:"POST",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
          callback(data)
        }
      })
    },
    bind:function(elem,model){
      elem.on("change", function(e){
        SPA.model.binds[model] = elem.val()
        SPA.apply()
      });
    }
}
