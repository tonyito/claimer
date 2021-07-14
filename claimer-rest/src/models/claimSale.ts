import { nanoid } from "nanoid";

export default class ClaimSale {
  public id: string;
  public userId: string;
  public itemIds: string[];
  public startTime: number;
  public endTime: number;
  public interval: number;
  public title: string;
  public description: string;

  constructor(
    userId: string,
    itemIds: string[],
    startTime: number,
    endTime: number,
    interval: number,
    title: string,
    description: string
  ) {
    this.id = nanoid(8);
    this.userId = userId;
    this.itemIds = itemIds;
    this.startTime = startTime;
    this.endTime = endTime;
    this.interval = interval;
    this.title = title;
    this.description = description;
  }
}
