import { nanoid } from "nanoid";

export default class Item {
  public ID: string;
  public userID: string;
  public title: string;
  public description: string;
  public imgSrc: string;
  public isClaimed: boolean;

  constructor(
    userID: string,
    title: string,
    description: string,
    imgSrc: string
  ) {
    this.ID = nanoid(8);
    this.userID = userID;
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.isClaimed = false;
  }
}
