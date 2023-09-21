/*
 * This module contains implementation for vanilla JS functions:
 * * "fadeIn": (element: Element, durationInSec: Number) -> null, fades the given element in.
 * * "fadeOut": (element: Element, durationInSec: Number) -> null, fades the given element out.
 *
 * Happy Coding, Hussein Kandil.
 */

export function fadeIn(element, durationInSec = 1) {
  let msInterval;
  try {
    msInterval = Math.trunc(Number(durationInSec)) * 10;
  } catch (e) {
    msInterval = 10;
  }
  if (element) {
    element.style.opacity = "0.0";
    const fadeInTimeout = setInterval(() => {
      if (Number(element.style.opacity) >= 1) {
        clearInterval(fadeInTimeout);
        return;
      }
      element.style.opacity = (
        Number(element.style.opacity) +
        msInterval / 1000
      ).toString();
    }, msInterval);
  }
}

export function fadeOut(element, durationInSec = 1) {
  let msInterval;
  try {
    msInterval = Math.trunc(Number(durationInSec)) * 10;
  } catch (e) {
    msInterval = 10;
  }
  if (element) {
    element.style.opacity = "1";
    const fadeOutTimeout = setInterval(() => {
      if (Number(element.style.opacity) <= 0) {
        clearInterval(fadeOutTimeout);
        return;
      }
      element.style.opacity = (
        Number(element.style.opacity) -
        msInterval / 1000
      ).toString();
    }, msInterval);
  }
}
