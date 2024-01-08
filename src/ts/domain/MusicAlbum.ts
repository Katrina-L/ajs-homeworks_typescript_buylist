import Buyable from "./Buyable";

export default class MusicAlbum implements Buyable {
    discount: number = 0;
    constructor(
        readonly id: number,
        readonly price: number,
        readonly name: string,
        readonly author: string,
        readonly quantity: number = 1
    ) { }
}
