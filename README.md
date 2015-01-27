PauseVar
=============

A reactive var that allows you to pause reactivity.

##Usage

`meteor add pause-var`

```
var pauseVar = new PauseVar();

pauseVar.pause();

Tracker.autorun(function () {
  console.log(pauseVar.get());
});

// dependency.changed() will not called until resume
// but storedVar.get() will have the latest value
pauseVar.set('New value');

Meteor.setTimeout(function () {
  pauseVar.resume();
}, 5000);

```
