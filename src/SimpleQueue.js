/**
 * A simple in-memory queue that provides easy-to-use producer/consumer pattern
 * - producer pushes data into the queue
 * - consumer function is invoked when there is data in the queue
 * - ability to set queue limit and consumption size
 * @param {*} opts options
 */
export function create(opts) {
  // TODO:
  // - maybe allow multiple consumers in the future, but not sure if it's useful for most situations
  // - implement high watermark and slow down and pause
  // - notify producer via event or callback when watermark, slow down, or pause is triggered
  let options = Object.assign({ limit: 2000 }, opts);
  const { limit } = options;

  let queue = [];
  let consumer = null;
  let consumerBusy = false;   // only single consumer, will change to numActive if we support multiple

  function count() {
    return queue.length;
  }

  function onData(fn, opts) {
    if (consumer != null) throw new Error('only one consumer allowed');
    consumer = Object.assign({ limit: 1, fn: fn }, opts);
  }

  async function consume() {
    // if consumer is somehow deregistered, don't run
    if (consumer == null) {
      consumerBusy = false;
      return;
    }
    let { limit, fn } = consumer;
    let numElements = queue.length > limit ? limit : queue.length;
    // if somehow no data, don't run
    if (numElements === 0) {
      consumerBusy = false;
      return;
    }
    // run
    let elements = queue.slice(0, numElements);
    queue = queue.slice(numElements);
    try {
      await fn(elements);
    } catch (e) {
      // not sure what to do here
    }
    consumerBusy = false;
    // if still has data, run again
    if (queue.length > 0) tryConsume();
  }

  function tryConsume() {
    if (consumerBusy === true) return;
    // at this point we are going to consume it
    // flag as busy immediately to avoid concurrency issue
    consumerBusy = true;
    setTimeout(consume, 0);
  }

  function pushList(list) {
    if (queue.length + list.length > limit) throw new Error('queue limit exceeded');
    queue = queue.concat(list);
    tryConsume();
  }

  return { pushList, onData, count };
}
