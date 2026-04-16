type Drink = 'Coffee' | 'Tea' | 'Cappuccino';

interface ITopping {
    addTopping(): string;
}

class BaseDrink implements ITopping {
    constructor(private drink: Drink) {}

    addTopping(): string {
        return "I'll be drking a " + this.drink + " with some toppings:";
    }

  
}

class MilkDecorator implements ITopping {
    constructor(private wrappee: ITopping) {}

    addTopping(): string {
        return this.wrappee.addTopping() + ", milk";
    }

  
}

class ChantillyDecorator implements ITopping {
    constructor(private wrappee: ITopping) {}

    addTopping(): string {
        return this.wrappee.addTopping() + ", chantilly";
    }


}

class ChocolateDecorator implements ITopping {
    constructor(private wrappee: ITopping) {}

    addTopping(): string {
        return this.wrappee.addTopping() + ", chocolate";
    }


}

class CinnamonDecorator implements ITopping {
    constructor(private wrappee: ITopping) {}

    addTopping(): string {
        return this.wrappee.addTopping() + ", cinnamon";
    }


}

function decorator() {
    let drink: Drink = 'Coffee';

    let chantilly = true;
    let cinnamon = true;
    let milk = true;
    let chocolate = false;

    let toppings: ITopping = new BaseDrink(drink);

    if (chantilly) toppings = new ChantillyDecorator(toppings);
    if (cinnamon) toppings = new CinnamonDecorator(toppings);
    if (milk) toppings = new MilkDecorator(toppings);
    if (chocolate) toppings = new ChocolateDecorator(toppings);

    console.log(toppings.addTopping().replace(":,", ":"));
}

decorator();