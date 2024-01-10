import Buyable from "./Buyable";

export default class Gadget implements Buyable {
    discount: number = 0;
    quantity: number = 1;
    constructor(
        readonly id: number,
        readonly price: number,
        readonly name: string
    ) {}
}