import { Qinpel } from "./qinpel";

const qinpel = (window.frameElement as any).qinpel as Qinpel;
qinpel.qinFrame.statusInfo(
    qinpel.tr("You must inform your user and pass to enter."),
    "{qin_desk}(ErrCode-000003)"
);
const inputUser = document.getElementById("loginUser") as HTMLInputElement;
const inputPass = document.getElementById("loginPass") as HTMLInputElement;
const buttonEnter = document.getElementById("loginEnter") as HTMLButtonElement;
qinpel.ours.soul.arms.addActions([inputUser, inputPass, buttonEnter], (qinEvent) => {
    function isActionTrigger(): boolean {
        if (qinEvent.fromOrigin == inputUser || qinEvent.fromOrigin == inputPass) {
            return qinEvent.isMainKey;
        } else {
            return qinEvent.isMain;
        }
    }
    if (isActionTrigger()) {
        const user = inputUser.value;
        const pass = inputPass.value;
        qinpel.qinWindow
            .tryEnter(user, pass)
            .then((_) => {
                qinpel.qinFrame.statusInfo(
                    qinpel.tr("Successfully entry with user ") + user,
                    "{qin_desk}(ErrCode-000004)"
                );
                qinpel.qinFrame.navigate("./desk.html");
            })
            .catch((err) => {
                qinpel.qinFrame.showAlert(qinpel.tr("Problem on enter: ") + err);
            });
    }
});
