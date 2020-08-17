/**
 * produces a seedable random number generator
 * based on https://gist.github.com/blixt/f17b47c62508be59987b
 * @param {*} seed an integer to seed the random number generator
 */

export function fakerandom(seed) {
  let _seed = seed % 2147483647;
  if (_seed <= 0) _seed += 2147483646;

  function next() {
    return _seed = _seed * 16807 % 2147483647;
  }

  function nextFloat() {
    return (this.next() - 1) / 2147483646;
  }

  return { next, nextFloat };
}
