export async function exponentialBackoff(
  max: number,
  delay: number,
  toTry: CallableFunction,
  success: CallableFunction,
  fail: CallableFunction,
) {
  try {
    const result = await toTry();
    success(result);
  } catch (error) {
    if (max === 0) {
      return fail();
    }
    time('Retrying in ' + delay + 's... (' + max + ' tries left)');
    setTimeout(function () {
      exponentialBackoff(--max, delay * 2, toTry, success, fail);
    }, delay * 1000);
  }
}

function time(text: string) {
  console.log('[' + new Date().toJSON().substr(11, 8) + '] ' + text);
}
