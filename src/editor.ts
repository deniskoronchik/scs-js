import { editor } from 'monaco-editor';
import { kLangName } from './scs_support';

export type ContentChangedCallback = (value: String) => void;

export class SCsEditor {
  private _container: HTMLElement = null;
  private _editor: editor.IStandaloneCodeEditor = null;
  private _onContentChanged: ContentChangedCallback = null;

  constructor(container: HTMLElement, value?: string, theme: string = kLangName, onContentChanged: ContentChangedCallback = null) {
    this._container = container;
    this._editor = editor.create(this._container, {
      language: kLangName,
      theme: theme,
      automaticLayout: true,
    });

    this._onContentChanged = onContentChanged;

    this._editor.getModel().onDidChangeContent((e: editor.IModelContentChangedEvent) => {
      if (this._onContentChanged)
        this._onContentChanged(this.content);
    });

    if (value)
      this.content = value;
  }

  public get onContentChanged() : ContentChangedCallback {
    return this._onContentChanged;
  }

  public set onContentChanged(callback: ContentChangedCallback) {
    this._onContentChanged = callback;
  }

  public get content() : string {
    return this._editor.getValue();
  }

  public set content(newValue: string) {
    this._editor.setValue(newValue);
  }
};