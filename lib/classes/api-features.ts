import { Query } from "mongoose";

export default class Features {
  query: Query<any, any>;
  queryString: { keyword: string };
  constructor(query: Query<any, any>, queryString: { keyword: string }) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    console.log(this.query);
    return this;
  }

  /**
   * Filtering for category
   */
  filter() {
    const queryString = { ...this.queryString } as any;
    const fieldsToRemove = ["keyword", "page", "limit"];
    fieldsToRemove.forEach((key) => delete queryString[key]);
    this.query = this.query.find(queryString);
    return this;
  }
}
