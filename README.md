# Capacitor Starter Example with barKoder Barcode Scanner SDK
## Introduction
This is a starter app example with React JS, showcasing the integration of the barKoder Barcode Scanner SDK for Capacitor. The barKoder Barcode Scanner SDK is an enterprise-grade solution that provides a highly customizable interface for barcode scanning in both iOS and Android apps.

## Key Features:
* Utilizes React JS for building the app's user interface.
* Integrates the barKoder Barcode Scanner SDK to enable advanced barcode scanning.
* Leverages Capacitor for seamless cross-platform deployment to iOS and Android.
* Supports a wide range of barcode types, including 1D and 2D barcodes.


# barKoder Barcode Scanner SDK plugin for Capacitor
The barKoder Barcode Scanner SDK is designed to transform smartphones and tablets into rugged barcode scanning devices. It boasts a robust barcode reading engine that supports various barcode types with exceptional speed and recognition rates.

## Supported Barcode Types:
* 1D: Codabar, Code 11, Code 25, Code 39, Code 93, Code 128, DotCode, EAN-8, EAN-13, Interleaved 2 of 5, ITF-14, MSI Plessey, Pharmacode, Telepen, UPC-A, UPC-E.
* 2D: Aztec Code, Aztec Compact, Data Matrix, PDF417, Micro PDF417, QR Code, Micro QR Code.

  
## Advanced Features:
* DPM Mode for decoding Data Matrix barcodes engraved using any DPM technique.
* MatrixSight algorithm for scanning QR Codes or Data Matrix barcodes with missing patterns.
* Segment Decoding for recognizing 1D barcodes with deformations along their Z axis.
* VIN Barcode Scanning Mode for advanced scanning of Vehicle Identification Numbers.
* DeBlur Mode for eliminating blur in EAN or UPC barcodes.
* PDF417-LineSight for detecting severely damaged PDF417 codes.



## Documentation
You can find full documentation about the barKoder Barcode Reader SDK here: https://docs.barkoder.com/en/capacitor-installation

## Trial License

