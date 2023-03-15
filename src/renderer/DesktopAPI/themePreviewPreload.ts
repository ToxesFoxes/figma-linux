import { ipcRenderer } from "electron";
import { themes } from "./ThemesApplier";

(async () => {
  document.addEventListener("DOMContentLoaded", () => {
    ipcRenderer.invoke("themesIsDisabled").then((disabled) => {
      if (!disabled) {
        setTimeout(() => {
          themes.init();
          themes.registerEventsForPreview();
        }, 10);
      }
    });
  });

  function keydownHandler(event: KeyboardEvent) {
    if (event.code === "ControlLeft") {
      ipcRenderer.send("toggleThemeCreatorPreviewMask");
    }
  }

  document.addEventListener("keydown", keydownHandler);
})();