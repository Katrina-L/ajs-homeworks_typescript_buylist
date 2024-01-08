import Buyable from "./Buyable";

export default class Book implements Buyable {
    discount: number = 0;
    constructor(
        readonly id: number,
        readonly price: number,
        readonly name: string,
        readonly author: string,
        readonly pages: number,
        readonly quantity: number = 1
    ) {}
}
