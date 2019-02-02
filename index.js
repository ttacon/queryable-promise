/**
 * Returns a wrapped promise that can be queried. This should not be used in
 * production. Instead, it is aimed primarily at simplifying testing and
 * inspection of promises during development.
 *
 * @param {Promise} promise The promise being wrapped.
 * @returns {Promise} The wrapped promise.
 */
function querablePromise(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isPending) return promise;

  // Setup our initial state.
  const state = {
    isPending: true,
    isRejected: false,
    isResolved: false,

    // Specified so that we'll generate accessor functions for them.
    err: undefined,
    val: undefined,
  };

  // We must actually wait for the promise to either resolve or reject,
  // wrap that value, then let it continue on.
  const result = promise.then(
    function(val) {
      state.isResolved = true;
      state.isPending = false;
      state.val = val;
      return val;
    }, 
    function(err) {
      state.isRejected = true;
      state.isPending = false;
      state.err = err;
      throw err;
    }
  );

  for (const val of Object.keys(state)) {
    result[val] = function() { return state[val]; };
  }

  return result;
}


module.exports = querablePromise;