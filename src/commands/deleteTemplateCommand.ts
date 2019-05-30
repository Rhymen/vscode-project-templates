'use strict';

import vscode = require("vscode");

import ProjectTemplatesPlugin from "../projectTemplatesPlugin";

/**
 * Main command to delete an existing template.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {ProjectTemplatesPlugin} templateManager
 * @param {*} args
 */
export async function run(templateManager: ProjectTemplatesPlugin, args: any) {

    // load latest configuration
    templateManager.updateConfiguration(vscode.workspace.getConfiguration('projectTemplates'));

    // choose a template then delete
    templateManager.chooseTemplate(false).then( 
        template => {
            // no template chosen, simply exit
            if (!template) {
                return;
            }

            // delete template
            templateManager.deleteTemplate(template).then(
                (deleted : boolean) => { 
                    if (deleted) {
                        vscode.window.showInformationMessage("Deleted template '" + template + "'");
                    }
                },
                (reason : any) => { 
                    vscode.window.showErrorMessage("Failed to delete template '" + template + "': " + reason);
                }
            );
        }
    );
    
}