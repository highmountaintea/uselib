/**
 * runs the designated function when being signaled to do so.
 * If the runner is not busy when a signal comes in, it will immediately run the designated function
 * If the runner is busy when a signal comes in, it will finish the current run, then immediately invoke the
 *   designated function again as the response to the signal.
 * If the runner is busy and multiple signals come in, it will finish the current run, then immediately invoke
 *   the designated function again, but only once, as all the signals are acknowledged by the same run.
 * @param {*} fn function to invoke every interval
 * @param {*} options not implemented yet
 */
export function runWhenSignaled(fn, options) { // eslint-disable-line no-unused-vars
  if (fn == null) throw new Error('fn is null');

  const settings = {
    busy: false,
    signaled: false,
  };

  async function run() {
    // clear signal
    settings.signaled = false;
    try {
      await fn();
    } catch (e) {
      // not sure what to do here
    }
    // not busy any more, so clear busy flag
    settings.busy = false;
    
    // if signaled during busy, run again
    if (settings.signaled === true) startRun();
  }

  function startRun() {
    settings.busy = true;
    setTimeout(run, 0);
  }

  function signal() {
    settings.signaled = true;
    if (settings.busy === false) startRun();
  }

  return { signal };
}
