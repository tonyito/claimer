import { nanoid } from "nanoid";

export default class ClaimSale {
  public ID: string;
  public userID: string;
  public itemIDs: string[];
  public startTime: number;
  public endTime: number;
  public interval: number;
  public title: string;
  public description: string;

  constructor(
    userID: string,
    itemIDs: string[],
    startTime: number,
    endTime: number,
    interval: number,
    title: string,
    description: string
  ) {
    this.ID = nanoid(8);
    this.userID = userID;
    this.itemIDs = itemIDs;
    this.startTime = startTime;
    this.endTime = endTime;
    this.interval = interval;
    this.title = title;
    this.description = description;
  }
}
