"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "valaxy-fromt-matter" is now active, and it only work in text editor mode.');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerTextEditorCommand('extension.valaxyFrontMatter', (textEditor, edit) => {
        // The code you place here will be executed every time your command is executed
        console.log('valaxy-fromt-matter TextEditorCommand toggle...');
        const date = (0, moment_1.default)().format('YYYY-MM-DD');
        const fileName = textEditor.document.fileName;
        // const id = moment(date).format('X');
        const sepPos = fileName.lastIndexOf(path_1.default.sep);
        // Example: /Users/Flynn/abc.md
        // pos = 13, len = 15
        if (sepPos === -1) {
            vscode.window.showInformationMessage('Path is not valid, please check it.');
            return;
        }
        const fileTitle = fileName.substring(sepPos + 1, fileName.lastIndexOf('.') !== -1 ? fileName.lastIndexOf('.') : fileName.length);
        // const fileTitle = fileName.substring(slashPos + 1, pos === -1 ? fileName.length : pos);
        console.log("fileTitle:", fileTitle);
        const result = `---
title: ${fileTitle}
date: ${date}
updated: ${date}
hide: false
tags:
  - untagged
categories:
  - uncategorized
---\n`;
        textEditor.edit((editBuilder) => {
            editBuilder.insert(new vscode.Position(0, 0), result);
        });
        // Display a status bar message to the user
        vscode.window.setStatusBarMessage('Valaxy front matter added for ' + fileName, 4000);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map