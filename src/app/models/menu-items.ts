export class MenuItems {
    item_id!:number
    item_name!:string
    item_description!:string
    item_price!:number
    restaurant_id!:number
}

export class CartItems{
    item_id!:number
    item_name!:string
    item_description!:string
    item_price!:number
    quantity!:number
}

export interface Cart{
    cartItems:CartItems[]
    restaurantId:number
}