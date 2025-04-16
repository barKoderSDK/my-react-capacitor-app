import React, { useEffect, useRef, useState } from "react";
import { Barkoder, BarcodeType } from "barkoder-capacitor";
import "./App.css";

const BarcodeScannerApp = () => {
  const barkoderViewRef = useRef(null);
  const morePopupRef = useRef(null);
  const detailsMorePopupRef = useRef(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [isSettingsPopupVisible, setIsSettingsPopupVisible] = useState(false);
  const [isWebhookConfigVisible, setIsWebhookConfigVisible] = useState(false);
  const [isSearchEnginePopupVisible, setIsSearchEnginePopupVisible] =
    useState(false);
  const [isRecentScansPopupVisible, setIsRecentScansPopupVisible] =
    useState(false);
  const [isMorePopupVisible, setIsMorePopupVisible] = useState(false);
  const [isDetailsMorePopupVisible, setIsDetailsMorePopupVisible] =
    useState(false);
  const [isConfirmDeletePopupVisible, setIsConfirmDeletePopupVisible] =
    useState(false);
  const [isBarcodeDetailsPopupVisible, setIsBarcodeDetailsPopupVisible] =
    useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isWebhookEnabled, setIsWebhookEnabled] = useState(false);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [selectedBarcode, setSelectedBarcode] = useState(null);
  const [permanentEngine, setPermanentEngine] = useState("google");
  const [temporaryEngine, setTemporaryEngine] = useState("");
  const [currentZoomFactor, setCurrentZoomFactor] = useState(1.0);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem("webhookUrl") || ""
  );
  const [secretWord, setSecretWord] = useState(
    localStorage.getItem("secretWord") || ""
  );
  const [confirmationFeedback, setConfirmationFeedback] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isBarcodesPopupVisible, setIsBarcodesPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState(null); // "1d" or "2d"

  const barcodeTypes = [
    { name: "QR", type: "qr", mode: "2d" },
    { name: "Qr Micro", type: "qrMicro", mode: "2d" },
    { name: "Aztec Compact", type: "aztecCompact", mode: "2d" },
    { name: "Aztec", type: "aztec", mode: "2d" },
    { name: "Datamatrix", type: "datamatrix", mode: "2d" },
    { name: "Dotcode", type: "dotcode", mode: "2d" },
    { name: "Code 128", type: "code128", mode: "1d" },
    { name: "Code 93", type: "code93", mode: "1d" },
    { name: "Code 39", type: "code39", mode: "1d" },
    { name: "Codabar", type: "codabar", mode: "1d" },
    { name: "Code 11", type: "code11", mode: "1d" },
    { name: "Ean 8", type: "ean8", mode: "1d" },
    { name: "Ean 13", type: "ean13", mode: "1d" },
    { name: "Msi", type: "msi", mode: "1d" },
    { name: "UpcA", type: "upcA", mode: "1d" },
    { name: "UpcE", type: "upcE", mode: "1d" },
    { name: "PDF 417", type: "pdf417", mode: "2d" },
    { name: "Databar 14", type: "databar14", mode: "1d" },
    { name: "Databar Limited", type: "databarLimited", mode: "1d" },
    { name: "Databar Expanded", type: "databarExpanded", mode: "1d" },
    { name: "Postal IMB", type: "postalIMB", mode: "1d" },
    { name: "Postnet", type: "postnet", mode: "1d" },
    { name: "Planet", type: "planet", mode: "1d" },
    { name: "Australian Post", type: "australianPost", mode: "1d" },
    { name: "Royal Mail", type: "royalMail", mode: "1d" },
    { name: "KIX", type: "kix", mode: "1d" },
    { name: "Japanese Post", type: "japanesePost", mode: "1d" },
  ];

  const [enabledBarcodes, setEnabledBarcodes] = useState(
    barcodeTypes.reduce((acc, barcode) => {
      acc[barcode.type] = true;
      return acc;
    }, {})
  );

  const initializeBarkoder = async () => {
    if (!barkoderViewRef.current) return;
    const boundingRect = barkoderViewRef.current.getBoundingClientRect();
    try {
      await Barkoder.registerWithLicenseKey({
        licenseKey:
          "YOUR_KEY",
      });
      await Barkoder.initialize({
        width: Math.round(boundingRect.width),
        height: Math.round(boundingRect.height),
        x: Math.round(boundingRect.x),
        y: Math.round(boundingRect.y),
      });
      await setBarkoderSettings();
      await setActiveBarcodeTypes();
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing Barkoder:", error);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initializeBarkoder();
    }
  }, [isInitialized]);

  useEffect(() => {
    setActiveBarcodeTypes();
  }, [isBarcodesPopupVisible, enabledBarcodes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        morePopupRef.current &&
        !morePopupRef.current.contains(event.target)
      ) {
        setIsMorePopupVisible(false);
      }
      if (
        detailsMorePopupRef.current &&
        !detailsMorePopupRef.current.contains(event.target)
      ) {
        setIsDetailsMorePopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setActiveBarcodeTypes = async () => {
    try {
      Object.keys(enabledBarcodes).forEach((barcodeType) => {
        const isEnabled = enabledBarcodes[barcodeType];
        Barkoder.setBarcodeTypeEnabled({
          type: BarcodeType[barcodeType],
          enabled: isEnabled,
        });
      });
    } catch (error) {
      console.error("Error setting active barcode types:", error);
    }
  };

  const setBarkoderSettings = async () => {
    try {
      Barkoder.setRegionOfInterestVisible({ value: true });
      Barkoder.setRegionOfInterest({ left: 5, top: 5, width: 90, height: 90 });
      Barkoder.setCloseSessionOnResultEnabled({ enabled: true });
      Barkoder.setMaximumResultsCount({ value: 200 });
      Barkoder.setImageResultEnabled({ enabled: true });
      Barkoder.setLocationInImageResultEnabled({ enabled: true });
      Barkoder.setLocationInPreviewEnabled({ enabled: true });
      Barkoder.setBarcodeThumbnailOnResultEnabled({ enabled: true });
      Barkoder.setBeepOnSuccessEnabled({ enabled: true });
      Barkoder.setPinchToZoomEnabled({ enabled: true });
      Barkoder.setZoomFactor({ value: currentZoomFactor });
    } catch (error) {
      console.error("Error setting Barkoder settings:", error);
      throw error;
    }
  };

  const toggleFlash = async () => {
    if (Barkoder) {
      const newFlashState = !isFlashOn;
      setIsFlashOn(newFlashState);
      await Barkoder.setFlashEnabled({ enabled: newFlashState });
    } else {
      console.error("BarkoderScanner plugin not available");
    }
  };

  const handleScanResult = (barkoderResult) => {
    const randomId = Math.floor(Math.random() * 1000000);

    setScannedResult({
      id: randomId,
      textualData:
        barkoderResult?.decoderResults[0]?.textualData || "No data available",
      type:
        barkoderResult?.decoderResults[0]?.barcodeTypeName || "Unknown type",
      resultImage: `data:image/jpeg;base64,${
        barkoderResult?.resultImageAsBase64 || ""
      }`,
      thumbnailImage: `data:image/jpeg;base64,${
        barkoderResult?.resultThumbnailsAsBase64[0] || ""
      }`,
    });

    const results = barkoderResult?.decoderResults.map((decoderResult) => ({
      id: randomId,
      textualData: decoderResult.textualData || "No data available",
      type: decoderResult.barcodeTypeName || "Unknown type",
    }));
    setRecentScans((prevScans) => [...prevScans, ...results]);
    Barkoder.stopScanning();
    setIsScanning(false);
  };

  const startScanning = async () => {
    setScannedResult(null);
    setIsScanning(true);
    try {
      if (isInitialized) {
        await Barkoder.startScanning();
        console.log("Scanning started");
      } else {
        alert("Scanner is not initialized yet.");
      }
    } catch (error) {
      console.error("Error during scanning:", error);
      alert(`Error: ${error}`);
      setIsScanning(false);
    }
  };

  const toggleScan = () => {
    if (isScanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  useEffect(() => {
    if (Barkoder) {
      const handleBarkoderEvent = (barkoderResult) => {
        handleScanResult(barkoderResult);
      };
      Barkoder.addListener("barkoderResultEvent", handleBarkoderEvent);
    }
  }, [isInitialized]);

  const stopScanning = async () => {
    setScannedResult({
      textualData: null,
      type: null,
      resultImage: null,
      thumbnailImage: null,
    });
    setIsScanning(false);
    setIsFlashOn(false);
    setCurrentZoomFactor(1.0);
    await Barkoder.stopScanning();
  };

  const handleSettingsClick = () => {
    if (!isSettingsPopupVisible) {
      setIsSettingsPopupVisible(true);
    }

    if (isScanning) {
      stopScanning();
    }
  };

  const handleWebhookConfigClick = () => {
    loadWebhookConfig();
    if (!isWebhookConfigVisible) {
      setIsWebhookConfigVisible(true);
    }
  };

  const handleOpenEnginesPopup = () => {
    if (!isSearchEnginePopupVisible) {
      setTemporaryEngine(permanentEngine);
      setIsSearchEnginePopupVisible(true);
    }
  };

  const handleOpenCodesPopup = (type) => {
    setPopupType(type);
    setIsBarcodesPopupVisible(true);
  };

  const handleBarcodeToggle = (barcodeType) => {
    setEnabledBarcodes((prevState) => ({
      ...prevState,
      [barcodeType]: !prevState[barcodeType],
    }));
  };

  const closeBarcodesPopup = () => {
    setIsBarcodesPopupVisible(false);
  };

  const toggleAllBarcodes = () => {
    const shouldEnableAll = Object.values(enabledBarcodes).includes(false);
    const newEnabledState = Object.fromEntries(
      barcodeTypes.map((barcode) => [barcode.type, shouldEnableAll])
    );
    setEnabledBarcodes(newEnabledState);
  };

  const handleOpenRecentScansPopup = () => {
    if (!isRecentScansPopupVisible) {
      setIsRecentScansPopupVisible(true);
    }
  };

  const openRecentScansMorePopup = () => {
    setIsMorePopupVisible(true);
  };

  const openDetailsMorePopup = () => {
    setIsDetailsMorePopupVisible(true);
  };

  const closeSettings = () => {
    setIsSettingsPopupVisible(false);
  };

  const closeRecentScans = () => {
    setIsRecentScansPopupVisible(false);
  };

  const closeMorePopup = () => {
    setIsMorePopupVisible(false);
  };

  const closeDetailsMorePopup = () => {
    setIsDetailsMorePopupVisible(false);
  };

  const handleClickOutside = (event) => {
    if (morePopupRef.current && !morePopupRef.current.contains(event.target)) {
      closeMorePopup();
    }
    if (
      detailsMorePopupRef.current &&
      !detailsMorePopupRef.current.contains(event.target)
    ) {
      closeDetailsMorePopup();
    }
  };

  const closeWebhookConfig = () => {
    setIsWebhookConfigVisible(false);
  };

  const closeEnginesPopup = () => {
    setIsSearchEnginePopupVisible(false);
  };

  const saveSelectedEngine = () => {
    setPermanentEngine(temporaryEngine);
    closeEnginesPopup();
  };

  const zoomIn = async () => {
    try {
      const newZoomFactor = currentZoomFactor + 1.0;
      setCurrentZoomFactor(newZoomFactor);
      await Barkoder.setZoomFactor({ value: newZoomFactor });
    } catch (error) {
      console.error("Error zooming in:", error);
    }
  };

  const zoomOut = async () => {
    try {
      const newZoomFactor = currentZoomFactor - 1.0;
      setCurrentZoomFactor(newZoomFactor);
      await Barkoder.setZoomFactor({ value: newZoomFactor });
    } catch (error) {
      console.error("Error zooming out:", error);
    }
  };

  const handleCopyToClipboard = () => {
    alert("Text copied to clipboard: " + scannedResult.textualData);
  };

  const handleWebhookConfiguration = async () => {
    if (!webhookUrl) {
      alert("The Webhook URL is not set.");
      return;
    }

    if (!scannedResult) {
      alert("No scanned result to send.");
      return;
    }

    try {
      alert("Send scanned result to: " + webhookUrl);
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scannedResult),
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.statusText}`
        );
      }

      const result = await response.json();
      alert("Webhook response: " + JSON.stringify(result));
    } catch (error) {
      alert("Error sending webhook request: " + error.message);
    }
  };

  const handleSearch = () => {
    if (scannedResult && scannedResult.textualData) {
      const searchQuery = encodeURIComponent(scannedResult.textualData);
      const searchEngines = {
        google: "https://www.google.com/search?q=",
        yahoo: "https://search.yahoo.com/search?p=",
        duckDuckGo: "https://www.duckduckgo.com/?q=",
        yandex: "https://yandex.com/search/?text=",
        bing: "https://www.bing.com/search?q=",
        brave: "https://search.brave.com/search?q=",
      };

      const baseUrl = searchEngines[permanentEngine] || searchEngines.google;
      const searchUrl = `${baseUrl}${searchQuery}`;
      window.open(searchUrl, "_blank");
    } else {
      console.error("No textual data available to search.");
    }
  };

  const saveWebhookConfig = () => {
    localStorage.setItem("webhookUrl", webhookUrl);
    localStorage.setItem("secretWord", secretWord);
    closeWebhookConfig();
  };

  const loadWebhookConfig = () => {
    setWebhookUrl(localStorage.getItem("webhookUrl") || "");
    setSecretWord(localStorage.getItem("secretWord") || "");
  };

  const resetWebhookConfig = () => {
    localStorage.removeItem("webhookUrl");
    localStorage.removeItem("secretWord");
    setWebhookUrl("");
    setSecretWord("");
  };

  const openConfirmDeletePopup = () => {
    setIsConfirmDeletePopupVisible(true);
  };

  const closeConfirmDeletePopup = () => {
    setIsConfirmDeletePopupVisible(false);
  };

  const deleteScan = () => {
    setRecentScans([]);
    // localStorage.removeItem('recentScans');
    closeConfirmDeletePopup();
  };

  const deleteScannedBarcode = () => {
    if (!selectedBarcode || !selectedBarcode.id) {
      console.error("Selected barcode is invalid or missing an ID");
      return;
    }

    setRecentScans((prevScans) => {
      const updatedScans = prevScans.filter(
        (barcode) => barcode.id !== selectedBarcode.id
      );
      return updatedScans;
    });

    closeBarcodeDetailsPopup();
  };

  const openBarcodeDetailsPopup = (barcode) => {
    setSelectedBarcode(barcode);
    setIsBarcodeDetailsPopupVisible(true);
  };

  const closeBarcodeDetailsPopup = () => {
    setIsBarcodeDetailsPopupVisible(false);
    setSelectedBarcode(null);
  };

  useEffect(() => {
    // Cleanup the effect on component unmount
    return () => {
      if (window.screen.orientation) {
        window.screen.orientation.unlock(); // Unlock orientation on cleanup
      }
    };
  }, []);

  return (
    <div id="container">
      <div
        className="app_title"
        style={{
          backgroundPosition:
            isScanning || scannedResult?.thumbnailImage ? "top" : "bottom",
        }}
      >
        <div className="title_settings_container">
          {isScanning && !scannedResult?.thumbnailImage && (
            <img
              onClick={stopScanning}
              alt="touch icon"
              src="/assets/close.svg"
            />
          )}
          <h2 style={{ width: "100%" }}>Capacitor + React</h2>
          <img
            alt="settings icon"
            src="/assets/Settings.svg"
            onClick={handleSettingsClick}
          />
        </div>
      </div>

      <div
        className={`btnContainer ${
          scannedResult?.type ? "animate-btnContainer" : ""
        }`}
        style={{
          borderRadius: !isScanning ? "14px 14px 0 0" : "0 0 0 0",
          borderTop: "4px solid red",
          height: "fit-content",
        }}
      >
        {scannedResult?.type && (
          <div className="resultContainer">
            <div className="line_container">
              <div className="results_line"></div>
            </div>
            <div className="result_text_img">
              <span className="result_title">{scannedResult?.type}</span>
              {scannedResult?.thumbnailImage && (
                <img
                  className="resultImage"
                  src={scannedResult?.thumbnailImage}
                  alt="Scanned Thumbnail"
                />
              )}
              <p>
                Result:
                <a href={scannedResult?.textualData}>
                  {scannedResult?.textualData}
                </a>
              </p>
            </div>
            <div className="results_btn_container">
              <button
                className="main_btn"
                onClick={handleCopyToClipboard}
              >
                <img
                  alt="copy icon"
                  src="/assets/Copy.svg"
                />
                Copy
              </button>
              <button className="main_btn">
                <img
                  alt="csv icon"
                  src="/assets/CSV.svg"
                />
                CSV
              </button>
              <button
                className="main_btn"
                onClick={handleWebhookConfiguration}
              >
                <img
                  alt="webhook icon"
                  src="/assets/Webhook.svg"
                />
                Webhook
              </button>
              <button
                className="main_btn"
                onClick={handleSearch}
              >
                <img
                  alt="search icon"
                  src="/assets/Search.svg"
                />
                Search
              </button>
            </div>
          </div>
        )}

        {!scannedResult?.type && (
          <div className="buttons">
            {!isScanning && (
              <div
                className="recent_scan_btn"
                onClick={handleOpenRecentScansPopup}
              >
                <img
                  width="40"
                  alt="recent scan icon"
                  src="/assets/recent.webp"
                />
                <span style={{ fontSize: "14px" }}>Recent</span>
              </div>
            )}
            {!isScanning && (
              <div
                className="actionButton"
                onClick={toggleScan}
              >
                <img
                  width="40"
                  alt="scan icon"
                  src="/assets/scan-circle.svg"
                />
              </div>
            )}
            {!isScanning && (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  width="40"
                  alt="info icon"
                  src="/assets/info.svg"
                />
              </div>
            )}
            {isScanning && (
              <div className="scanning_on_buttons">
                {isScanning && isFlashOn && (
                  <button
                    onClick={toggleFlash}
                    className="click_btn"
                  >
                    <img
                      alt="flash icon"
                      src="/assets/flash_on.svg"
                    />
                  </button>
                )}
                {isScanning && !isFlashOn && (
                  <button
                    onClick={toggleFlash}
                    className="click_btn"
                  >
                    <img
                      alt="flash icon"
                      src="/assets/flash_off.svg"
                    />
                  </button>
                )}
                {isScanning && currentZoomFactor > 1.0 && (
                  <button
                    onClick={zoomOut}
                    className="click_btn"
                  >
                    <img
                      alt="zoom out icon"
                      src="/assets/zoom_out.svg"
                    />
                  </button>
                )}
                {isScanning && currentZoomFactor <= 1.0 && (
                  <button
                    onClick={zoomIn}
                    className="click_btn"
                  >
                    <img
                      alt="zoom in icon"
                      src="/assets/Zoom.svg"
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div
        id="barkoderView"
        ref={barkoderViewRef}
        style={{
          height: "85vh",
          position: "relative",
          top: "60px",
        }}
      >
        {scannedResult?.resultImage && (
          <img
            className="fullResultImage"
            src={scannedResult?.resultImage}
            onClick={startScanning}
            alt="Scanned Thumbnail"
          />
        )}
        {scannedResult?.resultImage && (
          <div
            className="tap_anywhere_popup"
            onClick={startScanning}
          >
            <img
              alt="touch icon"
              src="../assets/touch_app.svg"
            />
            <span>Tap anywhere to continue</span>
          </div>
        )}
      </div>
      <div
        id="settingsPopup"
        style={{ display: isSettingsPopupVisible ? "block" : "none" }}
      >
        <div className="section_title_container">
          <img
            alt="back icon"
            src="/assets/back_arrow.svg"
            onClick={closeSettings}
          />
          <h2
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "22px",
            }}
          >
            Settings
          </h2>
        </div>

        <div className="settings_container">
          <div className="settings_title">
            <h3 style={{ margin: "0" }}>Webhook Settings</h3>
          </div>
          <div className="settings_item toggle_btn">
            <span>Enabled Webhook</span>
            <div className="toggle_switch">
              <input
                type="checkbox"
                id="enabled_webhook"
                checked={isWebhookEnabled}
                onChange={(e) => setIsWebhookEnabled(e.target.checked)}
              />
              <label htmlFor="enabled_webhook"></label>
            </div>
          </div>
          <div
            className={`settings_item ${isWebhookEnabled ? "" : "disabled"}`}
            onClick={handleWebhookConfigClick}
          >
            <span>Webhook Config</span>
            <div className="arrow_settings_container">
              <img
                alt="right icon"
                src="/assets/right_arrow.svg"
              />
            </div>
          </div>

          <div className="settings_item toggle_btn">
            <span>Webhook Confirmation Feedback</span>
            <div className="toggle_switch">
              <input
                type="checkbox"
                id="confirmation_feedback"
                checked={confirmationFeedback}
                onChange={(e) => setConfirmationFeedback(e.target.checked)}
              />
              <label htmlFor="confirmation_feedback"></label>
            </div>
          </div>
        </div>

        <div className="settings_container">
          <div className="settings_title">
            <h3 style={{ margin: "0" }}>General Settings</h3>
          </div>
          <div className="settings_item toggle_btn">
            <span>Enabled Search on Web</span>
            <div className="toggle_switch">
              <input
                type="checkbox"
                id="enabled_websearch"
                checked={isWebSearchEnabled}
                onChange={(e) => setIsWebSearchEnabled(e.target.checked)}
              />
              <label htmlFor="enabled_websearch"></label>
            </div>
          </div>
          <div
            className={`settings_item ${isWebSearchEnabled ? "" : "disabled"}`}
            onClick={handleOpenEnginesPopup}
          >
            <span>Default Search Engine</span>
            <div className="arrow_settings_container">
              <img
                alt="right icon"
                src="/assets/right_arrow.svg"
              />
            </div>
          </div>
        </div>

        <div className="settings_container">
          <div className="settings_title">
            <h3 style={{ margin: "0" }}>Scanning Mode Settings</h3>
          </div>
          <div
            className="settings_item"
            onClick={() => handleOpenCodesPopup("1d")}
          >
            <span>All 1D Barcodes</span>
            <div className="arrow_settings_container">
              {" "}
              <img
                alt="right icon"
                src="/assets/right_arrow.svg"
              />{" "}
            </div>
          </div>
          <div
            className="settings_item"
            onClick={() => handleOpenCodesPopup("2d")}
          >
            <span>All 2D Barcodes</span>
            <div className="arrow_settings_container">
              {" "}
              <img
                alt="right icon"
                src="/assets/right_arrow.svg"
              />{" "}
            </div>
          </div>
        </div>
      </div>

      <div
        id="recentScansPopup"
        style={{ display: isRecentScansPopupVisible ? "block" : "none" }}
      >
        <div
          className="section_title_container"
          style={{ position: "relative" }}
        >
          <img
            alt="back icon"
            src="/assets/back_arrow.svg"
            onClick={closeRecentScans}
          />
          <h2
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "22px",
            }}
          >
            Recent Scans
          </h2>
          <img
            alt="more options"
            src="/assets/more_vert.svg"
            onClick={openRecentScansMorePopup}
          />
        </div>

        <div
          id="morePopup"
          style={{ display: isMorePopupVisible ? "block" : "none" }}
          ref={morePopupRef}
        >
          <div className="more_popup_container">
            <div
              className={`delete_all_container ${
                recentScans.length < 1 ? "disabled" : ""
              }`}
              onClick={recentScans.length > 0 ? openConfirmDeletePopup : null}
            >
              <img
                alt="delete icon"
                src="/assets/delete.svg"
              />
              <span>Delete All</span>
            </div>
          </div>
        </div>

        <div className="recent_scans_container">
          {recentScans?.length > 0 ? (
            <div className="recent_scans_list">
              {recentScans?.map((scan, index) => (
                <div
                  key={index}
                  className="recent_scan_item"
                  onClick={() => openBarcodeDetailsPopup(scan, index)}
                >
                  <div className="recent_scan_details">
                    <div className="recent_scan_barcode_icon">
                      <img
                        alt="barcode icon"
                        src="/assets/1d-barcode.svg"
                      />
                    </div>
                    <div className="recent_text_info">
                      <span className="recent_scan_title">
                        {scan?.textualData}
                      </span>
                      <span className="recent_scan_subtitle">{scan?.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent scans.</p>
          )}
        </div>
      </div>

      <div
        id="barcodeDetailsPopup"
        style={{ display: isBarcodeDetailsPopupVisible ? "block" : "none" }}
      >
        <div
          className="section_title_container"
          style={{ position: "relative" }}
        >
          <img
            alt="back icon"
            src="/assets/back_arrow.svg"
            onClick={closeBarcodeDetailsPopup}
          />
          <h2
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "22px",
            }}
          >
            Barcode Details
          </h2>
          <img
            alt="more options"
            src="/assets/more_vert.svg"
            onClick={openDetailsMorePopup}
          />
        </div>

        <div className="details_image_container">
          <div className="details_icon_wrapper">
            <img
              width="48"
              alt="barcode icon"
              src="/assets/1d-barcode.svg"
            />
          </div>
        </div>
        <div className="details_section_title">
          <span>Data</span>
        </div>
        <div className="details_text_info">
          <span style={{ color: "#666666", fontWeight: 500, fontSize: "12px" }}>
            Barcode Type
          </span>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.5px",
              fontWeight: 500,
            }}
          >
            {selectedBarcode?.type}
          </span>
        </div>
        <div className="details_text_info">
          <span style={{ color: "#666666", fontWeight: 500, fontSize: "12px" }}>
            Value
          </span>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.5px",
              fontWeight: 500,
            }}
          >
            {selectedBarcode?.textualData}
          </span>
        </div>

        <div
          id="detailsMorePopup"
          style={{ display: isDetailsMorePopupVisible ? "block" : "none" }}
          ref={detailsMorePopupRef}
        >
          <div className="more_popup_container">
            <div
              className="delete_all_container"
              onClick={deleteScannedBarcode}
            >
              <img
                alt="delete icon"
                src="/assets/delete.svg"
              />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="confirmDeletePopup"
        style={{ display: isConfirmDeletePopupVisible ? "block" : "none" }}
        className="delete_popup_confirmation"
      >
        <div>
          <h4>This action permanently deletes all recent scans</h4>
          <div className="confirm_delete_container">
            <span
              className="confirm_buttons"
              onClick={closeConfirmDeletePopup}
            >
              CANCEL
            </span>
            <span
              className="confirm_buttons"
              onClick={deleteScan}
            >
              DELETE ALL
            </span>
          </div>
        </div>
      </div>

      <div
        id="webhookConfigPopup"
        style={{ display: isWebhookConfigVisible ? "block" : "none" }}
      >
        <div className="section_title_container">
          <img
            alt="back icon"
            src="/assets/back_arrow.svg"
            onClick={closeWebhookConfig}
          />
          <h3
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "16px",
            }}
          >
            Configure Webhook
          </h3>
          <span
            className="save_btn"
            onClick={saveWebhookConfig}
          >
            Save
          </span>
        </div>
        <div className="webhook_config_content">
          <input
            id="url"
            className="textInput"
            type="text"
            placeholder="Enter Webhook url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <input
            id="secret_word"
            className="textInput"
            type="text"
            placeholder="Enter Secret Word"
            value={secretWord}
            onChange={(e) => setSecretWord(e.target.value)}
          />

          <div className="webhook_config_btn_container">
            <button onClick={resetWebhookConfig}>Reset Value</button>
          </div>
        </div>
      </div>

      <div
        id="overlay"
        style={{
          display:
            isSearchEnginePopupVisible ||
            isConfirmDeletePopupVisible ||
            isBarcodesPopupVisible
              ? "block"
              : "none",
        }}
      ></div>

      <div
        id="searchEnginePopup"
        style={{ display: isSearchEnginePopupVisible ? "block" : "none" }}
      >
        <div style={{ padding: "8px", height: "auto", marginBottom: "16px" }}>
          <h3
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "24px",
              margin: "0",
            }}
          >
            Default Search Engine
          </h3>
        </div>

        <div className="engines_container">
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="google"
              value="google"
              checked={temporaryEngine === "google"}
              onChange={() => setTemporaryEngine("google")}
            />
            <label htmlFor="google">Google</label>
          </div>
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="yahoo"
              value="yahoo"
              checked={temporaryEngine === "yahoo"}
              onChange={() => setTemporaryEngine("yahoo")}
            />
            <label htmlFor="yahoo">Yahoo</label>
          </div>
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="duckDuckGo"
              value="duckDuckGo"
              checked={temporaryEngine === "duckDuckGo"}
              onChange={() => setTemporaryEngine("duckDuckGo")}
            />
            <label htmlFor="duckDuckGo">DuckDuckGo</label>
          </div>
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="yandex"
              value="yandex"
              checked={temporaryEngine === "yandex"}
              onChange={() => setTemporaryEngine("yandex")}
            />
            <label htmlFor="yandex">Yandex</label>
          </div>
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="bing"
              value="bing"
              checked={temporaryEngine === "bing"}
              onChange={() => setTemporaryEngine("bing")}
            />
            <label htmlFor="bing">Bing</label>
          </div>
          <div className="engine_checkbox_container">
            <input
              type="radio"
              name="engine_choice"
              id="brave"
              value="brave"
              checked={temporaryEngine === "brave"}
              onChange={() => setTemporaryEngine("brave")}
            />
            <label htmlFor="brave">Brave</label>
          </div>
        </div>
        <div className="footer_btn_container">
          <button onClick={closeEnginesPopup}>Cancel</button>
          <button onClick={saveSelectedEngine}>Save</button>
        </div>
      </div>

      <div
        id="barcodesPopup"
        style={{ display: isBarcodesPopupVisible ? "block" : "none" }}
      >
        <div style={{ padding: "8px", height: "auto", marginBottom: "16px" }}>
          <h3
            style={{
              width: "100%",
              textAlign: "start",
              color: "#291716",
              fontSize: "24px",
              margin: "0",
            }}
          >
            {popupType === "1d" ? "1D Barcodes" : "2D Barcodes"}
          </h3>
        </div>

        <div className="barcode-checkboxes">
          {barcodeTypes
            .filter((barcode) => barcode.mode === popupType)
            .map((barcode) => (
              <div
                key={barcode.type}
                className="switch_toggle"
              >
                <input
                  type="checkbox"
                  id={barcode.type}
                  checked={enabledBarcodes[barcode.type] || false}
                  onChange={() => handleBarcodeToggle(barcode.type)}
                />
                <label htmlFor={barcode.type}></label>
                <span className="slider"></span>
                <span className="label_text">{barcode.name}</span>
              </div>
            ))}
        </div>

        <div className="footer_btn_container">
          <button onClick={closeBarcodesPopup}>Close</button>
          <button onClick={toggleAllBarcodes}>Toggle All</button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScannerApp;
