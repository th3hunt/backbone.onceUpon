# backbone.onceUpon

Bind handlers to execute only once during the lifecycle of a Backbone View

This usually needed for initialization logic that makes sense only after a certain stage
during the lifecycle of a Backbone.View. And that is usually the render stage.


Example:

```javascript

FairyTaleView = Backbone.OnceUpon.extend(Backbone.View);

BeastView = FairyTaleView.extend({
  
  onceUponEvents: {
    "render": "onceRender"
  },
  
  onceRender() {
    // this code will execute after the first time the view gets rendered
    // and not for any subsequent render
  }

})

```
