import { QinSoul } from "qin_soul";
import { QinWindow } from "./qin-window";

const qinWindow = new QinWindow();
qinWindow.putInDocument();

window.onload = () => {
    QinSoul.head.stopBrowserShortcuts(window);
};
