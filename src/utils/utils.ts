import { logging } from '@/main';
import type { HeartRate } from '@/models/HeartRate';

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
  } catch (err: any) {
    if (max === 0) {
      return fail();
    }
    logging.append(time('Retrying in ' + delay + 's... (' + max + ' tries left)'));
    setTimeout(function () {
      exponentialBackoff(--max, delay * 2, toTry, success, fail);
    }, delay * 1000);
  }
}

export function time(text: string): string {
  const currentDate: Date = new Date();
  return '[' + currentDate.toTimeString() + '] ' + text;
}

export function parseHeartRate(value: any): HeartRate {
  // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  value = value.buffer ? value : new DataView(value);
  let flags = value.getUint8(0);
  let rate16Bits: number = flags & 0x1;
  let result: HeartRate = {};
  let index = 1;
  if (rate16Bits) {
    result.heartRate = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  } else {
    result.heartRate = value.getUint8(index);
    index += 1;
  }
  let contactDetected: number = flags & 0x2;
  let contactSensorPresent: number = flags & 0x4;
  if (contactSensorPresent) {
    result.contactDetected = !!contactDetected;
  }
  let energyPresent: number = flags & 0x8;
  if (energyPresent) {
    result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  }
  let rrIntervalPresent: number = flags & 0x10;
  if (rrIntervalPresent) {
    const rrIntervals = [];
    for (; index + 1 < value.byteLength; index += 2) {
      rrIntervals.push(value.getUint16(index, /*littleEndian=*/ true));
    }
    result.rrIntervals = rrIntervals;
  }
  return result;
}
