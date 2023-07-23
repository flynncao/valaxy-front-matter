// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import moment from 'moment';
import path from 'path';
import * as vscode from 'vscode';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "valaxy-fromt-matter" is now active, and it only work in text editor mode.');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerTextEditorCommand('extension.valaxyFrontMatter', (textEditor, edit) => {
        // The code you place here will be executed every time your command is executed
        console.log('valaxy-fromt-matter TextEditorCommand toggle...');

        const date = moment().format('YYYY-MM-DD');
				const fileName = textEditor.document.fileName;
				// const id = moment(date).format('X');

				const sepPos = fileName.lastIndexOf(path.sep);
				// Example: /Users/Flynn/abc.md
				// pos = 13, len = 15
				if (sepPos === -1) {
					vscode.window.showInformationMessage('Path is not valid, please check it.');
					return;
				}
				
				const fileTitle = fileName.substring(
					sepPos + 1,
					fileName.lastIndexOf('.') !== -1 ? fileName.lastIndexOf('.') : fileName.length
				);
        // const fileTitle = fileName.substring(slashPos + 1, pos === -1 ? fileName.length : pos);
        console.log("fileTitle:", fileTitle);
        const result = `---
title: ${fileTitle}
date: ${date}
updated: ${date}
hide: false
top: 0
tags:
  - untagged
categories:
  - uncategorized
---\n
:::zh-CN
这是中文内容
:::
:::en
This is English content
:::`;
        textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), result);
        });

        // Display a status bar message to the user
        vscode.window.setStatusBarMessage('Valaxy front matter added for ' + fileName, 4000);
    });

    context.subscriptions.push(disposable);
}
