# backbone.onceUpon

Bind handlers to execute only once during the lifecycle of a Backbone View

Example:

```javascript

Backbone.OnceUpon.extend(Backbone.View);

MyView = Backbone.View.extend({
  
  onceUponEvents: {
    "render": "onceRender"
  },
  
  onceRender() {
    // this code will execute after the first time the view gets rendered
    // and not for any subsequent render
  }

})

```
