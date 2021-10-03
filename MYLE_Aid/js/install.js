let deferredInstallPrompt = null;
const installButton = document.getElementById('buttonInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// On affiche le bouton si Chrome détecte une PWA
function saveBeforeInstallPromptEvent(evt) {

    //CODELAB: Add code to save event & show the install button
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden'); 
}


/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();

    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice
    .then((choice) => {
        if (choice.outcome === 'accepted') {
            // Hide the install button, it can't be called twice.
            installButton.setAttribute('hidden', true);
            console.log('Usager a accepté l\'installation du PWA', choice);
        } else {
            console.log('Usager n\'a pas accepté l\'installation du PWA', choice);
        }
    });
    deferredInstallPrompt = null;
}


// Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
/**
* Event handler for appinstalled event.
*   Log the installation to analytics or save the event somehow.
*
* @param {Event} evt
*/
function logAppInstalled(evt) {
    // Add code to log the event
    console.log('Weather App was installed.', evt);
    installButton.setAttribute('hidden', true);
}
