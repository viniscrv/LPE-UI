export function translate(word: string) {
    switch (word) {
        case "everyday":
            return "Todos os dias"
        case "weekend":
            return "Finais de semana"
        case "week":
            return "Durante a semana"

        default:
            return word
    }
}