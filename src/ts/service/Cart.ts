import Buyable from "../domain/Buyable";
import Book from "../domain/Book";
import Movie from "../domain/Movie";
import MusicAlbum from "../domain/MusicAlbum";
import Gadget from "../domain/Gadget";

export default class Cart {
    _items: Buyable[] = [];

    add (item: Buyable): void {
        if (item instanceof Book || item instanceof Movie || item instanceof MusicAlbum) {
            if ( !this._items.some( elem => elem.id === item.id ) ) {
                this._items.push(item);
            }
        }

        if (item instanceof Gadget) {
            if ( this._items.some( elem => elem.id === item.id ) ) {
                item.quantity += 1;
            } else {
                this._items.push(item);
            }
        }
    }

    get items(): Buyable[] {
        return [...this._items];
    }

    totalAmount(): number {
        return this.items.reduce( (sum, item) => sum + item.price * item.quantity, 0);
    }

    totalAcountWithDiscount(id: number, discount: number = 0): number {
        let index = this.items.findIndex( item => item.id === id );
        this._items[index].discount = discount;
        return this._items.reduce( (sum, item) => sum + item.price * (1 - item.discount / 100) * item.quantity, 0);
    }

    removeItem(id: number): Buyable[] {
        let index = this.items.findIndex( item => item.id === id );
        return this._items.splice(index, 1);
    }

    increaseQuantity(id: number): number {
        let index = this.items.findIndex( item => item.id === id );
        if ( this.items[index] instanceof Gadget ) {
            return this.items[index].quantity += 1;
        }
        return this.items[index].quantity;
    }

    decreaseQuantity(id: number): number | Buyable[] {
        let index = this.items.findIndex( item => item.id === id );
        return this.items[index].quantity == 1 ? this._items.splice(index, 1) : this.items[index].quantity -= 1;
    }
}
