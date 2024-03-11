export enum AddErrorEnum {
    already_have = "Your already have this sense in your dictionary",
    not_chosen = "Select a word sense",
    other = "Sorry, something went wrong",
}

export type AddErrorType = AddErrorEnum | null