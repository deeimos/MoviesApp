import { makeAutoObservable } from "mobx";

export default class ConfirmModalStore {
  show: boolean;
  title: string = "";
  text: string = "";
  callback: () => void = () => {};

  constructor() {
    this.show = false;
    makeAutoObservable(this);
  }

  public showModal = (callback: () => void, title: string, text: string) => {
    this.callback = callback;
    this.title = title;
    this.text = text;
    this.show = true;
  };

  public closeModal = () => {
    this.show = false;
    this.callback = () => {};
  };

  public confirm = () => {
    this.callback();
    this.closeModal();
  };
}
