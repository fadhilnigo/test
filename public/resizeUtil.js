const SCREEN_LIMIT = {
  COMMON_LAPTOP: 1440,
  ALLOW_SCREEN_ZOOM: 1080,
  LARGE_MOBILE: 768,
  FIGMA_MOBILE: 375,
}

const PX = {
  BASE: 16,
  SIZE_15: 15,
  SIZE_14: 14,
  MIN: 12,
}

const _computeDesktopScaledPx = (cWidth) => {
  if (cWidth >= SCREEN_LIMIT.COMMON_LAPTOP) {
    return PX.BASE
  }

  if (cWidth >= SCREEN_LIMIT.ALLOW_SCREEN_ZOOM) {
    return PX.SIZE_15;
  }

  return PX.SIZE_14;
}

const _computeMobileScaledPx = (cWidth) => {
  if (cWidth >= SCREEN_LIMIT.FIGMA_MOBILE) {
    return PX.BASE
  }

  return PX.SIZE_14;
}

const _handleSiteScaling = () => {
  try {
    const cWidth = document.documentElement.clientWidth || 0;

    if (!cWidth) throw new Error("Error reading clientWidth");

    let scaledDevicePx = PX.BASE;
    if (cWidth <= SCREEN_LIMIT.LARGE_MOBILE) {
      scaledDevicePx = _computeMobileScaledPx(cWidth);
    } else {
      scaledDevicePx = _computeDesktopScaledPx(cWidth);
    }

    const root = document.documentElement;
    root.style.setProperty("font-size", `${scaledDevicePx}px`);
  } catch (err) {
  }
};

_handleSiteScaling();

window._handleSiteScaling = _handleSiteScaling;
