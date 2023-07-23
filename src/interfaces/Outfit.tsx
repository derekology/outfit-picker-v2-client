import { ClothingExisting } from "./ClothingExisting";

export interface Outfit {
    top: ClothingExisting | null,
    bottom: ClothingExisting | null,
}