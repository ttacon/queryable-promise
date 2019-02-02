const queryablePromise = require('..');

describe('queryablePromise', () => {
  it('should mark resolved promises as `isResolved`', async () => {
    const res = queryablePromise(Promise.resolve(5));

    await res;

    expect(res.isResolved()).toBe(true);
    expect(res.val()).toEqual(5);
  });

  it('should mark rejected promises as `isRejected`', async () => {
    const err = new Error('boom');
    const res = queryablePromise(Promise.reject(err));

    // eslint-disable-next-line no-empty
    try { await res; } catch (_) {}

    expect(res.isRejected()).toBe(true);
    expect(err).toEqual(err);
  });

  it('should mark resolved promises as `isResolved`', async () => {
    const res = queryablePromise(new Promise(() => {}));

    expect(res.isPending()).toBe(true);
  });

});