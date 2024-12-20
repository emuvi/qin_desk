import { QinSoul } from "qin_soul";
import { QinWindow } from "./qin-window";

const chief = new QinWindow();
chief.putInDocument();

window.onload = () => {
    QinSoul.head.stopBrowserShortcuts(window);
};
