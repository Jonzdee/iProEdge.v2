import { useEffect, useState } from "react";
import logo from "../../public/logo.jpg";
const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);


  const INSTALL_DISMISSED_KEY = "iproedge-install-dismissed";

const hasDismissedInstall = () => {
  return localStorage.getItem(INSTALL_DISMISSED_KEY) === "true";
};

const rememberDismissal = () => {
  localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
};
  useEffect(() => {
    // Detect iPhone / iPad
    const iosDevice =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    setIsIOS(iosDevice);

    // Check if already installed
    const checkInstalled = () => {
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true
      ) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Chrome / Edge / Android installation event
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);

      // Only automatically show popup on mobile
      if (window.innerWidth <= 767) {
        setTimeout(() => {
          if (!hasDismissedInstall()) {
            setShowPopup(true);
          }
        }, 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // iPhone doesn't fire beforeinstallprompt,
    // so show the popup manually after 3 seconds.
    if (iosDevice && !window.navigator.standalone) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }

    // App installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setShowPopup(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    // iPhone / iPad
    if (isIOS) {
      setShowPopup(true);
      return;
    }

    // Chrome / Edge / Android
    if (!installPrompt) return;

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("iProEdge installed");
    }

    setInstallPrompt(null);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    rememberDismissal();
  };

  // Already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Navbar install button */}
      {(installPrompt || isIOS) && (
        <button
          type="button"
          onClick={handleInstall}
          className="install-pwa-btn"
        >
          Install iProEdge
        </button>
      )}

      {/* Install popup */}
      {showPopup && (
        <div className="install-pwa-overlay">
          <div className="install-pwa-popup">
            <button
              type="button"
              className="install-pwa-close"
              onClick={handleClosePopup}
            >
              ×
            </button>

            <div className="install-pwa-icon">
              <img src={logo} alt="iProEdge Logo" />
            </div>

            <h3>Install iProEdge</h3>

            {isIOS ? (
              <>
                <p>
                  Add iProEdge to your iPhone Home Screen for quick access to
                  phones, tablets and electronics.
                </p>

                <div className="ios-install-steps">
                  <div>
                    <strong>1.</strong> Tap the <strong>Share</strong> button in
                    Safari.
                  </div>

                  <div>
                    <strong>2.</strong> Select{" "}
                    <strong>Add to Home Screen</strong>.
                  </div>

                  <div>
                    <strong>3.</strong> Tap <strong>Add</strong>.
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>
                  Get faster access to phones, tablets and electronics directly
                  from your home screen.
                </p>

                <button
                  type="button"
                  onClick={handleInstall}
                  className="install-pwa-popup-btn"
                >
                  Install App
                </button>
              </>
            )}

            <button
              type="button"
              className="install-pwa-later"
              onClick={handleClosePopup}
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
