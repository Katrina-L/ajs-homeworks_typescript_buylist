import Book from "../domain/Book";
import Movie from "../domain/Movie";
import MusicAlbum from "../domain/MusicAlbum";
import Gadget from "../domain/Gadget";
import Cart from "../service/Cart";

test("New card should be empty", () => {
    const cart = new Cart();
    expect(cart.items.length).toBe(0);
});

test("Testing addition items into cart & totalAcount & totalAcountWithDiscount", () => {
    const book = new Book(25, 1000, "Garry Potter", "Rowling", 850);
    const movie = new Movie(77, 200, 'Мстители', 2012, 'США', 'Avengers Assemble!', 'фантастика', '137 min / 02:17');
    const musicAlbum = new MusicAlbum(1008, 900, 'Meteora', 'Linkin Park');
    const gadgetSamsung = new Gadget(1, 5000, 'Samsung Galaxy S10');
    const gadgetApple = new Gadget(2, 1000, 'Apple iPhone X');
    const cart = new Cart();
    cart.add(book);
    cart.add(movie);
    cart.add(musicAlbum);
    cart.add(gadgetSamsung);
    cart.add(gadgetApple);
    cart.add(gadgetSamsung);
    expect([...cart.items]).toEqual([book, movie, musicAlbum, gadgetSamsung, gadgetApple]);
    expect( cart.totalAmount() ).toBe(13100);
    expect( cart.totalAcountWithDiscount(25, 10) ).toBe(13000);
    expect( cart.totalAcountWithDiscount(1, 20) ).toBe(11000);
    expect( cart.totalAcountWithDiscount(1) ).toBe(13000);
});

test("Testint removeItem", () => {
    const book = new Book(25, 1000, "Garry Potter", "Rowling", 850);
    const movie = new Movie(77, 200, 'Мстители', 2012, 'США', 'Avengers Assemble!', 'фантастика', '137 min / 02:17');
    const musicAlbum = new MusicAlbum(1008, 900, 'Meteora', 'Linkin Park');
    const gadgetSamsung = new Gadget(1, 5000, 'Samsung Galaxy S10');
    const gadgetApple = new Gadget(2, 1000, 'Apple iPhone X');
    const cart = new Cart();
    cart.add(book);                         // должно быть добавлено
    cart.add(movie);                        // должно быть добавлено
    cart.add(musicAlbum);                   // должно быть добавлено
    cart.add(gadgetSamsung);                // должно быть добавлено
    cart.add(movie);                        // НЕ должно быть добавлено
    cart.removeItem(1008);                  // должно быть удалено
    expect(cart.items.length).toBe(3);
});

test("Testing increaseQuantity & decreaseQuantity methods", () => {
    const book = new Book(25, 1000, "Garry Potter", "Rowling", 850);
    const gadgetSamsung = new Gadget(1, 5000, 'Samsung Galaxy S10');
    const gadgetApple = new Gadget(2, 1000, 'Apple iPhone X');
    const cart = new Cart();
    cart.add(gadgetApple);                  // должно быть добавлено
    cart.add(gadgetSamsung);                // должно быть добавлено
    cart.add(book);                         // должно быть добавлено
    cart.add(gadgetSamsung);                // количество должно увеличится (2)
    cart.increaseQuantity(2);               // количество должно увеличится (2)
    cart.decreaseQuantity(1);               // количество должно уменьшиться (1)
    cart.increaseQuantity(25);              // количество НЕ должно увеличится
    cart.decreaseQuantity(25);              // должно быть удалено
    expect(cart._items.length).toBe(2);
    expect(cart._items).toEqual([gadgetApple, gadgetSamsung]);
    expect(cart._items.reduce( (sum, item) => sum + item.quantity, 0 )).toBe(3);
});