If you run the barKoder Barcode Scanner SDK without a valid trial or production license, all results upon successful barcode scans will be partially masked by asterisks (*). You can get a trial license simply by [registering on the barKoder Portal](https://barkoder.com/register) and utilizing the self-service for [Evaluation License Generation](https://barkoder.com/spr/new)! Each trial license will be good for an initial duration of 30 days and can be deployed to up to 25 devices. For any custom requirements, contact our sales team via sales@barkoder.com

**Note:** Trial licenses are for development or staging environments only. Do not publish a trial license with your app to public stores.

## Free Developer Support

Our support is completely free for integration or testing purposes and granted through the [barKoder Portal](https://barkoder.com/login). After registering and logging into your account, you only need to submit a [Support Issue](https://barkoder.com/issues) form. Alternatively, you can contact us by email via support@barkoder.com.

## Requirements

Capacitor is a cross-platform app runtime that makes it easy to build web apps that run natively on iOS, Android and the web. To get started with building apps using Capacitor, you'll need to meet certain requirements:

1. **Node.js and npm:**
   - Ensure you have Node.js installed on your machine. Capacitor requires Node.js version 10 or later.
   - npm (Node Package Manager) is also required. It usually comes with Node.js.
2. **Text Editor or IDE:**
   - Choose a text editor or IDE for coding (e.g., Visual Studio Code).
3. **Git:**
   - Install Git for managing projects.
4. **Command Line Interface (CLI):**
   - Capacitor commands are executed via the command line. Make sure you have a command line interface (CLI) installed and accessible on your system.
5. **Mobile Development SDKs:**
   - For iOS: Install Xcode (macOS).
   - For Android: Install Android Studio.

  
# Getting Started

## Dependencies
  - react
  - @capacitor/cli
  - @capacitor/core
  - barkoder-capacitor
  - @capacitor/android
  - @capacitor/ios
  - @capacitor/camera

1. **Open IDE and Start Coding:**
   - Open your chosen IDE or text editor and start building your app

2. **Install the required dependencies:**
   ```bash
   npm install
   ```
3. **Add platforms for iOS and Android**
   ```bash
   npx cap add ios
   npx cap add android
   ```
4. **Build the project and Synchronize the project with Capacitor:**
   ```bash
   npm run build
   npx cap sync
   ```
5. **Open the project in your chosen IDE or text editor:**
   ```bash
   npx cap open ios
   npx cap open android
   ```
6. **If you dont't have global android SDK env do this:** <br />
   - Create local.properties file in android folder and enter path:
   ```bash
   sdk.dir = C://Users//YOUR_USERNAME//AppData//Local//Android//sdk
7. **Camera permissions:** <br />
   Our SDK requires camera permission to be granted in order to use scanning features.
   - For Android, the permission is set in the manifest from the package.
   - For iOS you need to specify camera permission in Info.plist file inside your project

    ```bash
   <key>NSCameraUsageDescription</key>
   <string>Camera permission</string>
   ```
8. **Start coding and customize the app to meet your specific requirements.**
   
These steps provide a basic overview, and the Capacitor documentation may have been updated since our last knowledge update. It's always a good idea to refer to the official Capacitor documentation for the latest and most accurate information: [Capacitor Documentation](https://capacitorjs.com/docs).


## Manual Installation

If you prefer installing from a local folder, follow these steps:

- Download the zip file
- Unpack the zip file
- Paste the folder in app directory ex. **myApp/barkoder-capacitor** 
- Run the following command:

```bash
npm install 
```

## Usage with React

In your react component file:
```bash
import React, { useEffect, useRef, useState } from "react";
import { Barkoder, BarcodeType } from "barkoder-capacitor";
import "./App.css";

const BarcodeScannerApp = () => {
  const barkoderViewRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

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
    { name: "Japanese Post", type: "japanesePost", mode: "1d" }
  ];

  const [enabledBarcodes, setEnabledBarcodes] = useState(
    barcodeTypes.reduce((acc, barcode) => {
      acc[barcode.type] = true;
      return acc;
    }, {})
  );

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
      console.error('Error setting Barkoder settings:', error);
      throw error;
    }
  };

  const initializeBarkoder = async () => {
    if (!barkoderViewRef.current) return;
    const boundingRect = barkoderViewRef.current.getBoundingClientRect();
    try {
      await Barkoder.registerWithLicenseKey({
        licenseKey: "YOUR_KEY",
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

  const handleScanResult = (barkoderResult) => {
    const randomId = Math.floor(Math.random() * 1000000);

    setScannedResult({
      id: randomId,
      textualData: barkoderResult?.decoderResults[0]?.textualData || "No data available",
      type: barkoderResult?.decoderResults[0]?.barcodeTypeName || "Unknown type",
      resultImage: `data:image/jpeg;base64,${barkoderResult?.resultImageAsBase64 || ""}`,
      thumbnailImage: `data:image/jpeg;base64,${barkoderResult?.resultThumbnailsAsBase64[0] || ""}`,
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

  const stopScanning = async () => {
    setScannedResult({
      textualData: null,
      type: null,
      resultImage: null,
      thumbnailImage: null,
    });
    setIsScanning(false);
    await Barkoder.stopScanning();
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
    if (Barkoder) {
      const handleBarkoderEvent = (barkoderResult) => {
        handleScanResult(barkoderResult);
      };
      Barkoder.addListener("barkoderResultEvent", handleBarkoderEvent);
    }
  }, [Barkoder]);

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
            <img onClick={stopScanning} alt="touch icon" src="/assets/close.svg" />
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
              <button className="main_btn" onClick={handleCopyToClipboard}>
                <img alt="copy icon" src="/assets/Copy.svg" />
                Copy
              </button>
              <button className="main_btn">
                <img alt="csv icon" src="/assets/CSV.svg" />
                CSV
              </button>
              <button className="main_btn" onClick={handleWebhookConfiguration}>
                <img alt="webhook icon" src="/assets/Webhook.svg" />
                Webhook
              </button>
              <button className="main_btn" onClick={handleSearch}>
                <img alt="search icon" src="/assets/Search.svg" />
                Search
              </button>
            </div>
          </div>
        )}

        {!scannedResult?.type && (
          <div className="buttons">
            {!isScanning && (
              <div className="recent_scan_btn" onClick={handleOpenRecentScansPopup}>
                <img width="40" alt="recent scan icon" src="/assets/recent.webp" />
                <span style={{ fontSize: "14px" }}>Recent</span>
              </div>
            )}
            {!isScanning && (
              <div className="actionButton" onClick={toggleScan}>
                <img width="40" alt="scan icon" src="/assets/scan-circle.svg" />
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
                <img width="40" alt="info icon" src="/assets/info.svg" />
              </div>
            )}
            {isScanning && (
              <div className="scanning_on_buttons">
                {isScanning && isFlashOn && (
                  <button onClick={toggleFlash} className="click_btn">
                    <img alt="flash icon" src="/assets/flash_on.svg" />
                  </button>
                )}
                {isScanning && !isFlashOn && (
                  <button onClick={toggleFlash} className="click_btn">
                    <img alt="flash icon" src="/assets/flash_off.svg" />
                  </button>
                )}
                {isScanning && currentZoomFactor > 1.0 && (
                  <button onClick={zoomOut} className="click_btn">
                    <img alt="zoom out icon" src="/assets/zoom_out.svg" />
                  </button>
                )}
                {isScanning && currentZoomFactor <= 1.0 && (
                  <button onClick={zoomIn} className="click_btn">
                    <img alt="zoom in icon" src="/assets/Zoom.svg" />
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
          <div className="tap_anywhere_popup" onClick={startScanning}>
            <img alt="touch icon" src="../assets/touch_app.svg" />
            <span>Tap anywhere to continue</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScannerApp;
```


## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`registerWithLicenseKey(...)`](#registerwithlicensekey)
* [`setZoomFactor(...)`](#setzoomfactor)
* [`setFlashEnabled(...)`](#setflashenabled)
* [`startCamera()`](#startcamera)
* [`startScanning()`](#startscanning)
* [`stopScanning()`](#stopscanning)
* [`pauseScanning()`](#pausescanning)
* [`setLocationLineColor(...)`](#setlocationlinecolor)
* [`setLocationLineWidth(...)`](#setlocationlinewidth)
* [`setRoiLineColor(...)`](#setroilinecolor)
* [`setRoiLineWidth(...)`](#setroilinewidth)
* [`setRoiOverlayBackgroundColor(...)`](#setroioverlaybackgroundcolor)
* [`setCloseSessionOnResultEnabled(...)`](#setclosesessiononresultenabled)
* [`setImageResultEnabled(...)`](#setimageresultenabled)
* [`setLocationInImageResultEnabled(...)`](#setlocationinimageresultenabled)
* [`setRegionOfInterest(...)`](#setregionofinterest)
* [`setThreadsLimit(...)`](#setthreadslimit)
* [`setLocationInPreviewEnabled(...)`](#setlocationinpreviewenabled)
* [`setPinchToZoomEnabled(...)`](#setpinchtozoomenabled)
* [`setRegionOfInterestVisible(...)`](#setregionofinterestvisible)
* [`setBarkoderResolution(...)`](#setbarkoderresolution)
* [`setBeepOnSuccessEnabled(...)`](#setbeeponsuccessenabled)
* [`setVibrateOnSuccessEnabled(...)`](#setvibrateonsuccessenabled)
* [`showLogMessages(...)`](#showlogmessages)
* [`setBarcodeTypeLengthRange(...)`](#setbarcodetypelengthrange)
* [`setEncodingCharacterSet(...)`](#setencodingcharacterset)
* [`setDecodingSpeed(...)`](#setdecodingspeed)
* [`setFormattingType(...)`](#setformattingtype)
* [`setCode11ChecksumType(...)`](#setcode11checksumtype)
* [`setMsiChecksumType(...)`](#setmsichecksumtype)
* [`setCode39ChecksumType(...)`](#setcode39checksumtype)
* [`setBarcodeTypeEnabled(...)`](#setbarcodetypeenabled)
* [`setMulticodeCachingEnabled(...)`](#setmulticodecachingenabled)
* [`setMulticodeCachingDuration(...)`](#setmulticodecachingduration)
* [`setMaximumResultsCount(...)`](#setmaximumresultscount)
* [`setBarcodeThumbnailOnResultEnabled(...)`](#setbarcodethumbnailonresultenabled)
* [`setDuplicatesDelayMs(...)`](#setduplicatesdelayms)
* [`setThresholdBetweenDuplicatesScans(...)`](#setthresholdbetweenduplicatesscans)
* [`setUpcEanDeblurEnabled(...)`](#setupceandeblurenabled)
* [`setMisshaped1DEnabled(...)`](#setmisshaped1denabled)
* [`setEnableVINRestrictions(...)`](#setenablevinrestrictions)
* [`isFlashAvailable()`](#isflashavailable)
* [`isCloseSessionOnResultEnabled()`](#isclosesessiononresultenabled)
* [`isImageResultEnabled()`](#isimageresultenabled)
* [`isLocationInImageResultEnabled()`](#islocationinimageresultenabled)
* [`isLocationInPreviewEnabled()`](#islocationinpreviewenabled)
* [`isPinchToZoomEnabled()`](#ispinchtozoomenabled)
* [`isRegionOfInterestVisible()`](#isregionofinterestvisible)
* [`isBeepOnSuccessEnabled()`](#isbeeponsuccessenabled)
* [`isVibrateOnSuccessEnabled()`](#isvibrateonsuccessenabled)
* [`getVersion()`](#getversion)
* [`getLocationLineColorHex()`](#getlocationlinecolorhex)
* [`getRoiLineColorHex()`](#getroilinecolorhex)
* [`getRoiOverlayBackgroundColorHex()`](#getroioverlaybackgroundcolorhex)
* [`getMaxZoomFactor()`](#getmaxzoomfactor)
* [`getLocationLineWidth()`](#getlocationlinewidth)
* [`getRoiLineWidth()`](#getroilinewidth)
* [`getRegionOfInterest()`](#getregionofinterest)
* [`getBarcodeTypeLengthRange(...)`](#getbarcodetypelengthrange)
* [`getMsiChecksumType()`](#getmsichecksumtype)
* [`getCode39ChecksumType()`](#getcode39checksumtype)
* [`getCode11ChecksumType()`](#getcode11checksumtype)
* [`getEncodingCharacterSet()`](#getencodingcharacterset)
* [`getDecodingSpeed()`](#getdecodingspeed)
* [`getFormattingType()`](#getformattingtype)
* [`getThreadsLimit()`](#getthreadslimit)
* [`getMaximumResultsCount()`](#getmaximumresultscount)
* [`getDuplicatesDelayMs()`](#getduplicatesdelayms)
* [`isBarcodeTypeEnabled(...)`](#isbarcodetypeenabled)
* [`getMulticodeCachingEnabled()`](#getmulticodecachingenabled)
* [`getMulticodeCachingDuration()`](#getmulticodecachingduration)
* [`isUpcEanDeblurEnabled()`](#isupceandeblurenabled)
* [`isMisshaped1DEnabled()`](#ismisshaped1denabled)
* [`isBarcodeThumbnailOnResultEnabled()`](#isbarcodethumbnailonresultenabled)
* [`getThresholdBetweenDuplicatesScans()`](#getthresholdbetweenduplicatesscans)
* [`isVINRestrictionsEnabled()`](#isvinrestrictionsenabled)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: { width: number; height: number; x: number; y: number; }) => Promise<any>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code>{ width: number; height: number; x: number; y: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### registerWithLicenseKey(...)

```typescript
registerWithLicenseKey(options: { licenseKey: string; }) => Promise<any>
```

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ licenseKey: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setZoomFactor(...)

```typescript
setZoomFactor(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setFlashEnabled(...)

```typescript
setFlashEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### startCamera()

```typescript
startCamera() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### startScanning()

```typescript
startScanning() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### stopScanning()

```typescript
stopScanning() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### pauseScanning()

```typescript
pauseScanning() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setLocationLineColor(...)

```typescript
setLocationLineColor(options: { value: string; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setLocationLineWidth(...)

```typescript
setLocationLineWidth(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setRoiLineColor(...)

```typescript
setRoiLineColor(options: { value: string; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setRoiLineWidth(...)

```typescript
setRoiLineWidth(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setRoiOverlayBackgroundColor(...)

```typescript
setRoiOverlayBackgroundColor(options: { value: string; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setCloseSessionOnResultEnabled(...)

```typescript
setCloseSessionOnResultEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setImageResultEnabled(...)

```typescript
setImageResultEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setLocationInImageResultEnabled(...)

```typescript
setLocationInImageResultEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setRegionOfInterest(...)

```typescript
setRegionOfInterest(options: { left: number; top: number; width: number; height: number; }) => Promise<any>
```

| Param         | Type                                                                       |
| ------------- | -------------------------------------------------------------------------- |
| **`options`** | <code>{ left: number; top: number; width: number; height: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setThreadsLimit(...)

```typescript
setThreadsLimit(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setLocationInPreviewEnabled(...)

```typescript
setLocationInPreviewEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setPinchToZoomEnabled(...)

```typescript
setPinchToZoomEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setRegionOfInterestVisible(...)

```typescript
setRegionOfInterestVisible(options: { value: boolean; }) => Promise<any>
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ value: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setBarkoderResolution(...)

```typescript
setBarkoderResolution(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setBeepOnSuccessEnabled(...)

```typescript
setBeepOnSuccessEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setVibrateOnSuccessEnabled(...)

```typescript
setVibrateOnSuccessEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### showLogMessages(...)

```typescript
showLogMessages(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setBarcodeTypeLengthRange(...)

```typescript
setBarcodeTypeLengthRange(options: { type: number; min: number; max: number; }) => Promise<any>
```

| Param         | Type                                                     |
| ------------- | -------------------------------------------------------- |
| **`options`** | <code>{ type: number; min: number; max: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setEncodingCharacterSet(...)

```typescript
setEncodingCharacterSet(options: { value: string; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: string; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setDecodingSpeed(...)

```typescript
setDecodingSpeed(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setFormattingType(...)

```typescript
setFormattingType(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setCode11ChecksumType(...)

```typescript
setCode11ChecksumType(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setMsiChecksumType(...)

```typescript
setMsiChecksumType(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setCode39ChecksumType(...)

```typescript
setCode39ChecksumType(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setBarcodeTypeEnabled(...)

```typescript
setBarcodeTypeEnabled(options: { type: number; enabled: boolean; }) => Promise<any>
```

| Param         | Type                                             |
| ------------- | ------------------------------------------------ |
| **`options`** | <code>{ type: number; enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setMulticodeCachingEnabled(...)

```typescript
setMulticodeCachingEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setMulticodeCachingDuration(...)

```typescript
setMulticodeCachingDuration(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setMaximumResultsCount(...)

```typescript
setMaximumResultsCount(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setBarcodeThumbnailOnResultEnabled(...)

```typescript
setBarcodeThumbnailOnResultEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setDuplicatesDelayMs(...)

```typescript
setDuplicatesDelayMs(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setThresholdBetweenDuplicatesScans(...)

```typescript
setThresholdBetweenDuplicatesScans(options: { value: number; }) => Promise<any>
```

| Param         | Type                            |
| ------------- | ------------------------------- |
| **`options`** | <code>{ value: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setUpcEanDeblurEnabled(...)

```typescript
setUpcEanDeblurEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setMisshaped1DEnabled(...)

```typescript
setMisshaped1DEnabled(options: { enabled: boolean; }) => Promise<any>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ enabled: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### setEnableVINRestrictions(...)

```typescript
setEnableVINRestrictions(options: { value: boolean; }) => Promise<any>
```

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | <code>{ value: boolean; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isFlashAvailable()

```typescript
isFlashAvailable() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isCloseSessionOnResultEnabled()

```typescript
isCloseSessionOnResultEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isImageResultEnabled()

```typescript
isImageResultEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isLocationInImageResultEnabled()

```typescript
isLocationInImageResultEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isLocationInPreviewEnabled()

```typescript
isLocationInPreviewEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isPinchToZoomEnabled()

```typescript
isPinchToZoomEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isRegionOfInterestVisible()

```typescript
isRegionOfInterestVisible() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isBeepOnSuccessEnabled()

```typescript
isBeepOnSuccessEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isVibrateOnSuccessEnabled()

```typescript
isVibrateOnSuccessEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getVersion()

```typescript
getVersion() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getLocationLineColorHex()

```typescript
getLocationLineColorHex() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getRoiLineColorHex()

```typescript
getRoiLineColorHex() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getRoiOverlayBackgroundColorHex()

```typescript
getRoiOverlayBackgroundColorHex() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getMaxZoomFactor()

```typescript
getMaxZoomFactor() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getLocationLineWidth()

```typescript
getLocationLineWidth() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getRoiLineWidth()

```typescript
getRoiLineWidth() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getRegionOfInterest()

```typescript
getRegionOfInterest() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getBarcodeTypeLengthRange(...)

```typescript
getBarcodeTypeLengthRange(options: { type: number; }) => Promise<any>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ type: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getMsiChecksumType()

```typescript
getMsiChecksumType() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getCode39ChecksumType()

```typescript
getCode39ChecksumType() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getCode11ChecksumType()

```typescript
getCode11ChecksumType() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getEncodingCharacterSet()

```typescript
getEncodingCharacterSet() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getDecodingSpeed()

```typescript
getDecodingSpeed() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getFormattingType()

```typescript
getFormattingType() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getThreadsLimit()

```typescript
getThreadsLimit() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getMaximumResultsCount()

```typescript
getMaximumResultsCount() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getDuplicatesDelayMs()

```typescript
getDuplicatesDelayMs() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isBarcodeTypeEnabled(...)

```typescript
isBarcodeTypeEnabled(options: { type: number; }) => Promise<any>
```

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ type: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getMulticodeCachingEnabled()

```typescript
getMulticodeCachingEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getMulticodeCachingDuration()

```typescript
getMulticodeCachingDuration() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isUpcEanDeblurEnabled()

```typescript
isUpcEanDeblurEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isMisshaped1DEnabled()

```typescript
isMisshaped1DEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isBarcodeThumbnailOnResultEnabled()

```typescript
isBarcodeThumbnailOnResultEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getThresholdBetweenDuplicatesScans()

```typescript
getThresholdBetweenDuplicatesScans() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### isVINRestrictionsEnabled()

```typescript
isVINRestrictionsEnabled() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------
