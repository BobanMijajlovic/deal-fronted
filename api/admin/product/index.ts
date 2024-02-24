import { POST } from "@/api/_base";
import { TProductNew } from "./d";


const url = "products"
export const postNewProduct = async (product: TProductNew) => {

    return POST(url,{
        body: JSON.stringify(product)
    })

}
