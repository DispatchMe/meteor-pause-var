/**
 *  ## [new] PauseVar([initialValue])
 *
 * A value that you can pause reactivity on.
 *
 * @param [initialValue]
 * @constructor
 */
PauseVar = function (initialValue) {
  if (!(this instanceof PauseVar))
  // called without `new`
    return new PauseVar(initialValue);

  this.val = initialValue;
  this.dep = new Tracker.Dependency();

  // Bind the functions to this so they can
  // be used directly as template helpers
  this.get = this.get.bind(this);
  this.set = this.set.bind(this);
};

/**
 * Get the value (reactive).
 * @returns {*}
 */
PauseVar.prototype.get = function () {
  this.dep.depend();
  return this.val;
};

/**
 * Set the value.
 */
PauseVar.prototype.set = function (val) {
  this.val = val;

  if (this.paused) {
    this.changeQueued = true;
  } else {
    this.dep.changed();
  }
};

/**
 * Pause reactivity.
 */
PauseVar.prototype.pause = function () {
  this.paused = true;
};

/**
 * Resume reactivity.
 */
PauseVar.prototype.resume = function () {
  this.paused = false;

  if (this.changeQueued) {
    this.dep.changed();
    this.changeQueued = false;
  }
};
